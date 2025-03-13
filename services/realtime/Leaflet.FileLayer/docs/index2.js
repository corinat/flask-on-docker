var map = L.map("map", {
    center: [0, 0],
    zoom: 0
});

var mainmap = L.tileLayer(
    'http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png', {
    attribution: '&copy; Tiles courtesy of MapQuest', // simplified just for the demo, keep proper attribution in your application.
    maxZoom: 19,
    subdomains: '1234',
}).addTo(map);

var baseMaps = {
    "Base Layer": mainmap
};
var overlayMaps = {
};

L.Control.FileLayerLoad.LABEL = '<i class="fa fa-folder-open"></i>';;

//Loads external geojson file:
var fileload = new L.Control.fileLayerLoad({
    fileSizeLimit: 5000,
    fitBounds: true, //MOVE THE CENTER OF THE SCREEN
    layerOptions: {
        onEachFeature: function (feature, layer) {
            // Need to assign a random name in case it is not defined in the file. You may not need this.
            var name = feature.properties.name;
            if (typeof name === "undefined") {
                name = "random" + Math.round(Math.random() * 100);
            }

            layer.bindPopup("Name: " + name);

            // Store the reference to each individual layer if you want to add them to the Layers Control as individual layers.
            overlayMaps[name] = layer;
        }
    }
}).addTo(map);

// Add the overlays to the Layers Control at the end of the file loading.
fileload.loader.on('data:loaded', function (e) {
    // Add to map layer switcher

    // Example from Leaflet.FileLayer to load the entire file content as 1 single layer.
    layerswitcher.addOverlay(e.layer, e.filename);

    // Example to load each individual feature as a separate overlay.
    /*for (var i in overlayMaps) {
    	layerswitcher.addOverlay(overlayMaps[i], i)
    }
    overlayMaps = {};*/
});

var layerswitcher = L.control.layers(baseMaps, overlayMaps).addTo(map);

