from flask import Flask
from flask_login import LoginManager
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os
# initialize extensions
db = SQLAlchemy()
migrate = Migrate()
login_manager = LoginManager()
#server_name = os.getenv("SERVER_NAME")  # Include the port
def create_app():
    app = Flask(__name__)
    app.config['PREFERRED_URL_SCHEME'] = 'https'
    app.config['APPLICATION_ROOT'] = '/'
    # load configuration
    app.config.from_object('project.config.Config')  # correct

    # initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    login_manager.init_app(app)
    login_manager.login_view = 'auth.login'  # redirects to login if user is not authenticated
   
    # Enable CORS for the entire app
    CORS(app, origins=["https://mapwizard.eu", "https://www.mapwizard.eu"],
      methods=["GET", "POST", "OPTIONS", "PUT", "DELETE"],
      allow_headers=["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"])

    # import models after db is initialized to avoid circular imports
    from project.models import CiucasRoute, Runners, User  

    @login_manager.user_loader
    def load_user(user_id):
        with db.session() as session:
            return session.get(User, int(user_id))  # safer query

    # register blueprints
    from project.auth import auth  
    app.register_blueprint(auth)

    from project.routes import main  
    app.register_blueprint(main)
    
    return app
