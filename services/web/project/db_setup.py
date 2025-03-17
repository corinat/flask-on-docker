import os

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker

# Load environment variables from .env file
load_dotenv()

SQLALCHEMY_TRACK_MODIFICATIONS = False

# Get DATABASE_URI from .env file
DATABASE_URI = os.getenv("DATABASE_URL")

# Ensure the variable is set, otherwise raise an error
if not DATABASE_URI:
    raise ValueError("DATABASE_URL environment variable is not set!")

# Fix old-style PostgreSQL connection URL if needed
if DATABASE_URI.startswith("postgres://"):
    DATABASE_URI = DATABASE_URI.replace("postgres://", "postgresql://", 1)

engine = create_engine(DATABASE_URI)

db_session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=engine))

Base = declarative_base()
Base.query = db_session.query_property()

def init_db():
    import project.models
    Base.metadata.create_all(bind=engine)
