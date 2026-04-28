"""
ETL utility to extract 'properties' from GeoJSON features and write them as a list of dicts to a JSON file.

Processes both route and runner GeoJSON files for downstream ingestion.
"""
import json


def trim_json(input_geojson, output_json):
    """
    Extracts the 'properties' from each feature in a GeoJSON file and writes them to a JSON file as a list.

    Args:
        input_geojson (str): Path to the input GeoJSON file.
        output_json (str): Path to the output JSON file.
    """
    trim_dictionary = []
    with open(input_geojson, 'r') as f:
        data = json.load(f)
        features = data['features']
        print(f"Found {len(features)} features in {input_geojson}")
        for feature in features:
            trim_dictionary.append(feature['properties'])
    with open(output_json, "w") as jsonFile:
        json.dump(trim_dictionary, jsonFile, ensure_ascii=False, indent=4)
    print(f"Wrote {len(trim_dictionary)} items to {output_json}\n")

if __name__ == '__main__':
    import sys

    # Default file paths
    default_input_1 = 'project/mock_data/ciucas_route_distance.geojson'
    default_output_1 = 'project/mock_data/ciucas_route.json'
    default_input_2 = 'process_data/data/runners.geojson'
    default_output_2 = 'project/mock_data/ciucas_runners.json'

    if len(sys.argv) == 1:
        # No arguments, use defaults for both
        trim_json(default_input_1, default_output_1)
        trim_json(default_input_2, default_output_2)
    elif len(sys.argv) == 3:
        # One pair of input/output provided
        trim_json(sys.argv[1], sys.argv[2])
    elif len(sys.argv) == 5:
        # Two pairs of input/output provided
        trim_json(sys.argv[1], sys.argv[2])
        trim_json(sys.argv[3], sys.argv[4])
    else:
        print("Usage: python trim_json.py [<input1> <output1> [<input2> <output2>]]")