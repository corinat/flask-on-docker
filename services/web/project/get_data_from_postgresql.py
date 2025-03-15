import json
import os

import pandas as pd
import psycopg2


WORKDIR = os.getenv("APP_FOLDER")

class GetDataFromPostgresql:
    def __init__(self):
        self.geojson_structure = {"type": "FeatureCollection", "name": "ciucasx3", "features": []}

    @staticmethod
    def connect_to_postgres():
        return psycopg2.connect(
            dbname=os.getenv("POSTGRES_DB"),
            user=os.getenv("POSTGRES_USER"),
            password=os.getenv("POSTGRES_PASSWORD"),
            host=os.getenv("POSTGRES_HOST"), 
            port=os.getenv("POSTGRES_PORT"),
            connect_timeout=3,
        )

    def get_track_from_postgresql(self):
        conn = self.connect_to_postgres()
        query = """SELECT * FROM ciucas_route"""

        # Use pandas to read SQL query results directly into a DataFrame
        df = pd.read_sql_query(query, conn)

        track = self.geojson_structure

        # Convert the DataFrame to a list of dictionaries and append it to the 'features' list
        track["features"] = [{"type": "Feature", "properties": row} for row in df.to_dict("records")]
        return json.dumps(track, indent=2, default=str, sort_keys=True)

    def get_runners_from_postgresql(self):
        conn = self.connect_to_postgres()
        query = """SELECT * FROM runners_ciucas ORDER BY ranking ASC"""

        # Use pandas to directly read SQL query results into a DataFrame
        df = pd.read_sql_query(query, conn)

        runner = self.geojson_structure
        geometry = {"type": "Point", "coordinates": [0.0, 0.0]}

        # Convert the DataFrame to a list of dictionaries and append it to the 'features' list
        runner["features"] = [
            {"type": "Feature", "properties": row, "geometry": geometry} for row in df.to_dict("records")
        ]

        return json.dumps(runner, indent=2, default=str, sort_keys=True)


class StreamingData:
    def __init__(self):
        self.indexes = []
        

    def streem_track_from_postgres(self, track_from_postgresql):
        while track_from_postgresql:
            track = json.loads(track_from_postgresql)
            all_points_track = track["features"]
            for index, _ in enumerate(all_points_track):
                self.indexes.append(index)
                yield all_points_track
                

    def update_runner_properties(
        self, runner, streem_features_from_ciucas_track, runner_index, track_index, spacing_factor
    ):
        runner_position = (
            (spacing_factor * runner_index + track_index) % len(streem_features_from_ciucas_track)
            if (runner_index + track_index) >= 0
            else None
        )
        runner["properties"].update(streem_features_from_ciucas_track[runner_position]["properties"])
        runner["geometry"]["coordinates"][0] = streem_features_from_ciucas_track[runner_position]["properties"][
            "xcoord"
        ]
        runner["geometry"]["coordinates"][1] = streem_features_from_ciucas_track[runner_position]["properties"][
            "ycoord"
        ]
        runner["properties"]["distance"] = round(
            streem_features_from_ciucas_track[runner_position]["properties"]["distance"], -1
        )
        runner["properties"]["alt"] = streem_features_from_ciucas_track[runner_position]["properties"]["ele"]
        return runner
