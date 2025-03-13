
import json

from db_setup import db_session
from flask import Blueprint, Response, flash, redirect, render_template, request, send_from_directory, url_for
from flask_cors import cross_origin
from flask_login import current_user, login_required
from forms import RunnerForm, RunnerSearchForm
from project.app_factory import create_app
from project.get_data_from_postgresql import GetDataFromPostgresql, StreamingData
from tables import Results
from werkzeug.utils import secure_filename

app = create_app
# Initialize PostgreSQL data handlers
get_data = GetDataFromPostgresql()
streem_data = StreamingData()

# Create Blueprint
main = Blueprint("main", __name__)

indexes = []
runner_index = []


@main.route("/", methods=["GET", "POST"])
def index():
    # return render_template('index.html')
    search = RunnerSearchForm(request.form)
    if request.method == "POST":
        return search_results(search)

    return render_template("index.html", form=search)


@main.route("/profile")
@login_required
def profile():
    return render_template("profile.html", name=current_user.name)


@main.route("/register_runners", methods=["GET", "POST"])
@login_required
def register_runners():
    search = RunnerSearchForm(request.form)
    if request.method == "POST":
        return search_results(search)

    return render_template("register_runners.html", form=search)


def get_data_from_ciucas_track():
    running = True
    while running:
        stream_from_postgres = get_data.get_track_from_postgresql()
        track = json.loads(stream_from_postgres)
        all_points_track = track["features"]
        len_values = len(all_points_track)
        for index in range((len_values) - 1)[-100::]:
            indexes.append(index)
            yield all_points_track


def sort_function(value):
    return value["properties"]["ranking"]


def random_index():
    stream_runners_from_postgres = get_data.get_runners_from_postgresql()
    runner = json.loads(stream_runners_from_postgres)
    ciucas_runner = runner["features"]
    for i in range(len(ciucas_runner)):
        if ciucas_runner[i]["properties"]["categ"] == "Male(team)":
            return 10
        elif ciucas_runner[i]["properties"]["categ"] == "Female(team)":
            return 79
        elif ciucas_runner[i]["properties"]["categ"] == "Mix(team)":
            return 41
        elif ciucas_runner[i]["properties"]["categ"] == "Male(individual)":
            return 56
        elif ciucas_runner[i]["properties"]["categ"] == "Female(individual)":
            return 69


@cross_origin()
@main.route("/results", methods=["GET", "POST"])
@login_required
def search_results(search):
    from models import Runners
    results = []
    search_string = search.data["search"]

    if search_string:
        if search.data["select"] == "Female(individual)":
            qry = (
                db_session.query(Runners)
                .filter(Runners.categ == "Female(individual)")
                .filter(Runners.name.contains(search_string))
            )
            results = [item for item in qry.all()]
        elif search.data["select"] == "Mix(team)":
            # qry = db_session.query(Runners).filter(
            #     Runners.name.contains(search_string))
            # results = qry.all()
            qry = (
                db_session.query(Runners)
                .filter(Runners.categ == "Mix(team)")
                .filter(Runners.name.contains(search_string))
            )
            results = [item for item in qry.all()]
        elif search.data["select"] in "Female(team)":
            qry = (
                db_session.query(Runners)
                .filter(Runners.categ == "Female(team)")
                .filter(Runners.name.contains(search_string))
            )
            results = [item for item in qry.all()]
        elif search.data["select"] in "Male(team)":
            qry = (
                db_session.query(Runners)
                .filter(Runners.categ == "Male(team)")
                .filter(Runners.name.contains(search_string))
            )
            results = [item for item in qry.all()]
        elif search.data["select"] in "Male(individual)":
            qry = (
                db_session.query(Runners)
                .filter(Runners.categ == "Male(individual)")
                .filter(Runners.name.contains(search_string))
            )
            results = [item for item in qry.all()]
        else:
            qry = db_session.query(Runners)
            results = qry.all()
    else:
        qry = db_session.query(Runners)
        results = qry.all()

    if not results:
        flash("No results found!")
        return redirect("/register_runners")
    else:
        # display results
        table = Results(results)
        table.border = True
        return render_template("/results.html", table=table)


@main.route("/new_runner", methods=["GET", "POST"])
@login_required
def new_runner():
    """
    Add a new runner
    """
    from models import Runners
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
        # print(new_runner)
        save_changes(new_runners, form, new=True)
        flash("New runner created successfully!")
        return redirect("/register_runners")
    else:
        print("error")

    return render_template("new_runner.html", form=form)


@login_required
def save_changes(runners, form, new=False):
    """
    Save the changes to the database
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
    # runners.alt = form.altrunners.name.data

    if new:
        # Add the new album to the database
        db_session.add(runners)
    else:
        print("error")
    # commit the data to the database
    db_session.commit()


@main.route("/edit/<int:id>", methods=["GET", "POST"])
@login_required
def edit(id):
    from models import Runners
    qry = db_session.query(Runners).filter(Runners.id == id)
    a_runner = qry.first()

    if a_runner:
        form = RunnerForm(formdata=request.form, obj=a_runner)
        if request.method == "POST":
            # and form.validate()
            # save edits
            save_changes(a_runner, form)
            flash("Runner updated successfully!")
            # return redirect("/register_runners")
            return redirect(url_for('main.register_runners', _external=True))
        return render_template("edit_runner.html", form=form)
        
    else:
        return "Error loading #{id}".format(id=id)


@main.route("/delete/<int:id>", methods=["GET", "POST"])
@login_required
def delete(id):
    from models import Runners
    """
    Delete the item in the database that matches the specified
    id in the URL
    """
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
            return redirect("/register_runners")
        return render_template("delete_runner.html", form=form)
    else:
        return "Error deleting #{id}".format(id=id)
    
@main.route("/live", methods=["GET"])
@login_required
def live():
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
