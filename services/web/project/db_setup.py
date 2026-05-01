"""
Database setup and session management for SQLAlchemy in the Flask app.

Loads environment variables, configures the database engine, session, and base model.
Provides init_db() to initialize all tables.
"""

from dotenv import load_dotenv
from project.db_config import get_sqlalchemy_database_uri
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker

# Load environment variables from .env file
load_dotenv()

SQLALCHEMY_TRACK_MODIFICATIONS = False

DATABASE_URI = get_sqlalchemy_database_uri()
engine = create_engine(DATABASE_URI)

db_session = scoped_session(sessionmaker(autocommit=False, autoflush=False, bind=engine))

Base = declarative_base()
Base.query = db_session.query_property()


def init_db():
    """
    Import all models and create tables in the database if they do not exist.
    """
    Base.metadata.create_all(bind=engine)
