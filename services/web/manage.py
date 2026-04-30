import os

from flask.cli import FlaskGroup
from process_data.insert_json_to_postgres import InsertMockDataToPostrges
from project.app_factory import create_app, db
from project.helper import UserHelper
from project.models import CiucasRoute, Runners, User

app = create_app()
cli = FlaskGroup(app)
insert_json_to_postgres_db = staticmethod(
    InsertMockDataToPostrges.insert_ciucas_data_in_postgres
)
WORKDIR = os.getenv("APP_FOLDER")


@cli.command("create_db")
def create_db():
    """
    Drops all existing database tables and recreates them.

    Behavior:
        - Calls `db.drop_all()` to remove all tables.
        - Calls `db.create_all()` to recreate schema based on models.
        - Commits the transaction.

    Warning:
        - This will permanently delete all existing data in the database.
        - Intended for development/testing environments only.
    """
    db.drop_all()
    db.create_all()
    db.session.commit()


@cli.command("seed_db_users")
def seed_db_users():
    """
    Seeds the database with dummy user data.

    Behavior:
        - Uses `UserHelper.add_dummy_user_data` to transform mock data into model instances.
        - Inserts all generated users into the database.
        - Commits the transaction.

    Dependencies:
        - Requires `dummy_data` to be defined and valid.
    """

    # Path to your user dummy data JSON file
    json_path = f"{WORKDIR}/project/mock_data/mock_users.json"
    InsertMockDataToPostrges.insert_ciucas_data_in_postgres(User, json_path)
    print("Finished ingesting mock_users.json data in table")




@cli.command("seed_db_route")
def seed_db_route():
    """
    Seeds the database with route data from a JSON file.

    Behavior:
        - Constructs the path to `ciucas_route.json` using the APP_FOLDER environment variable.
        - Inserts route data into the `CiucasRoute` table using a helper method.

    Dependencies:
        - Requires `APP_FOLDER` environment variable to be set.
        - JSON file must exist at the expected path.
    """
    json_path = f"{WORKDIR}/project/mock_data/ciucas_route.json"
    InsertMockDataToPostrges.insert_ciucas_data_in_postgres(
        CiucasRoute, json_path
    )
    print("Finished ingesting ciucas_route.json in table")


@cli.command("seed_db_runners")
def seed_db_runners():
    """
    Seeds the database with runner data from a JSON file.

    Behavior:
        - Constructs the path to `ciucas_runners.json` using the APP_FOLDER environment variable.
        - Inserts runner data into the `Runners` table.

    Dependencies:
        - Requires `APP_FOLDER` environment variable to be set.
        - JSON file must exist at the expected path.
    """
    json_path = f"{WORKDIR}/project/mock_data/ciucas_runners.json"
    InsertMockDataToPostrges.insert_ciucas_data_in_postgres(
        Runners, json_path
    )
    print("Finished ingesting ciucas_runners.json data in table")


@cli.command("print_users")
def print_users():
    """
    Prints all user data stored in the database.

    Behavior:
        - Delegates to `UserHelper.print_all_data()` for output formatting.
    """
    UserHelper.print_all_data()


@cli.command("print_runners")
def print_runners():
    """
    Prints all runner records from the database.

    Behavior:
        - Delegates to `UserHelper.print_all_runners()`.
    """
    UserHelper.print_all_runners()


@cli.command("print_routes")
def print_routes():
    """
    Prints all route records from the database.

    Behavior:
        - Delegates to `UserHelper.print_all_routes()`.
    """
    UserHelper.print_all_routes()


if __name__ == "__main__":
    """
    Entry point for the Flask CLI application.

    Usage:
        python <script_name>.py <command>

    Example commands:
        - create_db
        - seed_db
        - seed_db_route
        - seed_db_runners
        - print_db
        - print_runners
        - print_routes
    """
    cli()