import os

from flask.cli import FlaskGroup
from project import CiucasRoute, Runners, app, db
from project.helper import UserHelper
from project.insert_json_to_postgres import InsertMockDataToPostrges
from project.mock_data.data import dummy_data

cli = FlaskGroup(app)
WORKDIR = os.getenv("APP_FOLDER")


@cli.command("create_db")
def create_db():
    db.drop_all()
    db.create_all()
    db.session.commit()


@cli.command("seed_db")
def seed_db():
    users = UserHelper.add_dummy_user_data(dummy_data)
    db.session.add_all(users)
    db.session.commit()


@cli.command("seed_db_route")
def seed_db_route():
    # Open the file and load its contents
    InsertMockDataToPostrges.insert_ciucas_data_in_postgres(
        CiucasRoute,
        f"{WORKDIR}/project/mock_data/trim_all_route.json",
    )
    print("Finished ngesting data in table")
    db.session.commit()


@cli.command("seed_db_runners")
def seed_db_runners():
    InsertMockDataToPostrges.insert_ciucas_data_in_postgres(
        Runners,
        f"{WORKDIR}/project/mock_data/trim_runners.json",
    )
    print("Finished ngesting data in table")
    db.session.commit()


@cli.command("print_db")
def print_db():
    UserHelper.print_all_data()


if __name__ == "__main__":
    cli()
