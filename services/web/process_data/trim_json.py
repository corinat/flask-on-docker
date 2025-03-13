import json

geojson = 'runners.geojson'

trim_dictionary = []   
def trim_json():
    with open(geojson, 'r') as f:
        runner = json.load(f)
        # print(runner)
        all_runners = runner['features']
        len_values = len(all_runners)
        for index in range(len_values): 
            all_runners = runner['features'][index]['properties']
            # all_runners = runner['features'][index]['geometry']
            trim_dictionary.append(all_runners)
            # print(all_runners)
    with open("trim_runners.json", "w") as jsonFile:
        json.dump(trim_dictionary, jsonFile, ensure_ascii=False, indent=4)
        

trim_json()