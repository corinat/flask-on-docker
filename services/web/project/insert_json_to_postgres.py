import json

from project import Runners, db


class InsertMockDataToPostrges:
    @staticmethod
    def insert_ciucas_data_in_postgres(model, json_file):
        # table_name = model.__tablename__
        # print("\ntable name for JSON data:", table_name)
        # print(f"File path: {json_file}")

        with open(json_file) as json_data:
            record_list = json.load(json_data)

        # Convert JSON data to instances of the SQLAlchemy model
        records = [model(**record_dict) for record_dict in record_list]

        # Add instances to the session and commit
        db.session.add_all(records)
        db.session.commit()
        return records
