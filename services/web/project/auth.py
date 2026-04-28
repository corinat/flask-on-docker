"""
Authentication blueprint for login, signup, and logout routes.

Handles user authentication, registration, and session management for the Flask app.
"""

import os

from flask import Blueprint, flash, redirect, render_template, request, url_for
from flask_login import login_required, login_user, logout_user
from project.db_setup import db_session
from project.models import User
from werkzeug.security import check_password_hash, generate_password_hash

auth = Blueprint("auth", __name__)


@auth.route("/login")
def login():
    """
    Render the login page.
    """
    return render_template("login.html")


@auth.route("/login", methods=["POST"])
def login_post():
    """
    Handle POST request for user login. Authenticates user and starts session.
    """
    email = request.form.get("email")
    password = request.form.get("password")
    remember = True if request.form.get("remember") else False

    user = User.query.filter_by(email=email).first()

    if not user:
        flash("No account found. Please sign up.")
        return redirect(url_for("auth.signup", _external=True, _scheme=os.getenv("PREFERRED_URL_SCHEME", "http")))

    if not check_password_hash(user.password, password):
        flash("Incorrect password.")
        return redirect(url_for("auth.login", _external=True, _scheme=os.getenv("PREFERRED_URL_SCHEME", "http")))

    # log in the user
    login_user(user, remember=remember)
    return redirect(url_for("main.profile", _external=True, _scheme=os.getenv("PREFERRED_URL_SCHEME", "http")))


@auth.route("/signup")
def signup():
    """
    Render the signup page.
    """
    return render_template("signup.html")


@auth.route("/signup", methods=["POST"])
def signup_post():
    """
    Handle POST request for user registration. Creates a new user account.
    """
    email = request.form.get("email")
    name = request.form.get("name")
    password = request.form.get("password")

    user = User.query.filter_by(email=email).first()

    if user:
        flash("Email address already exists")
        return redirect(url_for("auth.signup", _external=True, _scheme=os.getenv("PREFERRED_URL_SCHEME", "http")))

    # create a new user with the form data
    new_user = User(
        email=email,
        name=name,
        password=generate_password_hash(password, method="pbkdf2:sha256"),
    )

    # add the new user to the database
    db_session.add(new_user)
    db_session.commit()

    return redirect(url_for("auth.login", _external=True, _scheme=os.getenv("PREFERRED_URL_SCHEME", "http")))


@auth.route("/logout")
@login_required
def logout():
    """
    Log out the current user and redirect to the index page.
    """
    logout_user()
    return redirect(url_for("main.index", _external=True, _scheme=os.getenv("PREFERRED_URL_SCHEME", "http")))
