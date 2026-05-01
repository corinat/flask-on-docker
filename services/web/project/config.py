
"""
Configuration module for Flask application settings.

Defines the Config class for environment-based and default settings, including database, secret key, and folder paths.
"""

import os

from project.db_config import get_sqlalchemy_database_uri


class Config(object):
    """
    Flask configuration class. Loads settings from environment variables or uses defaults.
    Sets up database URI, secret key, and folder paths for static, media, and templates.
    """
    BASEDIR = os.path.abspath(os.path.dirname(__file__))
    APP_FOLDER = os.getenv("APP_FOLDER", BASEDIR)
    PREFERRED_URL_SCHEME = os.getenv("PREFERRED_URL_SCHEME", "https")
    SECRET_KEY = os.getenv("SECRET_KEY", "default-secret-key")
    SQLALCHEMY_DATABASE_URI = get_sqlalchemy_database_uri()

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    STATIC_FOLDER = f"{APP_FOLDER}/project/static"
    MEDIA_FOLDER = f"{APP_FOLDER}/project/media"
    TEMPLATE_FOLDER = f"{APP_FOLDER}/project/templates"
