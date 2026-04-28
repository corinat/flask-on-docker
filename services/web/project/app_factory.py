
"""
Flask application factory and extension initialization.

This module provides the create_app function to configure and return a Flask app instance,
along with initialized extensions for database, migration, login, and CORS.
"""

import os

from flask import Flask
from flask_cors import CORS
from flask_login import LoginManager
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

# initialize extensions
db = SQLAlchemy()
migrate = Migrate()
login_manager = LoginManager()
#server_name = os.getenv("SERVER_NAME")  # Include the port
def create_app():
    """
    Flask application factory.

    Configures and returns a Flask app instance with all extensions and blueprints registered.
    Loads configuration, initializes database, migration, login, and CORS.
    """
    app = Flask(__name__)
    app.config['PREFERRED_URL_SCHEME'] = os.getenv('PREFERRED_URL_SCHEME', 'https')
    app.config['APPLICATION_ROOT'] = '/'
    # load configuration
    app.config.from_object('project.config.Config')

    # initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    login_manager.init_app(app)
    login_manager.login_view = 'auth.login'  # redirects to login if user is not authenticated

    # Enable CORS for the entire app
    cors_origins = os.getenv('CORS_ORIGINS', "http://localhost:8080,http://127.0.0.1:8080,https://mapwizard.eu,https://www.mapwizard.eu")
    CORS(app, origins=[o.strip() for o in cors_origins.split(',')],
        methods=["GET", "POST", "OPTIONS", "PUT", "DELETE"],
        allow_headers=["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"])

    # import models after db is initialized to avoid circular imports
    from project.models import CiucasRoute, Runners, User

    @login_manager.user_loader
    def load_user(user_id):
        """
        Return a user instance by user_id for Flask-Login session management.
        """
        with db.session() as session:
            return session.get(User, int(user_id))

    # register blueprints
    from project.auth import auth
    app.register_blueprint(auth)

    from project.routes import main
    app.register_blueprint(main)

    return app
