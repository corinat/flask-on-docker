from project.db_setup import db_session
from flask import Blueprint, flash, redirect, render_template, request, url_for
from flask_login import login_required, login_user, logout_user
from project.models import User
from werkzeug.security import check_password_hash, generate_password_hash

auth = Blueprint("auth", __name__)


@auth.route("/login")
def login():
    return render_template("login.html")


@auth.route("/login", methods=["POST"])
def login_post():
    email = request.form.get("email")
    password = request.form.get("password")
    remember = True if request.form.get("remember") else False

    user = User.query.filter_by(email=email).first()

    # check if user exists and if the password is correct
    if not user or not check_password_hash(user.password, password):
        flash("Please check your login details and try again.")
        return redirect(url_for("auth.login",_external=True, _scheme='https'))

    # log in the user
    login_user(user, remember=remember)
    return redirect(url_for("main.profile", _external=True, _scheme='https'))


@auth.route("/signup")
def signup():
    return render_template("signup.html")


@auth.route("/signup", methods=["POST"])
def signup_post():
    email = request.form.get("email")
    name = request.form.get("name")
    password = request.form.get("password")

    user = User.query.filter_by(email=email).first()

    if user:
        flash("Email address already exists")
        return redirect(url_for("auth.signup", _external=True, _scheme='https'))

    # create a new user with the form data
    new_user = User(
        email=email,
        name=name,
        password=generate_password_hash(password, method="pbkdf2:sha256"),
    )

    # add the new user to the database
    db_session.add(new_user)
    db_session.commit()

    return redirect(url_for("auth.login", _external=True, _scheme='https'))


@auth.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for("main.index", _external=True, _scheme='https'))
