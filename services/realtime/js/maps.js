//define the base maps
function maps() {

  var mapwizardAttrib = 'Map by <a href= "https://bit.ly/2bD2rGh" title="e-mail: corina@mapwizard.eu">mapWizard</a>'
  var googleAttribution = ' | &copy; <a href="https://developers.google.com/maps/">Google</a>'

  var otmLayer = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    otmLayerAttrib = mapwizardAttrib + ' | Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
    openTopoMap = L.tileLayer(otmLayer, {
      maxZoom: 18,
      attribution: otmLayerAttrib
    });

  var osmThunderforestCycle = 'https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=82e46bc958184051ad7622d375155df5',
    osmAttrib = mapwizardAttrib + ' |  Maps &copy; <a href="http://www.thunderforest.com">Thunderforest</a>, Data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
    osmThunderforest = L.tileLayer(osmThunderforestCycle, {
      maxZoom: 18,
      zIndex: 0,
      attribution: osmAttrib
    });

  var osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    osmAttrib = mapwizardAttrib + ' &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    osmMap = L.tileLayer(osmUrl, {
      maxZoom: 18,
      zIndex: 9,
      attribution: osmAttrib
    });

  var googleHybrid = 'https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',
    googleAttrib = mapwizardAttrib + googleAttribution,
    googleHybridMap = L.tileLayer(googleHybrid, {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution: googleAttrib
    });
  var googleTerrain = 'https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',
    googleAttrib = mapwizardAttrib + googleAttribution,
    googleTerrainMap = L.tileLayer(googleTerrain, {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution: googleAttrib
    });


  return {
    osmMap: osmMap,
    osmThunderforest: osmThunderforest,
    googleHybridMap: googleHybridMap,
    googleTerrainMap: googleTerrainMap,
    openTopoMap: openTopoMap,
  }
}


//define map properties
function mapProperties() {
  var bounds = new L.LatLngBounds(new L.LatLng(45.0388268430888559, 25.4024801036778811), new L.LatLng(45.8030126498206585, 26.2221588343911165));
  var map = {
    crs: L.CRS.EPSG3857,
    maxZoom: 17,
    minZoom: 10,
    zoom: 12,
    center: bounds.getCenter(),
    zoomDelta: 1,
    zoomSnap: 0.5,
    // autoZIndex: true,
    maxBounds: bounds,
    maxBoundsViscosity: 0.75,
    elevationControl: {
      url: "./date/ultra-real-time.geojson",
      options: {
        autohide: false,
        autohidePositionMarker: true,
        collapsed: false,
        controlButton: {
          iconCssClass: "elevation-toggle-icon",
          title: "Elevation"
        },
        detached: false,
        distanceFactor: 1,
        elevationDiv: "#elevation-div",
        followPositionMarker: false,
        forceAxisBounds: false,
        gpxOptions: {
          async: false,
          marker_options: {
            startIconUrl: null,
            endIconUrl: null,
            shadowUrl: null,
          },
          polyline_options: {
            className: '',
            color: '#566B13',
            opacity: 0.75,
            weight: 5,
            lineCap: 'round'
          },
        },
        height: 120,
        heightFactor: 1,
        hoverNumber: {
          decimalsX: 2,
          decimalsY: 0,
          formatter: undefined
        },
        imperial: false,
        interpolation: "curveLinear",
        lazyLoadJS: true,
        position: "bottomright",
        theme: "lime-theme",
        margins: {
          top: 10,
          right: 20,
          bottom: 30,
          left: 50
        },
        responsive: true,
        showTrackInfo: false,
        useHeightIndicator: true,
        useLeafletMarker: false,
        useMapIndicator: true,
        width: 600,
        xLabel: "km",
        xTicks: undefined,
        yAxisMax: undefined,
        yAxisMin: undefined,
        yLabel: "m",
        yTicks: undefined,
        zFollow: 13,
      },
    },
  };
  return {
    maps: map,
    crs: map.crs,
    zoom: map.zoom,
    maxZoom: map.maxZoom,
    minZoom: map.minZoom,
    zoomDelta: map.zoomDelta,
    zoomSnap: map.zoomSnap,
    center: map.center,
    autoZIndex: map.autoZIndex,
    maxBounds: map.maxBounds,
    maxBoundsViscosity: map.maxBoundsViscosity,
    bounceAtZoomLimits: map.bounceAtZoomLimits,
    boxZoom: map.boxZoom,
    elevationControl: map.elevationControl

  }
  //console.log(center, zoom)
}


//extend the leaflet icon object
var LeafletIcon = L.Icon.extend({
  options: {
    //shadowUrl: 'leaf-shadow.png',
    iconSize: [38, 40], // size of the icon
    iconAnchor: [18, 35], // point of the icon which will correspond to marker's location
    popupAnchor: [2, -37],
    //shadowSize:   [50, 64],
    //shadowAnchor: [4, 62],
  }
});


//define points of interest on the map like control points, peaks, cabans and theyr coresponded icons
function pointsOfInterest() {
  var izvor = L.icon({
    iconUrl: '../trasee_bicicleta_PNBV/img/izvor.png',
    iconSize: [18, 20], // size of the icon
    iconAnchor: [10, 15], // point of the icon which will correspond to marker's location
    popupAnchor: [-2, -11],
  });

  var varfuri = L.icon({
    iconUrl: './img/varf.png',
    iconSize: [28, 30], // size of the icon
    iconAnchor: [14, 30], // point of the icon which will correspond to marker's location
    popupAnchor: [2, -11],
  });
  var cabana = L.icon({
    iconUrl: './img/cabin.png',
    iconSize: [30, 28], // size of the icon
    iconAnchor: [10, 15], // point of the icon which will correspond to marker's location
    popupAnchor: [6, -15],
  });
  var start = new L.icon({
    iconUrl: './img/start.png',
    iconAnchor: [18, 35], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -37],
    iconSize: [36, 38]
    //shadowSize:   [25, 30]
  });

  var pc1 = new LeafletIcon({
    iconUrl: './img/ultra/1.png'
  });
  var pc2_16 = new LeafletIcon({
    iconUrl: './img/ultra/2_16.png',
  });
  var pc3 = new LeafletIcon({
    iconUrl: './img/ultra/3.png'
  });
  var pc4 = new LeafletIcon({
    iconUrl: './img/ultra/4.png'
  });
  var pc5 = new LeafletIcon({
    iconUrl: './img/ultra/5.png'
  });
  var pc6_8 = new LeafletIcon({
    iconUrl: './img/ultra/6_8.png'
  });
  var pc7 = new LeafletIcon({
    iconUrl: './img/ultra/7.png'
  });
  var pc9 = new LeafletIcon({
    iconUrl: './img/ultra/9.png'
  });
  var pc10 = new LeafletIcon({
    iconUrl: './img/ultra/10.png'
  });
  var pc11 = new LeafletIcon({
    iconUrl: './img/ultra/11.png'
  });
  var pc12 = new LeafletIcon({
    iconUrl: './img/ultra/12.png'
  });
  var pc13 = new LeafletIcon({
    iconUrl: './img/ultra/13.png'
  });
  var pc14 = new LeafletIcon({
    iconUrl: './img/ultra/14.png'
  });
  var pc15 = new LeafletIcon({
    iconUrl: './img/ultra/15.png'
  });
  var pc17 = new LeafletIcon({
    iconUrl: './img/ultra/17.png'
  });
  var pc18 = new LeafletIcon({
    iconUrl: './img/ultra/18.png'
  });
  //console.log(pc17)
  //console.log(pc8)
  return {
    varfuri,
    start,
    pc1,
    pc2_16,
    pc3,
    pc4,
    pc5,
    pc6_8,
    pc7,
    pc9,
    pc10,
    pc11,
    pc12,
    pc13,
    pc14,
    pc15,
    pc17,
    pc18,
    izvor,
    cabana
  }
};


//bind an icon and popup content to each of the control points
function onEachFeatureUltra(feature, layer) {
  if (feature.properties.controlpoint === "P1") {
    layer.bindPopup('<b>' + '<font size = 2, font color = Black>' + feature.properties.controlpoint + '</font>' + '</b>' + '</br>' + feature.properties.Name);
    layer.setIcon(pc1);
  }
  else if (feature.properties.controlpoint === "P2\/P16") {
    layer.bindPopup('<b>' + '<font size = 2, font color = Black>' + feature.properties.controlpoint + '</font>' + '</b>' + '</br>' + feature.properties.Name);
    layer.setIcon(pc2_16);
  }
  else if (feature.properties.controlpoint === "P3") {
    layer.bindPopup('<b>' + '<font size = 2, font color = Black>' + feature.properties.controlpoint + '</font>' + '</b>' + '</br>' + feature.properties.Name);
    layer.setIcon(pc3);
  }
  else if (feature.properties.controlpoint === "P17") {
    layer.bindPopup('<b>' + '<font size = 2, font color = Black>' + feature.properties.controlpoint + '</font>' + '</b>' + '</br>' + feature.properties.Name);
    layer.setIcon(pc17);
  }
  else if (feature.properties.controlpoint === "P4") {
    layer.bindPopup('<b>' + '<font size = 2, font color = Black>' + feature.properties.controlpoint + '</font>' + '</b>' + '</br>' + feature.properties.Name);
    layer.setIcon(pc4);
  }
  else if (feature.properties.controlpoint === "P5") {
    layer.bindPopup('<b>' + '<font size = 2, font color = Black>' + feature.properties.controlpoint + '</font>' + '</b>' + '</br>' + feature.properties.Name);
    layer.setIcon(pc5);
  }
  else if (feature.properties.controlpoint === "P6\/P8") {
    layer.bindPopup('<b>' + '<font size = 2, font color = Black>' + feature.properties.controlpoint + '</font>' + '</b>' + '</br>' + feature.properties.Name);
    layer.setIcon(pc6_8);
  }
  else if (feature.properties.controlpoint === "P7") {
    layer.bindPopup('<b>' + '<font size = 2, font color = Black>' + feature.properties.controlpoint + '</font>' + '</b>' + '</br>' + feature.properties.Name);
    layer.setIcon(pc7);
  }
  else if (feature.properties.controlpoint === "P9") {
    layer.bindPopup('<b>' + '<font size = 2, font color = Black>' + feature.properties.controlpoint + '</font>' + '</b>' + '</br>' + feature.properties.Name);
    layer.setIcon(pc9);
  }
  else if (feature.properties.controlpoint === "P10") {
    layer.bindPopup('<b>' + '<font size = 2, font color = Black>' + feature.properties.controlpoint + '</font>' + '</b>' + '</br>' + feature.properties.Name);
    layer.setIcon(pc10);
  }
  else if (feature.properties.controlpoint === "P11") {
    layer.bindPopup('<b>' + '<font size = 2, font color = Black>' + feature.properties.controlpoint + '</font>' + '</b>' + '</br>' + feature.properties.Name);
    layer.setIcon(pc11);
  }
  else if (feature.properties.controlpoint === "P12") {
    layer.bindPopup('<b>' + '<font size = 2, font color = Black>' + feature.properties.controlpoint + '</font>' + '</b>' + '</br>' + feature.properties.Name);
    layer.setIcon(pc12);
  }
  else if (feature.properties.controlpoint === "P13") {
    layer.bindPopup('<b>' + '<font size = 2, font color = Black>' + feature.properties.controlpoint + '</font>' + '</b>' + '</br>' + feature.properties.Name);
    layer.setIcon(pc13);
  }
  else if (feature.properties.controlpoint === "P14") {
    layer.bindPopup('<b>' + '<font size = 2, font color = Black>' + feature.properties.controlpoint + '</font>' + '</b>' + '</br>' + feature.properties.Name);
    layer.setIcon(pc14);
  }
  else if (feature.properties.controlpoint === "P15") {
    layer.bindPopup('<b>' + '<font size = 2, font color = Black>' + feature.properties.controlpoint + '</font>' + '</b>' + '</br>' + feature.properties.Name);
    layer.setIcon(pc15);
  }
  else if (feature.properties.controlpoint === "P17") {
    layer.bindPopup('<b>' + '<font size = 2, font color = Black>' + feature.properties.controlpoint + '</font>' + '</b>' + '</br>' + feature.properties.Name);
    layer.setIcon(pc17);
  }
  else if (feature.properties.controlpoint === "P18") {
    layer.bindPopup('<b>' + '<font size = 2, font color = Black>' + feature.properties.controlpoint + '</font>' + '</b>' + '</br>' + feature.properties.Name);
    layer.setIcon(pc18);
  }
  else if (feature.properties.type === "start") {
    layer.bindPopup('<b>' + '<font size = 2, font color = Black>' + feature.properties.controlpoint + '</font>' + '</b>' + '</br>' + feature.properties.Name);
    layer.setIcon(start);
  }
  else if (feature.properties.name && feature.properties.ele) {
    layer.bindPopup('<b>' + '<font size = 2, font color = Black>' + feature.properties.name + '</font>' + '</b>' + '</br>' + feature.properties.ele + 'm');
    layer.setIcon(varfuri);
  }
  else if (feature.properties.alt) {
    layer.bindPopup('<b>' + '<font size = 2, font color = Black>' + feature.properties.name + '</b>' + '</br>' + feature.properties.alt + '</font>');
    layer.setIcon(cabana);
  }
}

function onEachFeatureUltraChart(feature, layer) {
  if (feature.properties.controlpoint){
    return true
  }
}

