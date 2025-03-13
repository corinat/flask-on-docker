import json
from haversine import haversine, Unit


x = []
y = []
indexes = []
list_dist = []

get_ciucas = 'test2_ciucas_gpx.geojson'


def add_data(my_array):
    sum = 0
    summed_array = []
    for i in my_array:
        summed_array += [sum / 1000]
        sum += i
        yield(sum * 1000)


def add_distance():
    with open(get_ciucas, 'r') as f:
        runner = json.load(f)
        all_runners = runner['features']
        len_values = len(all_runners)
        for index in range(len_values): 
            indexes.append(index)
        for i in range(len(indexes)):
            x.append(all_runners[i]['properties']['xcoord'])
            y.append(all_runners[i]['properties']['ycoord'])

        #paring the coordinates in tuple 
        lst_tuple = list(zip(y,x))
        
        for i in range(1, len(lst_tuple)):
            current = lst_tuple[i]
            previous = lst_tuple[i - 1]
            distance = haversine(previous, current)
            # print(type(distance))
            distance_round = round(distance, 6)
            list_dist.append(distance_round)
            
            for data in add_data(list_dist):   
                all_runners[0]['properties'].update({"distance":0})
                all_runners[i]['properties'].update({"distance":data})
            
        with open("updated_ciucas2.json", "w") as jsonFile:
            json.dump(runner, jsonFile, ensure_ascii=False, indent=4)

if __name__ == '__main__':
    add_distance()     





