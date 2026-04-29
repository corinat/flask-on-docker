import json

from haversine import haversine


def add_distance(input_file, output_file):
    """
    Reads a GeoJSON file, computes cumulative distances between consecutive
    coordinate points, and writes the updated data to a new file.

    Args:
        input_file (str): Path to the input GeoJSON file.
        output_file (str): Path where the output GeoJSON will be saved.

    Behavior:
        - Computes distance between consecutive points using the haversine formula.
        - Stores cumulative distance (in meters) in each feature under 'distance'.
        - First point gets distance = 0.
    """
    print(f"Processing: {input_file} -> {output_file}")

    with open(input_file, "r") as f:
        data = json.load(f)

    features = data["features"]
    print(f"Found {len(features)} features")

    if not features:
        print("No features found. Exiting.")
        return

    # Initialize first point
    prev = (
        features[0]["properties"]["ycoord"],
        features[0]["properties"]["xcoord"],
    )
    cumulative_distance = 0.0
    features[0]["properties"]["distance"] = 0.0

    # Iterate once through all points
    for i in range(1, len(features)):
        curr = (
            features[i]["properties"]["ycoord"],
            features[i]["properties"]["xcoord"],
        )

        # distance in kilometers → convert to meters
        step_distance = haversine(prev, curr) * 1000
        cumulative_distance += step_distance

        features[i]["properties"]["distance"] = round(cumulative_distance, 3)

        prev = curr

    with open(output_file, "w") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

    print(f"Wrote distances in {output_file}\n")


if __name__ == "__main__":
    """
    Entry point for command-line usage.

    Usage:
        python get_distance.py <input_file> <output_file>
    """
    import sys

    default_input = "services/web/process_data/data/ciucas_gpx.geojson"
    default_output = "services/web/process_data/data/ciucas_route_distance.geojson"

    if len(sys.argv) == 1:
        add_distance(default_input, default_output)
    elif len(sys.argv) == 3:
        add_distance(sys.argv[1], sys.argv[2])
    else:
        print("Usage: python get_distance.py <input_file> <output_file>")
