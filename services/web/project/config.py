import os

basedir = os.path.abspath(os.path.dirname(__file__))
APP_FOLDER = os.getenv("APP_FOLDER", basedir)  # default to current directory
class Config(object):
    SERVER_NAME = os.getenv("SERVER_NAME", "localhost:1337")  # Tell Flask the correct public URL

    DATABASE_URL = os.getenv(
        "DATABASE_URL",
        "postgresql+psycopg2://hello_flask:hello_flask@db:5432/hello_flask_prod",
    )

    if DATABASE_URL.startswith("postgres://"):
        DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

    SQLALCHEMY_DATABASE_URI = DATABASE_URL
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    STATIC_FOLDER = f"{APP_FOLDER}/project/static"
    MEDIA_FOLDER = f"{APP_FOLDER}/project/media"
    TEMPLATE_FOLDER = f"{APP_FOLDER}/project/templates"

    SECRET_KEY = os.environ.get("SECRET_KEY", "9OLWxND4o83j4K4iuopO")


