import os

basedir = os.path.abspath(os.path.dirname(__file__))
APP_FOLDER = os.getenv("APP_FOLDER", basedir)  # default to current directory

class Config(object):
    PREFERRED_URL_SCHEME = "https" if os.getenv("FLASK_HTTPS") else "http"
    SERVER_NAME = os.getenv("SERVER_NAME", None)  # none means no default
    DATABASE_URL = os.getenv("DATABASE_URL", None)
    SECRET_KEY = os.getenv("SECRET_KEY", "default-secret-key")

    if DATABASE_URL:
        if DATABASE_URL.startswith("postgres://"):
            DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)
        SQLALCHEMY_DATABASE_URI = DATABASE_URL
    else:
        SQLALCHEMY_DATABASE_URI = f"sqlite:///{os.path.join(basedir, 'data.db')}"  # Default to SQLite

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    STATIC_FOLDER = f"{APP_FOLDER}/project/static"
    MEDIA_FOLDER = f"{APP_FOLDER}/project/media"
    TEMPLATE_FOLDER = f"{APP_FOLDER}/project/templates"
