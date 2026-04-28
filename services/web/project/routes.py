"""
Flask routes for the main application.

This module defines the main Blueprint and all route handlers for the web app, including:
- Index, profile, registration, and results pages
- CRUD operations for runners
- Live data streaming endpoints
- Integration with forms, authentication, and database
"""


import json
import os

from flask import Blueprint, Response, flash, redirect, render_template, request, url_for
from flask_cors import cross_origin
from flask_login import current_user, login_required
from project.app_factory import create_app
from project.db_setup import db_session
from project.forms import RunnerForm, RunnerSearchForm
from project.get_data_from_postgresql import GetDataFromPostgresql, StreamingData
from project.tables import results_to_dicts

app = create_app
# Initialize PostgreSQL data handlers
get_data = GetDataFromPostgresql()
streem_data = StreamingData()

# Create Blueprint
main = Blueprint("main", __name__)

indexes = []
runner_index = []

@main.route("/", methods=["GET", "POST"])
@login_required
def index():
    """
    Render the index page with a runner search form. Handles search POST requests.
    """
    search = RunnerSearchForm(request.form)
    if request.method == "POST":
        return search_results(search)

    return render_template("index.html", form=search)

@main.route("/profile")
@login_required
def profile():
    """
    Render the profile page for the current user.
    """
    return render_template("profile.html", name=current_user.name)

@main.route("/register_runners", methods=["GET", "POST"])
@login_required
def register_runners():
    """
    Render the runner registration page and handle search POST requests.
    """
    search = RunnerSearchForm(request.form)
    if request.method == "POST":
        return search_results(search)

    return render_template("register_runners.html", form=search)


@main.route("/results", methods=["GET", "POST"])
@login_required
def search_results(search_string=None):
    """
    Search for runners in the database by name and category, and render the results table.
    """
    from project.models import Runners
    search_string = request.form.get("search", "").strip()
    select_category = request.form.get("select", "")

    results_query = db_session.query(Runners)

    if search_string:
        results_query = results_query.filter(Runners.name.contains(search_string))
    
    if select_category in ["Female(individual)", "Mix(team)", "Female(team)", "Male(team)", "Male(individual)"]:
        results_query = results_query.filter(Runners.categ == select_category)

    results = results_query.all()

    if not results:
        flash("No results found!")
        return redirect(url_for('main.register_runners', _external=True, _scheme=os.getenv('PREFERRED_URL_SCHEME', 'http')))
    # convert query results to list of dicts for table rendering
    table_data = results_to_dicts(results)
    headers = [
        ('IMEI', 'imei'),
        ('Name', 'name'),
        ('Display Name', 'displayname'),
        ('Gender', 'gender'),
        ('Category', 'categ'),
        ('Club', 'club'),
        ('BIB', 'bib'),
        ('Age', 'age'),
        ('Rank', 'ranking'),
        ('Time', 'time_'),
        ('Edit', 'edit'),
        ('Delete', 'delete'),
    ]
    # Add edit/delete URLs
    for row in table_data:
        row['edit'] = url_for('main.edit', id=row['id'])
        row['delete'] = url_for('main.delete', id=row['id'])
    return render_template("results.html", table_data=table_data, headers=headers)

@main.route("/new_runner", methods=["GET", "POST"])
@login_required
def new_runner():
    """
    Add a new runner to the database using the submitted form data.
    """
    """
    Add a new runner
    """
    from project.models import Runners
    form = RunnerForm(request.form)

    if request.method == "POST":
        # save the album
        # and form.validate()
        new_runners = Runners(
            id=form.id.data,  # Ensure this value is set correctly
            imei=form.imei.data,
            name=form.name.data,
            displayname=form.displayname.data,
            gender=form.gender.data,
            categ=form.categ.data,
            club=form.club.data,
            bib=form.bib.data,
            age=form.age.data,
            ranking=form.ranking.data,
            time_=form.time_.data if form.time_.data else None  # Optional field
        )

        save_changes(new_runners, form, new=True)
        flash("New runner created successfully!")
        return redirect(url_for('main.register_runners', _external=True, _scheme=os.getenv('PREFERRED_URL_SCHEME', 'http')))
    else:
        print("error")

    return render_template("new_runner.html", form=form)


def save_changes(runners, form, new=False):
    """
    Save runner changes to the database. If new=True, add as a new record.
    """
    runners.id = form.id.data
    runners.imei = form.imei.data
    runners.name = form.name.data
    runners.displayname = form.displayname.data
    runners.gender = form.gender.data
    runners.categ = form.categ.data
    runners.club = form.club.data
    runners.bib = form.bib.data
    runners.age = form.age.data
    runners.ranking = form.ranking.data
    runners.time_ = form.time_.data

    if new:
        # add the new album to the database
        db_session.add(runners)
    else:
        print("error")
    # commit the data to the database
    db_session.commit()

@main.route("/edit/<int:id>", methods=["GET", "POST"])
@login_required
def edit(id):
    """
    Edit an existing runner's details by ID.
    """
    from project.models import Runners
    qry = db_session.query(Runners).filter(Runners.id == id)
    a_runner = qry.first()

    if a_runner:
        form = RunnerForm(formdata=request.form, obj=a_runner)
        if request.method == "POST":
            # and form.validate()
            # save edits
            save_changes(a_runner, form)
            flash("Runner updated successfully!")
            return redirect(url_for('main.register_runners', _external=True, _scheme=os.getenv('PREFERRED_URL_SCHEME', 'http')))
        return render_template("edit_runner.html", form=form)
        
    else:
        return "Error loading #{id}".format(id=id)

@main.route("/delete/<int:id>", methods=["GET", "POST"])
@login_required
def delete(id):
    """
    Delete a runner from the database by ID.
    """
    from project.models import Runners

    qry = db_session.query(Runners).filter(Runners.id == id)
    runner = qry.first()

    if runner:
        form = RunnerForm(formdata=request.form, obj=runner)
        if request.method == "POST":
            # and form.validate():
            # delete the item from the database
            db_session.delete(runner)
            db_session.commit()

            flash("Runner deleted successfully!")
            return redirect(url_for("main.register_runners", _external=True, _scheme=os.getenv('PREFERRED_URL_SCHEME', 'http')))
        return render_template("delete_runner.html", form=form)
    else:
        return "Error deleting #{id}".format(id=id)

@main.route("/live", strict_slashes=False, methods=["GET"])
@cross_origin(origins=["https://mapwizard.eu", "https://www.mapwizard.eu"])
@cross_origin(origins=["http://localhost:8080", "http://127.0.0.1:8080", "https://mapwizard.eu", "https://www.mapwizard.eu"])
@login_required
def live():
    """
    Stream live runner and track data as JSON for the frontend.
    """
    running = True
    possition_on_the_track = streem_data.indexes
    spacing_factor = 50  # Adjust the spacing factor as needed
    get_track = get_data.get_track_from_postgresql()
    
    while running:
        streem_ciucas_track = streem_data.streem_track_from_postgres(get_track)
        streem_features_from_ciucas_track = next(streem_ciucas_track)
        stream_runners_from_postgres = get_data.get_runners_from_postgresql()
        runner = json.loads(stream_runners_from_postgres)
        ciucas_runner = runner["features"]

        sorted_ciucas_runner = sorted(ciucas_runner, key=lambda k: k["properties"]["ranking"], reverse=True)

        sorted_ciucas_runner = [
            streem_data.update_runner_properties(
                runner, streem_features_from_ciucas_track, runner_index, track_index, spacing_factor
            )
            for runner_index, runner in enumerate(sorted_ciucas_runner)
            for track_index, _ in enumerate(possition_on_the_track)
        ]

        return Response(json.dumps(runner), mimetype="application/json")
