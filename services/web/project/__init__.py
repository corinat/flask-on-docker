import json
import os
from itertools import cycle

from flask import Blueprint, Flask, Response, jsonify, request, send_from_directory
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from project.get_data_from_postgresql import GetDataFromPostgresql
from sqlalchemy import Column, Date, Float, Integer, String
from sqlalchemy.dialects.postgresql import BIGINT
from werkzeug.utils import secure_filename

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

    # def create(self):
    #     new_user = User(self.first_name, self.last_name, self.address)
    #     db.session.add(new_user)
    #     db.session.commit()

    @staticmethod
    def print_all_user():
        user_data = User.query.all()
        return user_data


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
    possition_on_the_track = GetDataFromPostgresql.indexes

    while running:
        updated_json = GetDataFromPostgresql.get_data_from_ciucas_track()
        new_json = next(updated_json)
        stream_runners_from_postgres = GetDataFromPostgresql.get_runners_from_postgresql()
        runner = json.loads(stream_runners_from_postgres)
        ciucas_runner = runner["features"]

        sorted_ciucas_runner = sorted(ciucas_runner, key=lambda k: k["properties"]["ranking"], reverse=True)

        for i, _ in enumerate(sorted_ciucas_runner):
            for j, _ in enumerate(possition_on_the_track):
                # runner_position = i + j

                # Use modulo to ensure that runner_position stays within the bounds of new_json
                # runner_position %= len(new_json)
                spacing_factor = 50  # Adjust the spacing factor as needed

                runner_position = (spacing_factor * i + j) % len(new_json) if (i + j) >= 0 else None
                sorted_ciucas_runner[i]["properties"].update(new_json[runner_position]["properties"])
                sorted_ciucas_runner[i]["geometry"]["coordinates"][0] = new_json[runner_position]["properties"][
                    "xcoord"
                ]
                sorted_ciucas_runner[i]["geometry"]["coordinates"][1] = new_json[runner_position]["properties"][
                    "ycoord"
                ]
                sorted_ciucas_runner[i]["properties"]["distance"] = round(
                    new_json[runner_position]["properties"]["distance"], -1
                )
                sorted_ciucas_runner[i]["properties"]["alt"] = new_json[runner_position]["properties"]["ele"]

        updated_json_data = json.dumps(runner, indent=4, sort_keys=True)
        dict_json = json.loads(updated_json_data)

        return Response(json.dumps(dict_json), mimetype="application/json")
