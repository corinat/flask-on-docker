
"""
Utilities for retrieving and streaming track and runner data from a PostgreSQL database as GeoJSON.
Includes classes for direct data access and for streaming/transforming data for live applications.
"""

import json
import os

import pandas as pd
from project.db_config import get_sqlalchemy_database_uri
from sqlalchemy import create_engine

WORKDIR = os.getenv("APP_FOLDER")


class GetDataFromPostgresql:
    """
    Provides methods to fetch track and runner data from PostgreSQL and return as GeoJSON.
    """
    def __init__(self):
        """
        Initialize with a base GeoJSON structure.
        """
        self.geojson_structure = {"type": "FeatureCollection", "name": "ciucasx3", "features": []}

    @staticmethod
    def get_sqlalchemy_engine():
        """
        Create a SQLAlchemy engine using a helper for the DB URI.
        Returns:
            SQLAlchemy engine
        """
        return create_engine(get_sqlalchemy_database_uri())

    def get_track_from_postgresql(self):
        """
        Fetch all track data from the ciucas_route table and return as GeoJSON string.
        Returns:
            str: GeoJSON string of track features
        """
        engine = self.get_sqlalchemy_engine()
        query = """SELECT * FROM ciucas_route"""

        # Use pandas to read SQL query results directly into a DataFrame
        df = pd.read_sql_query(query, engine)

        track = self.geojson_structure

        # Convert the DataFrame to a list of dictionaries and append it to the 'features' list
        track["features"] = [{"type": "Feature", "properties": row} for row in df.to_dict("records")]
        return json.dumps(track, indent=2, default=str, sort_keys=True)

    def get_runners_from_postgresql(self):
        """
        Fetch all runner data from the runners_ciucas table and return as GeoJSON string.
        Returns:
            str: GeoJSON string of runner features
        """
        engine = self.get_sqlalchemy_engine()
        query = """SELECT * FROM runners_ciucas ORDER BY ranking ASC"""

        # Use pandas to directly read SQL query results into a DataFrame
        df = pd.read_sql_query(query, engine)

        runner = self.geojson_structure
        geometry = {"type": "Point", "coordinates": [0.0, 0.0]}

        # Convert the DataFrame to a list of dictionaries and append it to the 'features' list
        runner["features"] = [
            {"type": "Feature", "properties": row, "geometry": geometry} for row in df.to_dict("records")
        ]

        return json.dumps(runner, indent=2, default=str, sort_keys=True)


class StreamingData:
    """
    Provides methods for streaming track data and updating runner properties for live tracking.
    """
    def __init__(self):
        """
        Initialize with an empty list of indexes.
        """
        self.indexes = []

    def streem_track_from_postgres(self, track_from_postgresql):
        """
        Generator that yields all track points one by one, updating indexes.
        Args:
            track_from_postgresql (str): GeoJSON string of track data
        Yields:
            list: List of all track points (features)
        """
        while track_from_postgresql:
            track = json.loads(track_from_postgresql)
            all_points_track = track["features"]
            for index, _ in enumerate(all_points_track):
                self.indexes.append(index)
                yield all_points_track

    def update_runner_properties(
        self, runner, streem_features_from_ciucas_track, runner_index, track_index, spacing_factor
    ):
        """
        Update a runner's properties and coordinates based on their position on the track.
        Args:
            runner (dict): Runner feature dict
            streem_features_from_ciucas_track (list): List of track features
            runner_index (int): Index of the runner
            track_index (int): Index on the track
            spacing_factor (int): Spacing factor for animation
        Returns:
            dict: Updated runner feature dict
        """
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
