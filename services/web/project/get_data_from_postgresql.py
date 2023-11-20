import json
import os

import pandas as pd
import psycopg2

WORKDIR = os.getenv("APP_FOLDER")


class GetDataFromPostgresql:
    indexes = []

    @staticmethod
    def connect_to_postgres():
        return psycopg2.connect(
            dbname=os.getenv("POSTGRES_DB"),
            user=os.getenv("POSTGRES_USER"),
            host="db",
            password=os.getenv("POSTGRES_PASSWORD"),
            port=5432,
            connect_timeout=3,
        )

    @staticmethod
    def get_track_from_postgresql():
        conn = GetDataFromPostgresql.connect_to_postgres()
        query = """SELECT * FROM ciucas_route"""

        # Use pandas to read SQL query results directly into a DataFrame
        df = pd.read_sql(query, conn)

        postgres_results = df.to_dict("records")

        with open(f"{WORKDIR}/project/mock_data/json_tamplate.json", "r") as f:
            runner = json.load(f)
            all_runners = runner["features"]
            for elements in postgres_results:
                all_runners.append({"type": "Feature", "properties": elements})

        return json.dumps(runner, indent=2, default=str, sort_keys=True)

    @staticmethod
    def get_runners_from_postgresql():
        conn = GetDataFromPostgresql.connect_to_postgres()
        query = """SELECT * FROM runners_ciucas ORDER BY ranking ASC"""

        # Use pandas to directly read SQL query results into a DataFrame
        df = pd.read_sql_query(query, conn)

        with open(f"{WORKDIR}/project/mock_data/json_tamplate.json", "r") as f:
            runner = json.load(f)
            all_runners = runner["features"]
            geometry = {"type": "Point", "coordinates": [0.0, 0.0]}

            # Convert the DataFrame to a dictionary and append it to the 'all_runners' list
            for _, row in df.iterrows():
                all_runners.append({"type": "Feature", "properties": row.to_dict(), "geometry": geometry})

        # Use the 'to_json' method of pandas DataFrame to convert the DataFrame to a JSON string
        return json.dumps(runner, indent=2, default=str, sort_keys=True)

    @staticmethod
    def random_runners_distance():
        stream_runners_from_postgres = GetDataFromPostgresql.get_runners_from_postgresql()
        runner = json.loads(stream_runners_from_postgres)
        ciucas_runner = runner["features"]

        category_values = {
            "Male(team)": 10,
            "Female(team)": 79,
            "Mix(team)": 41,
            "Male(individual)": 56,
            "Female(individual)": 69,
        }

        for i in range(len(ciucas_runner)):
            category = ciucas_runner[i]["properties"]["categ"]
            if category in category_values:
                return category_values[category]

    @staticmethod
    def get_data_from_ciucas_track():
        # still needs to be looked into
        running = True
        while running:
            stream_from_postgres = GetDataFromPostgresql.get_track_from_postgresql()
            track = json.loads(stream_from_postgres)
            all_points_track = track["features"]
            for index in range(len(all_points_track)):
                GetDataFromPostgresql.indexes.append(index)
                yield all_points_track


if __name__ == "__main__":
    GetDataFromPostgresql.get_runners_from_postgresql()
