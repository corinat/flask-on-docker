import json
import os

from flask import Flask, Response, jsonify, request, send_from_directory
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from project.get_data_from_postgresql import GetDataFromPostgresql, StreamingData
from sqlalchemy import Column, Float, Integer, String
from sqlalchemy.dialects.postgresql import BIGINT
from werkzeug.utils import secure_filename

get_data = GetDataFromPostgresql()
streem_data = StreamingData()


app = Flask(__name__)
app.config.from_object("project.config.Config")
db = SQLAlchemy(app)
migrate = Migrate(app, db)


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(20))
    last_name = db.Column(db.String(20))
    address = db.Column(db.String(200), unique=True)

    def __init__(self, first_name: str, last_name: str, address: str):
        self.first_name = first_name
        self.last_name = last_name
        self.address = address

    @staticmethod
    def print_all_user():
        return User.query.all()


class Runners(db.Model):
    """"""

    __tablename__ = "runners_ciucas"

    mytable_key = Column(
        BIGINT,
        nullable=False,
        server_default="0",
        primary_key=True,
        unique=True,
        autoincrement=True,
    )

    id = Column(BIGINT, nullable=False, unique=True)
    imei = Column(BIGINT, unique=True, nullable=False)
    name = Column(String(128), unique=True, nullable=False)
    displayname = Column(String(128), unique=True, nullable=False)
    gender = Column(String(128), unique=False, nullable=False)
    categ = Column(String, nullable=False)
    club = Column(String(128), unique=False, nullable=False)
    bib = Column(String(128), unique=True, nullable=False)
    age = Column(String(128), unique=False, nullable=False)
    ranking = Column(Integer, unique=False, nullable=False)
    time_ = Column(String(128), unique=False, nullable=True)

    def __init__(self, id, imei, name, displayname, gender, categ, club, bib, time_, age, ranking):
        self.id = id
        self.imei = imei
        self.name = name
        self.displayname = displayname
        self.gender = gender
        self.categ = categ
        self.club = club
        self.bib = bib
        self.time_ = time_
        self.age = age
        self.ranking = ranking


class CiucasRoute(db.Model):
    """"""

    __tablename__ = "ciucas_route"

    mytable_key = Column(
        BIGINT,
        nullable=False,
        server_default="0",
        primary_key=True,
        unique=True,
        autoincrement=True,
    )
    distance = Column(Float(), unique=True, nullable=False)
    ele = Column(Integer, unique=False, nullable=False)
    xcoord = Column(Float(), unique=False, nullable=False)
    ycoord = Column(Float(), unique=False, nullable=False)

    def __init__(self, distance: float, ycoord: float, ele: float, xcoord: float):
        self.distance = distance
        self.ele = ele
        self.xcoord = xcoord
        self.ycoord = ycoord


@app.route("/")
def hello_world():
    return jsonify(hello="world")


@app.route("/static/<path:filename>")
def staticfiles(filename):
    return send_from_directory(app.config["STATIC_FOLDER"], filename)


@app.route("/media/<path:filename>")
def mediafiles(filename):
    return send_from_directory(app.config["MEDIA_FOLDER"], filename)


@app.route("/upload", methods=["GET", "POST"])
def upload_file():
    if request.method == "POST":
        file = request.files["file"]
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config["MEDIA_FOLDER"], filename))
    return """
    <!doctype html>
    <title>upload new File</title>
    <form action="" method=post enctype=multipart/form-data>
      <p><input type=file name=file><input type=submit value=Upload>
    </form>
    """


@app.route("/live/", methods=["GET"])
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
