from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from project import app
from sqlalchemy import Column, Float, Integer, String
from sqlalchemy.dialects.postgresql import BIGINT

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
