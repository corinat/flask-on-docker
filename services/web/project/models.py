"""
SQLAlchemy models for users, runners, and track routes in the Flask app.

Defines User, Runners, and CiucasRoute models for authentication and race data.
"""

from flask_login import UserMixin
from project.app_factory import db
from sqlalchemy import Column, Float, Integer, String
from sqlalchemy.dialects.postgresql import BIGINT


class User(db.Model, UserMixin):
    """
    User model for authentication and user management.
    """
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(10000), unique=True)
    name = db.Column(db.String(100))
    password = db.Column(db.String(255), nullable=False)  # Increase to 255
    

    # def __init__(self, email: str, password: str, name: str):
    #     self.email = email
    #     self.name = name
    #     self.password = password
        
        
class Runners(db.Model):
    """
    Model for storing runner information and race results.
    """
    __tablename__ = "runners_ciucas"

    mytable_key = Column(BIGINT, nullable=False, primary_key=True, unique=True, autoincrement=True)
    id = Column(BIGINT, nullable=False, unique=True)
    imei = Column(BIGINT, unique=True, nullable=False)
    name = Column(String(128), unique=False, nullable=False)
    displayname = Column(String(128), unique=False, nullable=False)
    gender = Column(String(128), nullable=False)
    categ = Column(String, nullable=False)
    club = Column(String(128), nullable=False)
    bib = Column(String(128), unique=True, nullable=False)
    age = Column(String(128), nullable=False)
    ranking = Column(Integer, nullable=False)
    time_ = Column(String(128), nullable=True)

    __table_args__ = (
        db.Index('idx_runners_ranking', 'ranking'),
    )


class CiucasRoute(db.Model):
    """
    Model for storing track route points and elevation data.
    """
    __tablename__ = "ciucas_route"

    mytable_key = Column(BIGINT, nullable=False, primary_key=True, unique=True, autoincrement=True)
    distance = Column(Float(), unique=True, nullable=False)
    ele = Column(Integer, nullable=False)
    xcoord = Column(Float(), nullable=False)
    ycoord = Column(Float(), nullable=False)
    pace = Column(Float(), nullable=True)
    segment_distance = Column(Float(), nullable=True)

    # def __init__(self, distance: float, ycoord: float, ele: float, xcoord: float,
    #     pace: float = None, segment_distance: float = None):
    #     self.distance = distance
    #     self.ele = ele
    #     self.xcoord = xcoord
    #     self.ycoord = ycoord
    #     self.pace = pace
    #     self.segment_distance = segment_distance
