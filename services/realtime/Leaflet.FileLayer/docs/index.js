
        var control;
        var L = window.L;
        var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; 2013 OpenStreetMap contributors'
        });
        var map = L.map('map', {
            center: [0, 0],
            zoom: 2
        }).addLayer(osm);
        var style = {
            color: 'red',
            opacity: 1.0,
            fillOpacity: 1.0,
            weight: 2,
            clickable: false
        };

        var overlayMaps = {
        };

        L.Control.FileLayerLoad.LABEL = '<i class="fa fa-folder-open"></i>';
        var control = L.Control.fileLayerLoad({
            fitBounds: true,
            layerOptions: {
                style: style,
                pointToLayer: function (data, latlng) {
                    return L.circleMarker(
                        latlng,
                        { style: style }
                    );
                }, 
                onEachFeature: function (feature, layer) {
                    layer.bindPopup("Name: " + feature.properties.Name);
                    
                }
            }
        });
        
        control.addTo(map);
        
        
        L.Control.Custom = L.Control.Layers.extend({
            options: {
                position: 'topleft',
                collapsed: false
            },
            onAdd: function () {
                this._initLayout();
                this._addButton();
                this._update();
                //layerControls.remove()
                
                return this._container;
            },
         
            _addButton: function () {
                var elements = this._container.getElementsByClassName('leaflet-control-layers-list');
                var button = L.DomUtil.create('button', 'my-button-class', elements[0]);
                //button.textContent = 'x';
                control.loader.on('data:loaded', function (e) {
                    layerswitcher.addOverlay(e.layer, e.filename);
                    lastLayer = e.layer;

                });
            },
           
           
        });

       
        var layerswitcher = new L.Control.Custom(null, null).addTo(map);
      
