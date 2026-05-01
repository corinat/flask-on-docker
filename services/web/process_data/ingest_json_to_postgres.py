import json

from project.models import db


class IngestMockDataToPostgres:
    @staticmethod
    def ingest_ciucas_data_in_postgres(model, json_file):
        with open(json_file) as json_data:
            record_list = json.load(json_data)


        # Only remove 'id' for User model
        records = []
        for record_dict in record_list:
            if model.__name__ == "User":
                record_dict.pop('id', None)
            records.append(model(**record_dict))

        # Add instances to the session and commit
        db.session.add_all(records)
        db.session.commit()
        return records
