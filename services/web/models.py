from flask_login import UserMixin
from project.app_factory import db
from sqlalchemy import Column, Float, Integer, String
from sqlalchemy.dialects.postgresql import BIGINT


class User(db.Model, UserMixin):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(10000), unique=True)
    name = db.Column(db.String(100))
    password = db.Column(db.String(255), nullable=False)  # Increase to 255
    

    def __init__(self, email: str, password: str, name: str):
        self.email = email
        self.name = name
        self.password = password
       

    @staticmethod
    def print_all_user():
        return User.query.all()

class Runners(db.Model):
    __tablename__ = "runners_ciucas"

    mytable_key = Column(BIGINT, nullable=False, primary_key=True, unique=True, autoincrement=True)
    id = Column(BIGINT, nullable=False, unique=True)
    imei = Column(BIGINT, unique=True, nullable=False)
    name = Column(String(128), unique=True, nullable=False)
    displayname = Column(String(128), unique=True, nullable=False)
    gender = Column(String(128), nullable=False)
    categ = Column(String, nullable=False)
    club = Column(String(128), nullable=False)
    bib = Column(String(128), unique=True, nullable=False)
    age = Column(String(128), nullable=False)
    ranking = Column(Integer, nullable=False)
    time_ = Column(String(128), nullable=True)

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
    __tablename__ = "ciucas_route"

    mytable_key = Column(BIGINT, nullable=False, primary_key=True, unique=True, autoincrement=True)
    distance = Column(Float(), unique=True, nullable=False)
    ele = Column(Integer, nullable=False)
    xcoord = Column(Float(), nullable=False)
    ycoord = Column(Float(), nullable=False)

    def __init__(self, distance: float, ycoord: float, ele: float, xcoord: float):
        self.distance = distance
        self.ele = ele
        self.xcoord = xcoord
        self.ycoord = ycoord
