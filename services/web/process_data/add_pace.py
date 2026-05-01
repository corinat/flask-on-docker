"""
Enrich route GeoJSON with simulated per-segment pace.
"""

import json


def add_pace(route_file, output_file, seconds_per_segment=15.0):
    """
    Reads route GeoJSON that already contains cumulative distance, calculates
    per-segment pace, and writes the enriched payload to a new file.

    Args:
        route_file (str): Path to the input route GeoJSON file with cumulative distance.
        output_file (str): Path where the enriched route GeoJSON will be saved.
        seconds_per_segment (float): Simulated seconds to traverse one segment.
    """
    print(f"Processing: {route_file} -> {output_file}")

    with open(route_file, "r", encoding="utf-8") as f:
        route_data = json.load(f)

    features = route_data.get("features", [])
    print(f"Found {len(features)} route features")

    if not features:
        print("No route features found. Exiting.")
        return

    # First point has no previous segment.
    first_properties = features[0].setdefault("properties", {})
    first_properties["segment_distance"] = 0.0
    first_properties["pace"] = 0.0

    for idx in range(1, len(features)):
        current_properties = features[idx].setdefault("properties", {})
        previous_properties = features[idx - 1].setdefault("properties", {})

        current_distance = float(current_properties.get("distance", 0.0))
        previous_distance = float(previous_properties.get("distance", 0.0))
        segment_distance = max(current_distance - previous_distance, 0.0)
        current_properties["segment_distance"] = round(segment_distance, 3)

        if segment_distance > 0 and seconds_per_segment > 0:
            pace_min_per_km = (seconds_per_segment / 60.0) / (segment_distance / 1000.0)
            current_properties["pace"] = round(pace_min_per_km, 3)
        else:
            current_properties["pace"] = 0.0

    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(route_data, f, ensure_ascii=False, indent=4)

    print(f"Wrote segment pace data in {output_file}\n")


if __name__ == "__main__":
    # Usage: python add_pace.py <route_file> <output_file> [seconds_per_segment]
    import sys

    default_route_input = "process_data/data/ciucas_route_distance.geojson"
    default_output = "process_data/data/ciucas_route_pace.geojson"

    if len(sys.argv) == 1:
        add_pace(default_route_input, default_output)
    elif len(sys.argv) == 3:
        add_pace(sys.argv[1], sys.argv[2])
    elif len(sys.argv) == 4:
        add_pace(sys.argv[1], sys.argv[2], float(sys.argv[3]))
    else:
        print("Usage: python add_pace.py <route_file> <output_file> [seconds_per_segment]")