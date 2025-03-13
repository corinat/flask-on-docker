
//url = 'http://178.62.218.195/track/geoJSONLoc.json';
function createRealtimeLayer(url, container) {
    return L.realtime(url, {
        interval: 1000,
        getFeatureId: function(f) {
            return f.properties.url;

        },
        console.log (f.properties.url)
        cache: true,
        container: container,
        onEachFeature(f, l) {
          l.bindPopup(function() {
              return '<h3>' + f.properties.pos_persons_id + '</h3>';
              console.log(f.properties.pos_persons_id)
          });
        }
    });
}

var map = L.map('map');
    clusterGroup = L.markerClusterGroup().addTo(map),
    subgroup1 = L.featureGroup.subGroup(clusterGroup);

    realtime1 = createRealtimeLayer('http://178.62.218.195/track/geoJSONLoc.json', subgroup1).addTo(map);
    //realtime2 = createRealtimeLayer('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson', subgroup2);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php">USGS Earthquake Hazards Program</a>, &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// L.control.layers(null, {
//     'Earthquakes 2.5+': realtime1,
//   //  'All Earthquakes': realtime2
// }).addTo(map);

realtime1.once('update', function() {
   map.fitBounds(realtime1.getBounds(), {maxZoom: 3});
});
