
//url = 'http://178.62.218.195/track/geoJSONLoc.json';
function realtimeFemaleInd(url, container) {
    return L.realtime(url, {
        interval: 1000,
        filter: function (feature, layer) {
          if (feature.properties.class === 'Female' + ' ' + '(individual)') {
            return true;
        }},
      //  onEachFeature: onEachFeature,
        //console.log (f.properties.url),
        //cache: true,
        container: container,
        onEachFeature(f, l) {
          l.bindPopup(function() {
              return '<h3>' + f.properties.name + '</h3>';
              //console.log(f.properties.pos_persons_id)
          });
        }
    });
}

function realtimeFemaleTeam(url, container) {
    return L.realtime(url, {
        interval: 1000,
        filter: function (feature, layer) {
          if (feature.properties.class === 'Female' + ' ' + '(team)') {
            return true;
        }},
      //  onEachFeature: onEachFeature,
        //console.log (f.properties.url),
        //cache: true,
        container: container,
        onEachFeature(f, l) {
          l.bindPopup(function() {
              return '<h3>' + f.properties.name + '</h3>';
              //console.log(f.properties.pos_persons_id)
          });
        }
    });
}

function realtimeMaleInd(url, container) {
    return L.realtime(url, {
        interval: 1000,
        filter: function (feature, layer) {
          if (feature.properties.class === 'Male' + ' ' + '(individual)') {
            return true;
        }},
      //  onEachFeature: onEachFeature,
        //console.log (f.properties.url),
        //cache: true,
        container: container,
        onEachFeature(f, l) {
          l.bindPopup(function() {
              return '<h3>' + f.properties.name + '</h3>';
              //console.log(f.properties.pos_persons_id)
          });
        }
    });
}


function realtimeMaleTeam(url, container) {
    return L.realtime(url, {
        interval: 1000,
        filter: function (feature, layer) {
          if (feature.properties.class === 'Male' + ' ' + '(team)') {
            return true;
        }},
      //  onEachFeature: onEachFeature,
        //console.log (f.properties.url),
        //cache: true,
        container: container,
        onEachFeature(f, l) {
          l.bindPopup(function() {
              return '<h3>' + f.properties.name + '</h3>';
              //console.log(f.properties.pos_persons_id)
          });
        }
    });
}

function realtimeMixTeam(url, container) {
    return L.realtime(url, {
        interval: 1000,
        filter: function (feature, layer) {
          if (feature.properties.class === 'Mix' + ' ' + '(team)') {
            return true;
        }},
      //  onEachFeature: onEachFeature,
        //console.log (f.properties.url),
        //cache: true,
        container: container,
        onEachFeature(f, l) {
          l.bindPopup(function() {
              return '<h3>' + f.properties.name + '</h3>';
              //console.log(f.properties.pos_persons_id)
          });
        }
    });
}
var map = L.map('map', {
    crs: L.CRS.EPSG3857,
    maxZoom: 17,
    minZoom: 10,
    zoom: 11.8,
    center: [45.42709, 25.94701],
});
    //clusterGroup = L.markerClusterGroup().addTo(map),
    var parent = L.featureGroup().addTo(map),
    subgroup1 = L.featureGroup.subGroup(parent);
    subgroup2 = L.featureGroup.subGroup(parent);
    subgroup3 = L.featureGroup.subGroup(parent);
    subgroup4 = L.featureGroup.subGroup(parent);
    subgroup5 = L.featureGroup.subGroup(parent);
    console.log(subgroup1)

    realtime1 = realtimeFemaleInd("http://134.209.93.38:3000/", subgroup1).addTo(map);
    realtime2 = realtimeFemaleTeam("http://134.209.93.38:3000/", subgroup2).addTo(map);
    realtime3 = realtimeMaleInd("http://134.209.93.38:3000/", subgroup3).addTo(map);
    realtime4 = realtimeMaleTeam("http://134.209.93.38:3000/", subgroup4).addTo(map);
    realtime5 = realtimeMixTeam("http://134.209.93.38:3000/", subgroup5).addTo(map);
    //realtime2 = createRealtimeLayer('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson', subgroup2);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php">USGS Earthquake Hazards Program</a>, &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.control.layers(null, {
    'Female Ind': subgroup1,
    'Female team': subgroup2,
    'Male Ind': subgroup3,
    'Male Team': subgroup4,
    'Mix team': subgroup5



}).addTo(map);

realtime1.on('update', function() {
   map.fitBounds(realtime1.getBounds(), {maxZoom: 3});
});

var controlSearch = new L.Control.Search({
  position:'topright',
  layer: parent,
  // initial: false,
  propertyName: 'name'
  // zoom: 12,
  // marker: false
});

map.addControl( controlSearch );








var realtimeFemaleInd = L.realtime({
  url: url,
  crossOrigin: true,
  type: 'json'
}, {
  //container: layerGroup,
  container: femaleIndividual,
  interval: 5000,
  pointToLayer: function(feature, latlng) {
    if (feature.properties.class === 'Female' + ' ' + '(individual)') {
      //pointToLayer: function(feature, latlng) {
      var customIcon = L.DivIcon.extend({
        options: {
          iconSize: [18, 18],
          className: 'leaflet-div-icon',
          html: "<div>" + feature.properties.bib + "</div>"
        }
      });
      return L.marker(latlng, {
        icon: new customIcon()
      });
    }
  },
  filter: function (feature, layer) {
    if (feature.properties.class === 'Female' + ' ' + '(individual)') {
      return true;
  }},

  onEachFeature: onEachFeature
}).addTo(map);

var femaleIndividual = L.layerGroup();
femaleIndividual.addLayer(realtimeFemaleInd)
map.addLayer(femaleIndividual)



var realtimeFemaleTeam = L.realtime({
  url: url,
  crossOrigin: true,
  type: 'json'
}, {
  //container: layerGroup,
  container: femaleTeam,
  interval: 5000,
  pointToLayer: function(feature, latlng) {
    if (feature.properties.class === 'Female' + ' ' + '(team)') {
      //pointToLayer: function(feature, latlng) {
      var customIcon4 = L.DivIcon.extend({
        options: {
          iconSize: [18, 18],
          className: 'leaflet-div-icon4',
          html: "<div>" + feature.properties.bib + "</div>"
        }
      });
      return L.marker(latlng, {
        icon: new customIcon4()
      });
    }
  },
  filter: function (feature, layer) {
    if (feature.properties.class === 'Female' + ' ' + '(team)') {
      return true;
  }},

  onEachFeature: onEachFeature
}).addTo(map);

var femaleTeam = L.layerGroup();
femaleTeam.addLayer(realtimeFemaleTeam)
map.addLayer(femaleTeam)


var realtimeMaleInd = L.realtime({
  url: url,
  crossOrigin: true,
  type: 'json'
}, {
  container: maleIndividual,
  interval: 5000,
  pointToLayer: function(feature, latlng) {
    if (feature.properties.class === 'Male' + ' ' + '(individual)') {
      //pointToLayer: function(feature, latlng) {
      var customIcon3 = L.DivIcon.extend({
        options: {
          iconSize: [18, 18],
          className: 'leaflet-div-icon3',
          html: "<div>" + feature.properties.bib + "</div>"
        }
      });
      return L.marker(latlng, {
        icon: new customIcon3()
      });
    }
  },
  filter: function (feature, layer) {
    if (feature.properties.class === 'Male' + ' ' + '(individual)') {
      return true;
  }},
  onEachFeature: onEachFeature
}).addTo(map);

var maleIndividual = L.layerGroup();
maleIndividual.addLayer(realtimeMaleInd)
map.addLayer(maleIndividual)


var realtimeMaleTeam = L.realtime({
  url: url,
  crossOrigin: true,
  type: 'json'
}, {
  //container: layerGroup,
  container: maleTeam,
  interval: 5000,
  pointToLayer: function(feature, latlng) {
    if (feature.properties.class === 'Male' + ' ' + '(team)') {
      var customIcon2 = L.DivIcon.extend({
        options: {
          iconSize: [18, 18],
          className: 'leaflet-div-icon2',
          html: "<div>" + feature.properties.bib + "</div>"
        }
      });
      return L.marker(latlng, {
        icon: new customIcon2()
      });
    }
  },
  filter: function (feature, layer) {
    if (feature.properties.class === 'Male' + ' ' + '(team)') {
      return true;
  }},
  onEachFeature: onEachFeature
}).addTo(map);



var maleTeam = L.layerGroup();
maleTeam.addLayer(realtimeMaleTeam)
map.addLayer(maleTeam)


var realtimeMixTeam = L.realtime({
  url: url,
  crossOrigin: true,
  type: 'json'
}, {
  //container: layerGroup,
  container: mixTeam,
  interval: 5000,
  pointToLayer: function(feature, latlng) {
    if (feature.properties.class === 'Mix' + ' ' + '(team)') {
      var customIcon5 = L.DivIcon.extend({
        options: {
          iconSize: [18, 18],
          className: 'leaflet-div-icon5',
          html: "<div>" + feature.properties.bib + "</div>"
        }
      });
      return L.marker(latlng, {
        icon: new customIcon5()
      });
    }
  },
  filter: function (feature, layer) {
    if (feature.properties.class === 'Mix' + ' ' + '(team)') {
      return true;
  }},
  onEachFeature: onEachFeature
}).addTo(map);

var mixTeam = L.layerGroup();
mixTeam.addLayer(realtimeMixTeam)
map.addLayer(mixTeam)
