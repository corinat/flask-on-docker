var mapping = maps();
var first = mapping.osmMap;
var second = mapping.osmThunderforest;
var third = mapping.googleHybridMap;
var forth = mapping.googleTerrainMap;
var fifth = mapping.openTopoMap;

//import basemap properties from map.js
var getMapProperties = mapProperties();
opts = getMapProperties.maps;
crs = getMapProperties.crs;
zoom = getMapProperties.zoom;
maxZoom = getMapProperties.maxZoom;
minZoom = getMapProperties.minZoom;
center = getMapProperties.center;
maxBounds = getMapProperties.maxBounds;
zoomDelta = getMapProperties.zoomDelta;
zoomSnap = getMapProperties.zoomSnap;
bounceAtZoomLimits = getMapProperties.bounceAtZoomLimits,
  maxBoundsViscosity = getMapProperties.maxBoundsViscosity;
elevationControl = getMapProperties.elevationControl;

var bounds = new L.LatLngBounds(new L.LatLng(45.0395480962353574, 25.5018762548552118), new L.LatLng(45.8037339029671600, 26.3556700037296849));
var map = new L.map('map', {
  zoomControl: false,
  center: bounds.getCenter(),
  tap: true,
  tapTolerance: 15,
  touchZoom: true,
  dblclick: true,
  crs: crs,
  maxZoom: maxZoom,
  minZoom: minZoom,
  zoom: 11,
  zoomDelta: zoomDelta,
  zoomSnap: zoomSnap,
  maxBounds: maxBounds,
  maxBoundsViscosity: maxBoundsViscosity,
  bounceAtZoomLimits: bounceAtZoomLimits,
});

fifth.addTo(map);


var zoomHome = L.Control.zoomHome({
  position: 'topleft',
  homeZoom: 11
});
zoomHome.addTo(map);


var mapPointsOfInterest = pointsOfInterest();
varfuri = mapPointsOfInterest.varfuri
start = mapPointsOfInterest.start
pc1 = mapPointsOfInterest.pc1
pc2_16 = mapPointsOfInterest.pc2_16
pc3 = mapPointsOfInterest.pc3
pc4 = mapPointsOfInterest.pc4
pc5 = mapPointsOfInterest.pc5
pc6_8 = mapPointsOfInterest.pc6_8
pc7 = mapPointsOfInterest.pc7
pc9 = mapPointsOfInterest.pc9
pc10 = mapPointsOfInterest.pc10
pc11 = mapPointsOfInterest.pc11
pc12 = mapPointsOfInterest.pc12
pc13 = mapPointsOfInterest.pc13
pc14 = mapPointsOfInterest.pc14
pc15 = mapPointsOfInterest.pc15
pc17 = mapPointsOfInterest.pc17
pc18 = mapPointsOfInterest.pc18
izvor = mapPointsOfInterest.izvor
cabana = mapPointsOfInterest.cabana

$(document).ready(function () {
  if (window.innerWidth < 500) {
    sidebar.close('sponsors');
  }
});

//add scale
map.addControl(new L.Control.Scale({
  imperial: false,
  position: 'bottomright'
}));

var vf = L.geoJson(varfuriCiucas, {
  filter: function (feature, layer) {
    return ((feature.properties.type === "semi") || (feature.properties.type === "ultra") || (feature.properties.type === "maraton"));
  },
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      zIndexOffset: 19, riseOnHover: true
    });
  },
  onEachFeature: onEachFeatureUltra
}).addTo(map);

var cabaneCiucas = L.geoJson(cabaneSemi, {
  filter: function (feature, layer) {
    return (feature.properties.type === "semi");
  },
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      zIndexOffset: 9, riseOnHover: true
    });
  },
  onEachFeature: onEachFeatureUltra
}).addTo(map);

var pc1Content = '<b>Culmea Buzoianu</b></br></br>1156m, 4.2km<img class="tooltip" src="../ultramarathon-realtime/img/buzoianu.jpg" alt="Culmea Buzoianu" width="82" height="142"><img src="../ultramarathon-realtime/img/apa44.png" title="Hydratation point" height="22" width="22"> <img src="../ultramarathon-realtime/img/control22.png" title="Time check" height="16" width="16">'
var pc2_16Content = '<b>Stânii Glade</b></br></br>965m, 8.6/92km</br><img src="../ultramarathon-realtime/img/revit2.png" title="Food" height="22" width="22"> <img src="../ultramarathon-realtime/img/apa44.png" title="Hydratation point" height="22" width="22"> <img src="../ultramarathon-realtime/img/control22.png" title="Time check" height="16" width="16"><img src="../ultramarathon-realtime/img/rescue.png" title="First Aid" style ="color:green" height="22" width="22"></br></br><b>Time limit at 92km, </br>20 hours.</b>'
var pc3Content = '<b>Curmătura Văii Stânii</b></br></br>1436m, 19km <img src="../ultramarathon-realtime/img/apa44.png" title="Hydratation point" height="22" width="22"> <img src="../ultramarathon-realtime/img/control22.png" title="Time check" height="16" width="16">'
var pc4Content = '<b>Cabana Ciucaș</b></br></br>1613m, 23.8km <img src="../ultramarathon-realtime/img/revit2.png" title="Food" height="22" width="22"> <img src="../ultramarathon-realtime/img/apa44.png" title="Hydratation point" height="22" width="22"> <img src="../ultramarathon-realtime/img/control22.png" title="Time check" height="16" width="16">'
var pc5Content = '<b>Ciucaș Peak</b></br></br>1954m, 26km <img src="../ultramarathon-realtime/img/control22.png" title="Time check" height="16" width="16">'
var pc6_8Content = '<b>Șaua Țigăi</b></br></br>1632m, 27.7/35km <img src="./img/control22.png" title="Time check" height="16" width="16">'
var pc7Content = '<b>Poiana Teslei</b></br></br>1380m, 30km <img src="../ultramarathon-realtime/img/revit2.png" title="Food" height="22" width="22"><img src="../ultramarathon-realtime/img/apa44.png" title="Hydratation point" height="22" width="22">'
var pc9Content = '<b>Pas Bratocea</b></br></br>1276m, 39km <img src="../ultramarathon-realtime/img/revit2.png" title="Food" height="22" width="22"> <img src="../ultramarathon-realtime/img/apa44.png" title="Hydratation point" height="22" width="22"> <img src="../ultramarathon-realtime/img/control22.png" title="Time check" height="16" width="16"></br></br><b>Time limit, 8 hours.</b>'
var pc10Content = '<b>Grohotiș Peak</b></br></br>1749m, 47km <img src="../ultramarathon-realtime/img/apa44.png" title="Hydratation point" height="22" width="22"> <img src="../ultramarathon-realtime/img/control22.png" title="Time check" height="16" width="16">'
var pc11Content = '<b>Ulița Peak</b></br></br>1512m, 51.3km <img src="../ultramarathon-realtime/img/apa44.png" title="Hydratation point" height="22" width="22"> <img src="../ultramarathon-realtime/img/control22.png" title="Time check" height="16" width="16">'
var pc12Content = '<b>Nebunu Sheepfold</b></br></br> 1369m, 55km </br><img src="../ultramarathon-realtime/img/revit2.png" title="Food" style ="stroke:green" height="22" width="22">  <img src="../ultramarathon-realtime/img/apa44.png" title="Hydratation point" height="22" width="22">  <img src="../ultramarathon-realtime/img/control22.png" title="Time check" height="16" width="16"> <img src="../ultramarathon-realtime/img/rescue.png" title="First Aid" style ="color:green" height="22" width="22">'
var pc13Content = '<b>Măneciu Dam</b></br></br>603m, 66.6km <img src="../ultramarathon-realtime/img/apa44.png" title="Hydratation point" height="22" width="22"> <img src="../ultramarathon-realtime/img/control22.png" title="Time check" height="16" width="16"></br></br><b>Time limit, 14 hours.</b>'
var pc14Content = '<b>Crai&#39s Peak</b></br></br>1447m, 81km <img src="../ultramarathon-realtime/img/control22.png" title="Time check" height="16" width="16"> <img src="../ultramarathon-realtime/img/rescue.png" title="First Aid" style ="color:green" height="22" width="22">'
var pc15Content = '<b>Sub Tabla Buții</b></br></br>1273m, 90km <img src="../ultramarathon-realtime/img/control22.png" title="Time check" height="16" width="16"> <img src="../ultramarathon-realtime/img/rescue.png" title="First Aid" style ="color:green" height="22" width="22">'
var pc17Content = '<b>La Rascruce</b></br></br>1804m, 99.5km <img src="../ultramarathon-realtime/img/control22.png" title="Time check" height="16" width="16"> <img src="../ultramarathon-realtime/img/rescue.png" title="First Aid" style ="color:green" height="22" width="22">'
var pc18Content = '<b>Cabana Silva</b></br></br>1277m, 103km </br><img src="../ultramarathon-realtime/img/revit2.png" title="Food" style ="stroke:green" height="22" width="22">  <img src="../ultramarathon-realtime/img/apa44.png" title="Hydratation point" height="22" width="22">  <img src="../ultramarathon-realtime/img/control22.png" title="Time check" height="16" width="16"> <img src="../ultramarathon-realtime/img/rescue.png" title="First Aid" style ="color:green" height="22" width="22">'
var start_finishContent = '<b>Start/Finish<br></b></br>883m, 108km </br></br><b>Course time limit, </br>26 hours.</b>'


var pc1 = new L.Marker([45.46272, 25.976786], { icon: pc1, zIndexOffset: 9, riseOnHover: true }).bindPopup('<p class="medium">' + pc1Content + '</p>').addTo(map);
var pc2_16 = new L.Marker([45.469511, 26.017404], { icon: pc2_16, zIndexOffset: 9, riseOnHover: true }).bindPopup('<p class="medium">' + pc2_16Content + '</p>').addTo(map);
var pc3 = new L.Marker([45.514433, 25.989214], { icon: pc3, zIndexOffset: 9, riseOnHover: true }).bindPopup('<p class="medium">' + pc3Content + '</p>').addTo(map);
var pc4 = new L.Marker([45.511458, 25.945653], { icon: pc4, zIndexOffset: 9, riseOnHover: true }).bindPopup('<p class="medium">' + pc4Content + '</p>').addTo(map);
var pc5 = new L.Marker([45.520731, 25.927853], { icon: pc5, zIndexOffset: 9, riseOnHover: true }).bindPopup('<p class="medium">' + pc5Content + '</p>').addTo(map);
var pc6_8 = new L.Marker([45.516287, 25.918825], { icon: pc6_8, zIndexOffset: 9, riseOnHover: true }).bindPopup('<p class="medium">' + pc6_8Content + '</p>').addTo(map);
var pc7 = new L.Marker([45.52084, 25.89398], { icon: pc7, zIndexOffset: 9, riseOnHover: true }).bindPopup('<p class="medium">' + pc7Content + '</p>').addTo(map);
var pc9 = new L.Marker([45.486134, 25.891635], { icon: pc9, zIndexOffset: 9, riseOnHover: true }).bindPopup('<p class="medium">' + pc9Content + '</p>').addTo(map);
var pc10 = new L.Marker([45.41406, 25.865443], { icon: pc10, zIndexOffset: 9, riseOnHover: true }).bindPopup('<p class="medium">' + pc10Content + '</p>').addTo(map);
var pc11 = new L.Marker([45.377194, 25.849218], { icon: pc11, zIndexOffset: 9, riseOnHover: true }).bindPopup('<p class="medium">' + pc11Content + '</p>').addTo(map);
var pc12 = new L.Marker([45.35014, 25.870722], { icon: pc12, zIndexOffset: 9, riseOnHover: true }).bindPopup('<p class="medium">' + pc12Content + '</p>').addTo(map);
var pc13 = new L.Marker([45.324043, 25.979413], { icon: pc13, zIndexOffset: 9, riseOnHover: true }).bindPopup('<p class="medium">' + pc13Content + '</p>').addTo(map);
var pc14 = new L.Marker([45.415819, 26.046075], { icon: pc14, zIndexOffset: 9, riseOnHover: true }).bindPopup('<p class="medium">' + pc14Content + '</p>').addTo(map);
var pc15 = new L.Marker([45.478393, 26.045661], { icon: pc15, zIndexOffset: 9, riseOnHover: true }).bindPopup('<p class="medium">' + pc15Content + '</p>').addTo(map);
var pc17 = new L.Marker([45.49942188, 25.9715795], { icon: pc17, zIndexOffset: 9, riseOnHover: true }).bindPopup('<p class="medium">' + pc17Content + '</p>').addTo(map);
var pc18 = new L.Marker([45.490257, 25.94285], { icon: pc18, zIndexOffset: 9, riseOnHover: true }).bindPopup('<p class="medium">' + pc18Content + '</p>').addTo(map);
var start_finish = new L.Marker([45.457500, 25.937797], { icon: start, zIndexOffset: 9, riseOnHover: true }).bindPopup('<p class="medium">' + start_finishContent + '</p>').addTo(map);



function showOWMInfoClouds(weatherInfo) {
  if (weatherInfo.hasOwnProperty("clouds")) {
    return weatherInfo.clouds.all;
  } else {
    return '0'
  }
};

function showOWMInfoRain(weatherInfo) {
  if (weatherInfo.hasOwnProperty("rain")) {
    if (weatherInfo.rain["3h"])
      return (weatherInfo.rain["3h"] / 3).toFixed(2)
    else if (weatherInfo.rain["1h"])
      return weatherInfo.rain["1h"]
  } else if (!weatherInfo.hasOwnProperty("rain")) {
    return '0'
  }
};



apiKey = '12a6593319b4379dc2f2521c70a52849'
apiKeyRoCorina = '7ed2844c2746f2d5e8b9d8cfefb5c2a8'
//https://api.openweathermap.org/data/2.5/forecast?lat='+ll.lat+'&lon='+ll.lng + "&appid=" + apiKey;
map.on('popupopen', function (event) {
  var ll = event.popup.getLatLng();
  var url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + ll.lat + '&lon=' + ll.lng + "&appid=" + apiKey;
  $.getJSON(url, function (response) {
    var weatherCondtionIconHtml = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png + width=38 height=36";
    var weatherDescription = response.weather[0].description;
    var weatherStation = response.name;
    var airHumidity = response.main.humidity;
    var rain = showOWMInfoRain(response)
    var windSpeed = Math.round((response.wind.speed * 3.6) * 100) / 100;
    var temperatureCelsius = Math.round((response.main.temp - 273) * 100) / 100;  // Converting Kelvin 
    var temperatureCelsiusFeelLike = Math.round((response.main.feels_like - 273) * 100) / 100;  // Converting Kelvin    
    var cloudCoverage = showOWMInfoClouds(response)
    var popupWeatherContent = '<img src=' + weatherCondtionIconHtml +
      '<br>' + weatherDescription +
      '<br><b>Temp: </b>' + temperatureCelsius + '°C' +
      '<br><b>Feels like: </b>' + temperatureCelsiusFeelLike + '°C' +
      '<br><b>Humidity: </b>' + airHumidity + '%' +
      '</br><b>Wind speed: </b>' + windSpeed + 'm/s' +
      '<br><b>Rainfall: </b>' + rain + 'mm/h' +
      '<br><b>Cloud coverage: </b>' + cloudCoverage + '%' +
      "</br> <b>Source:</b> <a href='https://openweathermap.org/' target='_blank'>OWM</a>"


    pc1._popup.setContent('<p class="medium">' + pc1Content + "</br>" + popupWeatherContent + '</p>');
    pc2_16._popup.setContent('<p class="medium">' + pc2_16Content + "</br>" + popupWeatherContent + '</p>');
    pc3._popup.setContent('<p class="medium">' + pc3Content + "</br>" + popupWeatherContent + '</p>');
    pc4._popup.setContent('<p class="medium">' + pc4Content + "</br>" + popupWeatherContent + '</p>');
    pc5._popup.setContent('<p class="medium">' + pc5Content + "</br>" + popupWeatherContent + '</p>');
    pc6_8._popup.setContent('<p class="medium">' + pc6_8Content + "</br>" + popupWeatherContent + '</p>');
    pc7._popup.setContent('<p class="medium">' + pc7Content + "</br>" + popupWeatherContent + '</p>');
    pc9._popup.setContent('<p class="medium">' + pc9Content + "</br>" + popupWeatherContent + '</p>');
    pc10._popup.setContent('<p class="medium">' + pc10Content + "</br>" + popupWeatherContent + '</p>');
    pc11._popup.setContent('<p class="medium">' + pc11Content + "</br>" + popupWeatherContent + '</p>');
    pc12._popup.setContent('<p class="medium">' + pc12Content + "</br>" + popupWeatherContent + '</p>');
    pc13._popup.setContent('<p class="medium">' + pc13Content + "</br>" + popupWeatherContent + '</p>');
    pc14._popup.setContent('<p class="medium">' + pc14Content + "</br>" + popupWeatherContent + '</p>');
    pc15._popup.setContent('<p class="medium">' + pc15Content + "</br>" + popupWeatherContent + '</p>');
    pc17._popup.setContent('<p class="medium">' + pc17Content + "</br>" + popupWeatherContent + '</p>');
    pc18._popup.setContent('<p class="medium">' + pc18Content + "</br>" + popupWeatherContent + '</p>');
    start_finish._popup.setContent('<p class="medium">' + start_finishContent + "</br>" + popupWeatherContent + '</p>');
    //console.log(response)
  });
});


//for getting the peaks and control points on the graph
var controlPointsChart = L.geoJson(alim, {
  onEachFeature: onEachFeatureUltraChart
});


var controlPointsChart = L.geoJson(alim, {
  onEachFeature: onEachFeatureUltraChart
});


// Add sidebar to map
var sidebar = L.control.sidebar({
  autopan: false,       // whether to maintain the centered map point when opening the sidebar
  closeButton: true,    // whether t add a close button to the panes
  container: 'sidebar', // the DOM container or #ID of a predefined sidebar container that should be used
  position: 'left',     // left or right
}).addTo(map);

sidebar.open('disclaimer');

sidebar.addPanel({
  id: 'femInd',
  tab: '<i class="fas fa-running" style="color:rgb(241, 196, 15);"></i>',
  title: 'Ranking Female - Individual',
  pane: '<p><p/>',
  disabled: false
});

sidebar.addPanel({
  id: 'maleInd',
  tab: '<i class="fas fa-running" style="color:rgb(46,134,193);"></i>',
  title: 'Ranking Male - Individual',
  pane: '<p><p/>',
  disabled: false
});

sidebar.addPanel({
  id: 'allTeams',
  tab: '<span class="fa-stack style="font-size: 0.7em" style="vertical-align: middle; font-size: 0.3em; left: 0.2px;"><i class="fas fa-running  fa-stack style="font-size: 3.5em;"></i><i class="fas fa-running fa-stack-1x fa-inverse style="font-size: 0.7em;" style="color: rgba(53,184,29,1);"><i class="fas fa-running fa-stack-3x fa-inverse" style="font-size: 1.4em; color: purple;"></i></span>',
  title: 'Ranking Teams',
  pane: '<p><p/>',
  disabled: false
});

sidebar.addPanel({
  id: 'info',
  tab: '<i class="fas fa-info"></i>',
  title: 'Info',
  pane: '<p><p/>',
  disabled: true

});


sidebar.addPanel({
  id: 'copyright',
  tab: '<i class="fas fa-copyright"></i>',
  title: 'Copyright',
  pane: '</br><p class="lorem">The map was created by <a class="links" href="http://bit.ly/2bD2rGh" target="_blank">mapWizard</a>, using the JavaScript library <a class = "links" href = "http : //leafletjs.com/ "target ="_ blank">Leaflet</a>, that allows geospatial data to be displayed in the browser, under a free license. </p> <p class =" lorem"> Basemaps like OpenStreetMap or derived from OpenStreetMap and Google Maps, are used as a means of displaying data in accordance with the license terms imposed by each data provider. </p> <p class = "lorem"> Some of the icons are taken from <a class="links" href="http://mapicons.nicolasmollet.com/" target="_blank"> Map Icons Collection </a> and are used in accordance with the terms of the <a class="links" href="https://mapicons.mapsmarker.com/about/license/" target="_blank">license</a>.</p> ',
  disabled: false,
  position: 'bottom'
});


//Allow info pannel to close when clicking on the arrow
$('#info').on('click', function (e) {
  e.preventDefault();
  e.stopPropagation();
  sidebar.close('info');
});

sidebar.disablePanel('info')

// url_all = 'http://localhost:1337/live'
url_all = 'http://live.mapwizard.eu/live'
// http://localhost:1337/live
// url_all = 'http://api.mapwizard.eu:1337/live'

var markersFemaleInd = {};
var rankingFemaleInd = {};
var nameFemaleInd = {};
var markersMaleInd = {};
var rankingMaleInd = {};
var nameMaleInd = {};
var bibMaleInd = {};
var genderMaleInd = {};
var genderFemaleInd = {};
var bibFemaleInd = {};

var genderTeams = {};
var bibTeams = {};
var markersTeams = {};
var rankingTeams = {};
var nameTeams = {};


var infoPanel = [];
var infoPanelSidebar = [];
var infoPanelThis = [];



function openSidebar(objectID) {
  if ($('#sidebar-text').text().length > 0) {
    $("#sidebar-text").removeText();
  }
  for (var i = 0, len = infoPanelSidebar.length; i < len; i++) {
    if (infoPanelSidebar[i].id === parseInt(objectID)) {
      infoPanelThis = (infoPanelSidebar[i]);
    }
  }

  sidebar.open('info');
  sidebar.enablePanel('info');
  if (sidebar.open('info') === true) {
    sidebar.close('info');
    sidebar.disablePanel('info');
  } else {
    sidebar.disablePanel('info');
  }

  function renameClassesInSidebar() {
    if ((infoPanelThis.class_ === 'Male' + ' ' + '(team)') || (infoPanelThis.class_ === 'Female' + ' ' + '(team)') ||
      (infoPanelThis.class_ === 'Mix' + ' ' + '(team)')) {
      infoPanelThis.class_ = 'Teams'
    }
    if ((infoPanelThis.class_ === 'Male' + ' ' + '(individual)')) {
      infoPanelThis.class_ = 'Male' + ' ' + '(indv)'
    }
    if ((infoPanelThis.class_ === 'Female' + ' ' + '(individual)')) {
      infoPanelThis.class_ = 'Female' + ' ' + '(indv)'
    }
    return infoPanelThis.class_
  }

  var divToAddContent = document.getElementById('info');
  var properties = ['Club', infoPanelThis.club, 'Country', '-', 'Rank' + ' - ' + renameClassesInSidebar(), infoPanelThis.ranking, 'BIB', infoPanelThis.bib, 'Start',
    '00:00:00', 'CP1', '00:41:01', 'CP2', '01:47:16', 'CP3', '03:36:55', 'CP4', '04:27:47', 'CP5', '05:02:42', 'CP6', '06:28:15', 'CP7', '07:51:01',
    'CP8', '09:19:35', 'CP9', '10:05:26', 'CP10', '-', 'CP11', '11:19:16', 'CP12', '13:20:55', 'CP13', '17:15:15', 'CP14', '-',
    'CP15', '19:32:17', 'CP16', '20:03:13', 'CP17', '23:44:09', 'CP18', '24:46:00', 'Finish', '25:37:51']

  var perrow = 2,
    html = '<h1 class="leaflet-sidebar-header">Information<span class="leaflet-sidebar-close"><i class="fa fa-caret-left"></i></span></h1>'
  html += '<table id = "tableInfoDetailes" class="table table-striped  table-responsive"><br>'

  for (var i = 0; i < properties.length; i++) {
    html += "<td>" + properties[i] + "</td>";
    var next = i + 1;
    if (next % perrow == 0 && next != properties.length) {
      html += "</tr><tr>";
    }
  }
  html += "</tr></table>";
  divToAddContent.innerHTML = html;
  $("#tableInfoDetailes tr td:first-child").addClass("boldText");

  function CreateHeader() {
    var table = document.getElementById("tableInfoDetailes");
    if (!table.tHead) {
      var header = table.createTHead();
      var row = header.insertRow(0);
      var cell = row.insertCell(0);
      cell.innerHTML = infoPanelThis.name;
    }
  }
  CreateHeader()
  //add class to header
  $("#tableInfoDetailes thead:first").addClass("thead-dark");
  $(".thead-dark tr td").attr('colspan', 2);
  //map.closePopup();
}

$("div").on("click", '.sidebar-open-button', function () {
  var ID = $(this).attr("data");
  openSidebar(ID);
});


//Add runners to map - realtime data
function realtimeFemaleInd(url_all, container) {
  return L.realtime(url_all, {
    interval: 7000,
    getFeatureId: function (f) {
      return f.properties.name;
    },
    removeMissing: true,
    //cache: true,
    container: container,
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
      if (feature.properties.class_ === 'Female' + ' ' + '(individual)') {
        var customIcon = L.DivIcon.extend({
          options: {
            iconSize: [18, 18],
            popupAnchor: [0, 0],
            className: 'leaflet-div-icon4',
            iconAnchor: [9, 9],
            html: "<div>" + feature.properties.bib + "</div>"
          }
        });

        controlElevation.setRunner({
          id: feature.properties.bib,
          className: 'leaflet-div-icon4',
          dist: feature.properties.distance / 1000,
          text: feature.properties.bib,
          color: 'rgba(241, 196, 15,0.7)',
          onClick: function () {
            markersFemaleInd[feature.properties.id].togglePopup();
          },
          onMouseOver: function () {
            $(markersFemaleInd[feature.properties.id]._icon).addClass('selectedMarker')
          },
          onMouseMove: function () {
            $(markersFemaleInd[feature.properties.id]._icon).addClass('selectedMarker')
          },
          onMouseOut: function () {
            $(markersFemaleInd[feature.properties.id]._icon).removeClass('selectedMarker')
          },
          onSelect: function () {
            $(markersFemaleInd[feature.properties.id]._icon).addClass('selectedMarker')
          },
          onUnselect: function () {
            $(markersFemaleInd[feature.properties.id]._icon).removeClass('selectedMarker')
          }
        });

        rankingFemaleInd[feature.properties.id] = feature.properties.ranking;
        nameFemaleInd[feature.properties.id] = feature.properties.name;
        bibFemaleInd[feature.properties.id] = feature.properties.bib;
        genderFemaleInd[feature.properties.id] = feature.properties.gender;

        infoPanel[feature.properties.id] = feature.properties;
        infoPanelSidebar.push(infoPanel[feature.properties.id])

        markersFemaleInd[feature.properties.id] = L.marker(latlng, { icon: new customIcon(), zIndexOffset: 300, riseOnHover: true });

        markersFemaleInd[feature.properties.id].on('mouseover', function (e) {
          if (e.target.feature && e.target.feature.properties && e.target.feature.properties.bib) {
            controlElevation.selectRunner(e.target.feature.properties.bib)
          }
        })

        markersFemaleInd[feature.properties.id].on('mouseout', function (e) {
          if (e.target.feature && e.target.feature.properties && e.target.feature.properties.bib) {
            controlElevation.unselectRunner(e.target.feature.properties.bib)
          }
        })

        var circlesFemaleInd = markersFemaleInd[feature.properties.id]

        var perrow = 1;
        var html = '';
        html = '<table id="headerTable" class="table table-striped table-responsive table-sortable"><thead class="thead-dark"><tr><th>Rank</th><th class="setWidth">Name</th><th>BIB</th><th>Gender</th>'
        html += '<th>START</th><th>CP1</th><th>CP2</th><th>CP3</th><th>CP4</th><th>CP5</th><th>CP6</th><th>CP7</th><th>CP8</th><th>CP9</th><th>CP10</th><th>CP11</th>'
        html += '<th>CP12</th><th>CP13</th><th>CP14</th><th>CP15</th><th>CP16</th><th>CP17</th><th>CP18</th><th>FINISH</th></tr></thead>';
        for (var i in markersFemaleInd) {
          html += '<td><b>' + rankingFemaleInd[i] + ' ' + '</b></td>'
          html += '<td>' + '<a href="#" onmouseover="onTabRunnerMouseover(' + bibFemaleInd[i] + ')" onmouseout="onTabRunnerMouseout(' + bibFemaleInd[i] + ')" onclick=markersFemaleInd["' + [i] + '"].openTooltip()><b>' + nameFemaleInd[i] + '</b></a><br/>' + '</td>';
          html += '<td><b>' + bibFemaleInd[i] + '</b></td>'
          html += '<td><b>' + genderFemaleInd[i] + '</b></td>' + '<td><b>' + '00:00:00' + '</b></td>' + '<td><b>' + '00:41:01' + '</b></td>' + '<td><b>' + '01:47:16' + '</b></td>'
          html += '<td><b>' + '03:36:55' + '</b></td>' + '<td><b>' + '04:27:47' + '</b></td>' + '<td><b>' + '05:02:42' + '</b></td>' + '<td><b>' + '06:28:15' + '</b></td>'
          html += '<td><b>' + '07:51:01' + '</b></td>' + '<td><b>' + '09:19:35' + '</b></td>' + '<td><b>' + '10:05:26' + '</b></td>' + '<td><b>' + '-' + '</b></td>' + '<td><b>' + '11:19:16' + '</b></td>'
          html += '<td><b>' + '13:20:55' + '</b></td>' + '<td><b>' + '-' + '</b></td>' + '<td><b>' + '19:32:17' + '</b></td>' + '<td><b>' + '20:03:13' + '</b></td>' + '<td><b>' + '23:44:09' + '</b></td>'
          html += '<td><b>' + '24:46:00' + '</b></td>' + '<td><b>' + '-' + '</b></td>' + '<td><b>' + '25:37:51' + '</b></td>'
          var next = i + 1;
          if ((next % perrow == 0) && next != markersFemaleInd[i]) {
            html += "</tr><tr>";
          }
        }
        html += "</tr></table>";

        document.getElementById('anchorsFemaleInd').innerHTML = html;
        $('#femInd').append(anchorsFemaleInd);
        $(function () {
          // pass the id and the <td> place you want to sort by (td counts from 0)
          sortTable('headerTable', 0);
        });
        return circlesFemaleInd
      }
    }
  });
}

function realtimeMaleInd(url_all, container) {
  return L.realtime(url_all, {
    interval: 7000,
    getFeatureId: function (f) {
      return f.properties.name;
    },
    removeMissing: true,
    //cache: true,
    container: container,
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
      if (feature.properties.class_ === 'Male' + ' ' + '(individual)') {
        var customIcon3 = L.DivIcon.extend({
          options: {
            iconSize: [18, 18],
            popupAnchor: [0, 0],
            className: 'leaflet-div-icon3',
            iconAnchor: [9, 9],
            html: "<div>" + feature.properties.bib + "</div>"
          }
        });
        controlElevation.setRunner({
          id: feature.properties.bib,
          className: 'leaflet-div-icon3',
          dist: feature.properties.distance / 1000,
          text: feature.properties.bib,
          color: 'rgba(46, 134, 193,0.7)',
          onClick: function () {
            markersMaleInd[feature.properties.id].togglePopup();
          },

          onMouseOver: function () {
            $(markersMaleInd[feature.properties.id]._icon).addClass('selectedMarker')
          },
          onMouseMove: function () {
            $(markersMaleInd[feature.properties.id]._icon).addClass('selectedMarker')
          },
          onMouseOut: function () {
            $(markersMaleInd[feature.properties.id]._icon).removeClass('selectedMarker')
          },

          onSelect: function () {
            $(markersMaleInd[feature.properties.id]._icon).addClass('selectedMarker')
          },
          onUnselect: function () {
            $(markersMaleInd[feature.properties.id]._icon).removeClass('selectedMarker')
          }
        });

        infoPanel[feature.properties.id] = feature.properties;
        infoPanelSidebar.push(infoPanel[feature.properties.id])

        rankingMaleInd[feature.properties.id] = feature.properties.ranking;
        nameMaleInd[feature.properties.id] = feature.properties.name;
        bibMaleInd[feature.properties.id] = feature.properties.bib;
        genderMaleInd[feature.properties.id] = feature.properties.gender;

        markersMaleInd[feature.properties.id] = L.marker(latlng, { icon: new customIcon3(), zIndexOffset: 300, riseOnHover: true });

        markersMaleInd[feature.properties.id].on('mouseover', function (e) {
          if (e.target.feature && e.target.feature.properties && e.target.feature.properties.bib) {
            controlElevation.selectRunner(e.target.feature.properties.bib)
          }
        })

        markersMaleInd[feature.properties.id].on('mouseout', function (e) {
          if (e.target.feature && e.target.feature.properties && e.target.feature.properties.bib) {
            controlElevation.unselectRunner(e.target.feature.properties.bib)
          }
        })

        var circlesMaleInd = markersMaleInd[feature.properties.id]

        var perrow = 1;
        var html = '';
        html = '<table id="headerTable" class="table table-striped table-responsive table-sortable"><thead class="thead-dark"><tr><th>Rank</th><th class="setWidth">Name</th><th>BIB</th><th>Gender</th>'
        html += '<th>START</th><th>CP1</th><th>CP2</th><th>CP3</th><th>CP4</th><th>CP5</th><th>CP6</th><th>CP7</th><th>CP8</th><th>CP9</th><th>CP10</th><th>CP11</th>'
        html += '<th>CP12</th><th>CP13</th><th>CP14</th><th>CP15</th><th>CP16</th><th>CP17</th><th>CP18</th><th>FINISH</th></tr></thead>';
        for (var i in markersMaleInd) {
          html += '<td><b>' + rankingMaleInd[i] + ' ' + '</b></td>'
          html += '<td>' + '<a href="#" onmouseover="onTabRunnerMouseover(' + bibMaleInd[i] + ')" onmouseout="onTabRunnerMouseout(' + bibMaleInd[i] + ')" onclick=markersMaleInd["' + [i] + '"].openTooltip()><b>' + nameMaleInd[i] + '</b></a><br/>' + '</td>';
          html += '<td><b>' + bibMaleInd[i] + '</b></td>'
          html += '<td><b>' + genderMaleInd[i] + '</b></td>' + '<td><b>' + '00:00:00' + '</b></td>' + '<td><b>' + '00:41:01' + '</b></td>' + '<td><b>' + '01:47:16' + '</b></td>'
          html += '<td><b>' + '03:36:55' + '</b></td>' + '<td><b>' + '04:27:47' + '</b></td>' + '<td><b>' + '05:02:42' + '</b></td>' + '<td><b>' + '06:28:15' + '</b></td>'
          html += '<td><b>' + '07:51:01' + '</b></td>' + '<td><b>' + '09:19:35' + '</b></td>' + '<td><b>' + '10:05:26' + '</b></td>' + '<td><b>' + '-' + '</b></td>' + '<td><b>' + '11:19:16' + '</b></td>'
          html += '<td><b>' + '13:20:55' + '</b></td>' + '<td><b>' + '-' + '</b></td>' + '<td><b>' + '19:32:17' + '</b></td>' + '<td><b>' + '20:03:13' + '</b></td>' + '<td><b>' + '23:44:09' + '</b></td>'
          html += '<td><b>' + '24:46:00' + '</b></td>' + '<td><b>' + '-' + '</b></td>' + '<td><b>' + '25:37:51' + '</b></td>'
          var next = i + 1;
          if ((next % perrow == 0) && next != markersMaleInd[i]) {
            html += "</tr><tr>";
          }
        }
        html += "</tr></table>";
        document.getElementById('anchorsMaleInd').innerHTML = html;
        $('#maleInd').append(anchorsMaleInd);
        return circlesMaleInd
      }
    }
  });
}


function realtimeFemaleTeam(url_all, container) {
  return L.realtime(url_all, {
    interval: 7000,
    getFeatureId: function (f) {
      return f.properties.name;
    },
    removeMissing: true,
    //cache: true,
    container: container,
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
      if (feature.properties.class_ === 'Female' + ' ' + '(team)') {
        var customIcon4 = L.DivIcon.extend({
          options: {
            iconSize: [18, 18],
            popupAnchor: [0, 0],
            className: 'leaflet-div-icon',
            iconAnchor: [9, 9],
            html: "<div>" + feature.properties.bib + "</div>"
          }
        });
        controlElevation.setRunner({
          id: feature.properties.bib,
          className: 'leaflet-div-icon',
          dist: feature.properties.distance / 1000,
          text: feature.properties.bib,
          color: 'rgba(255,25,91,0.7)',
          onClick: function () {
            markersTeams[feature.properties.id].togglePopup();
          },
          onMouseOver: function () {
            $(markersTeams[feature.properties.id]._icon).addClass('selectedMarker')
          },
          onMouseOut: function () {
            $(markersTeams[feature.properties.id]._icon).removeClass('selectedMarker')
          },
          onMouseMove: function () {
            $(markersTeams[feature.properties.id]._icon).addClass('selectedMarker')
            // $(markersFemaleInd[feature.properties.id].openTooltip());
          },
          onSelect: function () {
            $(markersTeams[feature.properties.id]._icon).addClass('selectedMarker')
          },
          onUnselect: function () {
            $(markersTeams[feature.properties.id]._icon).removeClass('selectedMarker')
          }
        });
        rankingTeams[feature.properties.id] = feature.properties.ranking;
        nameTeams[feature.properties.id] = feature.properties.name;
        bibTeams[feature.properties.id] = feature.properties.bib;
        genderTeams[feature.properties.id] = feature.properties.gender;
        markersTeams[feature.properties.id] = L.marker(latlng, { icon: new customIcon4(), zIndexOffset: 300, riseOnHover: true });

        markersTeams[feature.properties.id].on('mouseover', function (e) {
          if (e.target.feature && e.target.feature.properties && e.target.feature.properties.bib) {
            controlElevation.selectRunner(e.target.feature.properties.bib)
          }
        })

        markersTeams[feature.properties.id].on('mouseout', function (e) {
          if (e.target.feature && e.target.feature.properties && e.target.feature.properties.bib) {
            controlElevation.unselectRunner(e.target.feature.properties.bib)
          }
        })

        infoPanel[feature.properties.id] = feature.properties;
        infoPanelSidebar.push(infoPanel[feature.properties.id])

        var circlesTeams = markersTeams[feature.properties.id]

        var perrow = 1;
        var html = '';
        html = '<table id="headerTable" class="table table-striped table-responsive table-sortable"><thead class="thead-dark"><tr><th>Rank</th><th class="setWidth">Name</th><th>BIB</th><th>Gender</th>'
        html += '<th>START</th><th>CP1</th><th>CP2</th><th>CP3</th><th>CP4</th><th>CP5</th><th>CP6</th><th>CP7</th><th>CP8</th><th>CP9</th><th>CP10</th><th>CP11</th>'
        html += '<th>CP12</th><th>CP13</th><th>CP14</th><th>CP15</th><th>CP16</th><th>CP17</th><th>CP18</th><th>FINISH</th></tr></thead>';
        for (var i in markersTeams) {
          html += '<td><b>' + rankingTeams[i] + '</b></td>'
          html += '<td>' + '<a href="#" onmouseover="onTabRunnerMouseover(' + bibTeams[i] + ')" onmouseout="onTabRunnerMouseout(' + bibTeams[i] + ')" onclick=markersTeams["' + [i] + '"].openTooltip()><b>' + nameTeams[i] + '</b></a><br/>' + '</td>';
          html += '<td><b>' + bibTeams[i] + '</b></td>'
          html += '<td><b>' + genderTeams[i] + '</b></td>' + '<td><b>' + '00:00:00' + '</b></td>' + '<td><b>' + '00:41:01' + '</b></td>' + '<td><b>' + '01:47:16' + '</b></td>'
          html += '<td><b>' + '03:36:55' + '</b></td>' + '<td><b>' + '04:27:47' + '</b></td>' + '<td><b>' + '05:02:42' + '</b></td>' + '<td><b>' + '06:28:15' + '</b></td>'
          html += '<td><b>' + '07:51:01' + '</b></td>' + '<td><b>' + '09:19:35' + '</b></td>' + '<td><b>' + '10:05:26' + '</b></td>' + '<td><b>' + '-' + '</b></td>' + '<td><b>' + '11:19:16' + '</b></td>'
          html += '<td><b>' + '13:20:55' + '</b></td>' + '<td><b>' + '-' + '</b></td>' + '<td><b>' + '19:32:17' + '</b></td>' + '<td><b>' + '20:03:13' + '</b></td>' + '<td><b>' + '23:44:09' + '</b></td>'
          html += '<td><b>' + '24:46:00' + '</b></td>' + '<td><b>' + '-' + '</b></td>' + '<td><b>' + '25:37:51' + '</b></td>'
          var next = i + 1;
          if ((next % perrow == 0) && next != markersTeams[i]) {
            html += "</tr><tr>";
          }
        }
        html += "</tr></table>";
        document.getElementById('anchorsTeams').innerHTML = html;
        $('#allTeams').append(anchorsTeams);
        return circlesTeams
      }
    }
  });
};


function realtimeMaleTeam(url_all, container) {
  return L.realtime(url_all, {
    interval: 7000,
    getFeatureId: function (f) {
      return f.properties.name;
    },
    removeMissing: true,
    //cache: true,
    container: container,
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
      if (feature.properties.class_ === 'Male' + ' ' + '(team)') {
        var customIcon2 = L.DivIcon.extend({
          options: {
            iconSize: [18, 18],
            popupAnchor: [0, 0],
            className: 'leaflet-div-icon2',
            iconAnchor: [9, 9],
            html: "<div>" + feature.properties.bib + "</div>"
          }
        });
        controlElevation.setRunner({
          id: feature.properties.bib,
          className: 'leaflet-div-icon2',
          dist: feature.properties.distance / 1000,
          text: feature.properties.bib,
          color: 'rgba(53,184,29,0.7)',
          onClick: function () {
            markersTeams[feature.properties.id].togglePopup();
          },
          onMouseOver: function () {
            $(markersTeams[feature.properties.id]._icon).addClass('selectedMarker')
          },
          onMouseOut: function () {
            $(markersTeams[feature.properties.id]._icon).removeClass('selectedMarker')
          },
          onMouseMove: function () {
            $(markersTeams[feature.properties.id]._icon).addClass('selectedMarker')
            // $(markersFemaleInd[feature.properties.id].openTooltip());
          },
          onSelect: function () {
            $(markersTeams[feature.properties.id]._icon).addClass('selectedMarker')
          },
          onUnselect: function () {
            $(markersTeams[feature.properties.id]._icon).removeClass('selectedMarker')
          }
        });

        rankingTeams[feature.properties.id] = feature.properties.ranking;
        nameTeams[feature.properties.id] = feature.properties.name;
        bibTeams[feature.properties.id] = feature.properties.bib;
        genderTeams[feature.properties.id] = feature.properties.gender;

        markersTeams[feature.properties.id] = L.marker(latlng, { icon: new customIcon2(), zIndexOffset: 300, riseOnHover: true });

        markersTeams[feature.properties.id].on('mouseover', function (e) {
          if (e.target.feature && e.target.feature.properties && e.target.feature.properties.bib) {
            controlElevation.selectRunner(e.target.feature.properties.bib)
          }
        })

        markersTeams[feature.properties.id].on('mouseout', function (e) {
          if (e.target.feature && e.target.feature.properties && e.target.feature.properties.bib) {
            controlElevation.unselectRunner(e.target.feature.properties.bib)
          }
        })

        infoPanel[feature.properties.id] = feature.properties;
        infoPanelSidebar.push(infoPanel[feature.properties.id])

        var circlesTeams = markersTeams[feature.properties.id]

        var perrow = 1;
        var html = '';
        html = '<table id="headerTable" class="table table-striped table-responsive table-sortable"><thead class="thead-dark"><tr><th>Rank</th><th class="setWidth">Name</th><th>BIB</th><th>Gender</th>'
        html += '<th>START</th><th>CP1</th><th>CP2</th><th>CP3</th><th>CP4</th><th>CP5</th><th>CP6</th><th>CP7</th><th>CP8</th><th>CP9</th><th>CP10</th><th>CP11</th>'
        html += '<th>CP12</th><th>CP13</th><th>CP14</th><th>CP15</th><th>CP16</th><th>CP17</th><th>CP18</th><th>FINISH</th></tr></thead>';
        for (var i in markersTeams) {
          html += '<td><b>' + rankingTeams[i] + '</b></td>'
          html += '<td>' + '<a href="#" onmouseover="onTabRunnerMouseover(' + bibTeams[i] + ')" onmouseout="onTabRunnerMouseout(' + bibTeams[i] + ')" onclick=markersTeams["' + [i] + '"].openTooltip()><b>' + nameTeams[i] + '</b></a><br/>' + '</td>';
          html += '<td><b>' + bibTeams[i] + '</b></td>'
          html += '<td><b>' + genderTeams[i] + '</b></td>' + '<td><b>' + '00:00:00' + '</b></td>' + '<td><b>' + '00:41:01' + '</b></td>' + '<td><b>' + '01:47:16' + '</b></td>'
          html += '<td><b>' + '03:36:55' + '</b></td>' + '<td><b>' + '04:27:47' + '</b></td>' + '<td><b>' + '05:02:42' + '</b></td>' + '<td><b>' + '06:28:15' + '</b></td>'
          html += '<td><b>' + '07:51:01' + '</b></td>' + '<td><b>' + '09:19:35' + '</b></td>' + '<td><b>' + '10:05:26' + '</b></td>' + '<td><b>' + '-' + '</b></td>' + '<td><b>' + '11:19:16' + '</b></td>'
          html += '<td><b>' + '13:20:55' + '</b></td>' + '<td><b>' + '-' + '</b></td>' + '<td><b>' + '19:32:17' + '</b></td>' + '<td><b>' + '20:03:13' + '</b></td>' + '<td><b>' + '23:44:09' + '</b></td>'
          html += '<td><b>' + '24:46:00' + '</b></td>' + '<td><b>' + '-' + '</b></td>' + '<td><b>' + '25:37:51' + '</b></td>'
          var next = i + 1;
          if ((next % perrow == 0) && next != markersTeams[i]) {
            html += "</tr><tr>";
          }
        }
        html += "</tr></table>";
        document.getElementById('anchorsTeams').innerHTML = html;
        $('#allTeams').append(anchorsTeams);
        return circlesTeams
      }
    }
  });
};


function realtimeMixTeam(url_all, container) {
  return L.realtime(url_all, {
    interval: 7000,
    getFeatureId: function (f) {
      return f.properties.name;
    },
    removeMissing: true,
    container: container,
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
      if (feature.properties.class_ === 'Mix' + ' ' + '(team)') {
        var customIcon5 = L.DivIcon.extend({
          options: {
            iconSize: [18, 18],
            popupAnchor: [0, 0],
            className: 'leaflet-div-icon5',
            iconAnchor: [9, 9],
            html: "<div>" + feature.properties.bib + "</div>"
          }
        });
        controlElevation.setRunner({
          id: feature.properties.bib,
          className: 'leaflet-div-icon5',
          dist: feature.properties.distance / 1000,
          text: feature.properties.bib,
          color: 'rgba(155, 89, 182,0.7)',
          onClick: function () {
            markersTeams[feature.properties.id].togglePopup();
          },
          onMouseOver: function () {
            $(markersTeams[feature.properties.id]._icon).addClass('selectedMarker')
          },
          onMouseMove: function () {
            $(markersTeams[feature.properties.id]._icon).addClass('selectedMarker')
            // $(markersFemaleInd[feature.properties.id].openTooltip());
          },
          onMouseOut: function () {
            $(markersTeams[feature.properties.id]._icon).removeClass('selectedMarker')
          },
          onSelect: function () {
            $(markersTeams[feature.properties.id]._icon).addClass('selectedMarker')
          },
          onUnselect: function () {
            $(markersTeams[feature.properties.id]._icon).removeClass('selectedMarker')
          }
        });

        infoPanel[feature.properties.id] = feature.properties;
        infoPanelSidebar.push(infoPanel[feature.properties.id]);

        rankingTeams[feature.properties.id] = feature.properties.ranking;
        nameTeams[feature.properties.id] = feature.properties.name;
        bibTeams[feature.properties.id] = feature.properties.bib;
        genderTeams[feature.properties.id] = feature.properties.gender;

        markersTeams[feature.properties.id] = L.marker(latlng, { icon: new customIcon5(), zIndexOffset: 300, riseOnHover: true });

        markersTeams[feature.properties.id].on('mouseover', function (e) {
          if (e.target.feature && e.target.feature.properties && e.target.feature.properties.bib) {
            controlElevation.selectRunner(e.target.feature.properties.bib)
          }
        })

        markersTeams[feature.properties.id].on('mouseout', function (e) {
          if (e.target.feature && e.target.feature.properties && e.target.feature.properties.bib) {
            controlElevation.unselectRunner(e.target.feature.properties.bib)
          }
        })

        var circlesTeams = markersTeams[feature.properties.id]

        var perrow = 1;
        var html = '';
        html = '<table id="headerTable" class="table table-striped table-responsive table-sortable"><thead class="thead-dark"><tr><th>Rank</th><th class="setWidth">Name</th><th>BIB</th><th>Gender</th>'
        html += '<th>START</th><th>CP1</th><th>CP2</th><th>CP3</th><th>CP4</th><th>CP5</th><th>CP6</th><th>CP7</th><th>CP8</th><th>CP9</th><th>CP10</th><th>CP11</th>'
        html += '<th>CP12</th><th>CP13</th><th>CP14</th><th>CP15</th><th>CP16</th><th>CP17</th><th>CP18</th><th>FINISH</th></tr></thead>';
        for (var i in markersTeams) {
          html += '<td><b>' + rankingTeams[i] + '</b></td>'
          html += '<td>' + '<a href="#" onmouseover="onTabRunnerMouseover(' + bibTeams[i] + ')" onmouseout="onTabRunnerMouseout(' + bibTeams[i] + ')" onclick=markersTeams["' + [i] + '"].openTooltip()><b>' + nameTeams[i] + '</b></a><br/>' + '</td>';
          html += '<td><b>' + bibTeams[i] + '</b></td>'
          html += '<td><b>' + genderTeams[i] + '</b></td>' + '<td><b>' + '00:00:00' + '</b></td>' + '<td><b>' + '00:41:01' + '</b></td>' + '<td><b>' + '01:47:16' + '</b></td>'
          html += '<td><b>' + '03:36:55' + '</b></td>' + '<td><b>' + '04:27:47' + '</b></td>' + '<td><b>' + '05:02:42' + '</b></td>' + '<td><b>' + '06:28:15' + '</b></td>'
          html += '<td><b>' + '07:51:01' + '</b></td>' + '<td><b>' + '09:19:35' + '</b></td>' + '<td><b>' + '10:05:26' + '</b></td>' + '<td><b>' + '-' + '</b></td>' + '<td><b>' + '11:19:16' + '</b></td>'
          html += '<td><b>' + '13:20:55' + '</b></td>' + '<td><b>' + '-' + '</b></td>' + '<td><b>' + '19:32:17' + '</b></td>' + '<td><b>' + '20:03:13' + '</b></td>' + '<td><b>' + '23:44:09' + '</b></td>'
          html += '<td><b>' + '24:46:00' + '</b></td>' + '<td><b>' + '-' + '</b></td>' + '<td><b>' + '25:37:51' + '</b></td>'
          var next = i + 1;
          if ((next % perrow == 0) && next != markersTeams[i]) {
            html += "</tr><tr>";
          }
        }
        html += "</tr></table>";
        document.getElementById('anchorsTeams').innerHTML = html;
        $('#allTeams').append(anchorsTeams);
        return circlesTeams
      }
    }
  });
};

function renameClassesPopup(category) {
  if ((category === 'Male' + ' ' + '(individual)')) {
    category = 'Male'
  }
  if ((category === 'Female' + ' ' + '(individual)')) {
    category = 'Female'
  }
  if ((category === 'Mix' + ' ' + '(team)')) {
    category = 'Teams' + ' ' + '(X)'
  }
  if ((category === 'Female' + ' ' + '(team)')) {
    category = 'Teams' + ' ' + '(F)'
  }
  if ((category === 'Male' + ' ' + '(team)')) {
    category = 'Teams' + ' ' + '(M)'
  }
  return category
}


function onEachFeature(feature, layer) {
  if (feature.properties) {
    var distKm = feature.properties.distance / 1000;
    layer.bindTooltip(function () {
      return feature.properties.name
    }, { permanent: false, interactive: true });
    layer.bindPopup(function () {
      print(feature.properties.displayname)
      return '<p class="big" align="left">' +
        '<b>' + '<font size = 2, font color = Black>' + feature.properties.displayname + '</font>' + '</b>' + '</p>' +
        '<p class="small" align="left">' + '<b>' + '<font size = 2, font color = Black>' + "Rank: " + '</font>' + '</b>' + '<font size = 2, font color = Black>' + feature.properties.ranking + '<br>' +
        '<b>' + '<font size = 2, font color = Black>' + "Elev: " + '</font>' + '</b>' + '<font size = 2, font color = Black>' + feature.properties.alt + "m" + '<br>' +
        '<b>' + '<font size = 2, font color = Black>' + "Dist: " + '</font>' + '</b>' + '<font size = 2, font color = Black>' + distKm + 'km' + '<br>' +
        '<b>' + '<font size = 2, font color = Black>' + "Pace: " + '</font>' + '</b>' + '<font size = 2, font color = Black>' + '?' + '<br>' +
        '<b>' + '<font size = 2, font color = Black>' + "Categ: " + '</font>' + '</b>' + '<font size = 2, font color = Black>' + renameClassesPopup(feature.properties.class) + '<br>' +
        '</font>' + '</p>' + '<button type="button" class="sidebar-open-button btn btn-dark btn-sm" data = "'
        + feature.properties.id + '" ' + ' >Click for more</button>'
    }, {
      closeButton: true,
      closeOnClick: false,
      autoClose: false
    })
  }
};


// Creating subgroups based on type of the runners, individual (female, male), team (female, male, mixt)
var parent = L.featureGroup().addTo(map),
  subgroupFemInd = L.featureGroup.subGroup(parent);
subgroupFemTeam = L.featureGroup.subGroup(parent);
subgroupMaleInd = L.featureGroup.subGroup(parent);
subgroupMaleTeam = L.featureGroup.subGroup(parent);
subgroupMixTeam = L.featureGroup.subGroup(parent);



function launchRealtimeFemInd() {
  realtimeFemInd = realtimeFemaleInd(url_all, subgroupFemInd).addTo(map);
  //Update values in popup
  realtimeFemInd.on('update', function (e) {
    Object.keys(e.update).forEach(function (id) {
      var feature = e.update[id];
      markersFemaleInd[feature.properties.id] = this.getLayer(id)
      rankingFemaleInd[feature.properties.id] = feature.properties.ranking;
      bibFemaleInd[feature.properties.id] = feature.properties.bib;
      genderFemaleInd[feature.properties.id] = feature.properties.gender;
      nameFemaleInd[feature.properties.id] = feature.properties.name;
      controlElevation.setRunner({
        id: feature.properties.bib,
        className: 'leaflet-div-icon4',
        dist: feature.properties.distance / 1000,
        text: feature.properties.bib,
        color: 'rgba(241, 196, 15,0.7)',
      });

      Object.keys(e.enter).forEach(function (id) {
        infoPanel[feature.properties.id] = feature.properties;
        infoPanelSidebar.push(infoPanel[feature.properties.id]);
        var feature = e.enter[id];
        markersFemaleInd[feature.properties.id] = this.getLayer(id)
        rankingFemaleInd[feature.properties.id] = feature.properties.ranking;
        bibFemaleInd[feature.properties.id] = feature.properties.bib;
        genderFemaleInd[feature.properties.id] = feature.properties.gender;
        nameFemaleInd[feature.properties.id] = feature.properties.name;
        var perrow = 1;
        var html = '';
        html = '<table id="headerTable" class="table table-striped table-responsive table-sortable"><thead class="thead-dark"><tr><th>Rank</th><th class="setWidth">Name</th><th>BIB</th><th>Gender</th>'
        html += '<th>START</th><th>CP1</th><th>CP2</th><th>CP3</th><th>CP4</th><th>CP5</th><th>CP6</th><th>CP7</th><th>CP8</th><th>CP9</th><th>CP10</th><th>CP11</th>'
        html += '<th>CP12</th><th>CP13</th><th>CP14</th><th>CP15</th><th>CP16</th><th>CP17</th><th>CP18</th><th>FINISH</th></tr></thead>';
        for (var i in markersFemaleInd) {
          console.log('sortable', sortable[i])
          html += `<tr style="display:${displayedLayers[i] ? 'table-row' : 'none'}"><td><b>` + rankingFemaleInd[i] + '</b></td>'
          html += '<td>' + '<a href="#" onmouseover="onTabRunnerMouseover(' + bibFemaleInd[i] + ')" onmouseout="onTabRunnerMouseout(' + bibFemaleInd[i] + ')" onclick=markersFemaleInd["' + [i] + '"].openTooltip()><b>' + nameFemaleInd[i] + '</b></a><br/>' + '</td>';
          html += '<td><b>' + bibFemaleInd[i] + '</b></td>'
          html += '<td><b>' + genderFemaleInd[i] + '</b></td>' + '<td><b>' + '00:00:00' + '</b></td>' + '<td><b>' + '00:41:01' + '</b></td>' + '<td><b>' + '01:47:16' + '</b></td>'
          html += '<td><b>' + '03:36:55' + '</b></td>' + '<td><b>' + '04:27:47' + '</b></td>' + '<td><b>' + '05:02:42' + '</b></td>' + '<td><b>' + '06:28:15' + '</b></td>'
          html += '<td><b>' + '07:51:01' + '</b></td>' + '<td><b>' + '09:19:35' + '</b></td>' + '<td><b>' + '10:05:26' + '</b></td>' + '<td><b>' + '-' + '</b></td>' + '<td><b>' + '11:19:16' + '</b></td>'
          html += '<td><b>' + '13:20:55' + '</b></td>' + '<td><b>' + '-' + '</b></td>' + '<td><b>' + '19:32:17' + '</b></td>' + '<td><b>' + '20:03:13' + '</b></td>' + '<td><b>' + '23:44:09' + '</b></td>'
          html += '<td><b>' + '24:46:00' + '</b></td>' + '<td><b>' + '-' + '</b></td>' + '<td><b>' + '25:37:51' + '</b></td></tr>'
        };
        html += "</table>";
        document.getElementById('anchorsFemaleInd').innerHTML = html;
        $(function () {
          // pass the id and the <td> place you want to sort by (td counts from 0)
          sortTable('headerTable', 0);
        });
      });

      var distKm = feature.properties.distance / 1000;
      this.getLayer(id).bindPopup('<p class="big" align="left">' +
        '<b>' + '<font size = 2, font color = Black>' + feature.properties.displayname + '</font>' + '</b>' + '</p>' +
        '<p class="small" align="left">' + '<b>' + '<font size = 2, font color = Black>' + "Rank: " + '</font>' + '</b>' + '<font size = 2, font color = Black>' + feature.properties.ranking + '<br>' +
        '<b>' + '<font size = 2, font color = Black>' + "Elev: " + '</font>' + '</b>' + '<font size = 2, font color = Black>' + feature.properties.alt + "m" + '<br>' +
        '<b>' + '<font size = 2, font color = Black>' + "Dist: " + '</font>' + '</b>' + '<font size = 2, font color = Black>' + distKm + 'km' + '<br>' +
        '<b>' + '<font size = 2, font color = Black>' + "Pace: " + '</font>' + '</b>' + '<font size = 2, font color = Black>' + '?' + '<br>' +
        '<b>' + '<font size = 2, font color = Black>' + "Categ: " + '</font>' + '</b>' + '<font size = 2, font color = Black>' + renameClassesPopup(feature.properties.class_) + '<br>' +
        '</font>' + '</p>' + '<button type="button" class="sidebar-open-button btn btn-dark btn-sm" data = "'
        + feature.properties.id + '" ' + ' >Click for more</button>')
    }.bind(this));
  });
};


function launchRealtimeMaleInd() {
  realtimeMlInd = realtimeMaleInd(url_all, subgroupMaleInd).addTo(map);
  realtimeMlInd.on('update', function (e) {
    Object.keys(e.update).forEach(function (id) {
      var feature = e.update[id];
      markersMaleInd[feature.properties.id] = this.getLayer(id)
      rankingMaleInd[feature.properties.id] = feature.properties.ranking;
      bibMaleInd[feature.properties.id] = feature.properties.bib;
      genderMaleInd[feature.properties.id] = feature.properties.gender;
      nameMaleInd[feature.properties.id] = feature.properties.name;

      controlElevation.setRunner({
        id: feature.properties.bib,
        className: 'leaflet-div-icon3',
        dist: feature.properties.distance / 1000,
        text: feature.properties.bib,
        color: 'rgba(46, 134, 193,0.7)',
      });


      Object.keys(e.enter).forEach(function (id) {
        infoPanel[feature.properties.id] = feature.properties;
        infoPanelSidebar.push(infoPanel[feature.properties.id]);
        var feature = e.enter[id];
        markersMaleInd[feature.properties.id] = this.getLayer(id)
        rankingMaleInd[feature.properties.id] = feature.properties.ranking;
        bibMaleInd[feature.properties.id] = feature.properties.bib;
        genderMaleInd[feature.properties.id] = feature.properties.gender;
        nameMaleInd[feature.properties.id] = feature.properties.name;
        var perrow = 1;
        var html = '';
        html = '<table id="headerTable" class="table table-striped table-responsive sortable"><thead class="thead-dark"><tr><th>Rank</th><th class="setWidth">Name</th><th>BIB</th><th>Gender</th>'
        html += '<th>START</th><th>CP1</th><th>CP2</th><th>CP3</th><th>CP4</th><th>CP5</th><th>CP6</th><th>CP7</th><th>CP8</th><th>CP9</th><th>CP10</th><th>CP11</th>'
        html += '<th>CP12</th><th>CP13</th><th>CP14</th><th>CP15</th><th>CP16</th><th>CP17</th><th>CP18</th><th>FINISH</th></tr></thead>';
        for (var i in markersMaleInd) {
          html += `<tr style="display:${displayedLayers[i] ? 'table-row' : 'none'}"><td><b>` + rankingMaleInd[i] + '</b></td>'
          html += '<td>' + '<a href="#" onmouseover="onTabRunnerMouseover(' + bibMaleInd[i] + ')" onmouseout="onTabRunnerMouseout(' + bibMaleInd[i] + ')" onclick=markersMaleInd["' + [i] + '"].openTooltip()><b>' + nameMaleInd[i] + '</b></a><br/>' + '</td>';
          html += '<td><b>' + bibMaleInd[i] + '</b></td>'
          html += '<td><b>' + genderMaleInd[i] + '</b></td>' + '<td><b>' + '00:00:00' + '</b></td>' + '<td><b>' + '00:41:01' + '</b></td>' + '<td><b>' + '01:47:16' + '</b></td>'
          html += '<td><b>' + '03:36:55' + '</b></td>' + '<td><b>' + '04:27:47' + '</b></td>' + '<td><b>' + '05:02:42' + '</b></td>' + '<td><b>' + '06:28:15' + '</b></td>'
          html += '<td><b>' + '07:51:01' + '</b></td>' + '<td><b>' + '09:19:35' + '</b></td>' + '<td><b>' + '10:05:26' + '</b></td>' + '<td><b>' + '-' + '</b></td>' + '<td><b>' + '11:19:16' + '</b></td>'
          html += '<td><b>' + '13:20:55' + '</b></td>' + '<td><b>' + '-' + '</b></td>' + '<td><b>' + '19:32:17' + '</b></td>' + '<td><b>' + '20:03:13' + '</b></td>' + '<td><b>' + '23:44:09' + '</b></td>'
          html += '<td><b>' + '24:46:00' + '</b></td>' + '<td><b>' + '-' + '</b></td>' + '<td><b>' + '25:37:51' + '</b></td></tr>'
        }
        html += "</table>";
        $(function () {
          // pass the id and the <td> place you want to sort by (td counts from 0)
          sortTable('headerTable', 0);
        });
        document.getElementById('anchorsMaleInd').innerHTML = html;
      });

      var distKm = feature.properties.distance / 1000;
      this.getLayer(id).bindPopup('<p class="big" align="left">' +
        '<b>' + '<font size = 2, font color = Black>' + feature.properties.displayname + '</font>' + '</b>' + '</p>' +
        '<p class="small" align="left">' + '<b>' + '<font size = 2, font color = Black>' + "Rank: " + '</font>' + '</b>' + '<font size = 2, font color = Black>' + feature.properties.ranking + '<br>' +
        '<b>' + '<font size = 2, font color = Black>' + "Elev: " + '</font>' + '</b>' + '<font size = 2, font color = Black>' + feature.properties.alt + "m" + '<br>' +
        '<b>' + '<font size = 2, font color = Black>' + "Dist: " + '</font>' + '</b>' + '<font size = 2, font color = Black>' + distKm + 'km' + '<br>' +
        '<b>' + '<font size = 2, font color = Black>' + "Pace: " + '</font>' + '</b>' + '<font size = 2, font color = Black>' + '?' + '<br>' +
        '<b>' + '<font size = 2, font color = Black>' + "Categ: " + '</font>' + '</b>' + '<font size = 2, font color = Black>' + renameClassesPopup(feature.properties.class_) + '<br>' +
        '</font>' + '</p>' + '<button type="button" class="sidebar-open-button btn btn-dark btn-sm" data = "'
        + feature.properties.id + '" ' + ' >Click for more</button>')
    }.bind(this));


    function launchRealtimeFemTeam() {
      realtimeFemTeam = realtimeFemaleTeam(url_all, subgroupFemTeam).addTo(map);
      realtimeFemTeam.on('update', function (e) {
        Object.keys(e.update).forEach(function (id) {
          var feature = e.update[id];
          markersTeams[feature.properties.id] = this.getLayer(id)
          rankingTeams[feature.properties.id] = feature.properties.ranking;
          bibTeams[feature.properties.id] = feature.properties.bib;
          genderTeams[feature.properties.id] = feature.properties.gender;
          nameTeams[feature.properties.id] = feature.properties.name;


          var distKm = feature.properties.distance / 1000;
          controlElevation.setRunner({
            id: feature.properties.bib,
            className: 'leaflet-div-icon2',
            dist: feature.properties.distance / 1000,
            text: feature.properties.bib,
            color: 'rgba(53,184,29,0.7)',
          });


          Object.keys(e.enter).forEach(function (id) {
            infoPanel[feature.properties.id] = feature.properties;
            infoPanelSidebar.push(infoPanel[feature.properties.id]);
            var feature = e.enter[id];
            markersTeams[feature.properties.id] = this.getLayer(id)
            rankingTeams[feature.properties.id] = feature.properties.ranking;
            bibTeams[feature.properties.id] = feature.properties.bib;
            genderTeams[feature.properties.id] = feature.properties.gender;
            nameTeams[feature.properties.id] = feature.properties.name;

            infoPanel[feature.properties.id] = feature.properties;
            infoPanelSidebar.push(infoPanel[feature.properties.id]);
            var perrow = 1;
            var html = '';
            html = '<table id="headerTable" class="table table-striped table-responsive table-sortable"><thead class="thead-dark"><tr><th>Rank</th><th class="setWidth">Name</th><th>BIB</th><th>Gender</th>'
            html += '<th>START</th><th>CP1</th><th>CP2</th><th>CP3</th><th>CP4</th><th>CP5</th><th>CP6</th><th>CP7</th><th>CP8</th><th>CP9</th><th>CP10</th><th>CP11</th>'
            html += '<th>CP12</th><th>CP13</th><th>CP14</th><th>CP15</th><th>CP16</th><th>CP17</th><th>CP18</th><th>FINISH</th></tr></thead>';
            for (var i in markersTeams) {
              html += `<tr style="display:${displayedLayers[i] ? 'table-row' : 'none'}"><td><b>` + rankingTeams[i] + '</b></td>'
              html += '<td>' + '<a href="#tableRunners" onmouseover="onTabRunnerMouseover(' + bibTeams[i] + ')" onmouseout="onTabRunnerMouseout(' + bibTeams[i] + ')" onclick=markersTeams["' + [i] + '"].openTooltip()><b>' + nameTeams[i] + '</b></a><br/>' + '</td>';
              html += '<td><b>' + bibTeams[i] + '</b></td>'
              html += '<td><b>' + genderTeams[i] + '</b></td>' + '<td><b>' + '00:00:00' + '</b></td>' + '<td><b>' + '00:41:01' + '</b></td>' + '<td><b>' + '01:47:16' + '</b></td>'
              html += '<td><b>' + '03:36:55' + '</b></td>' + '<td><b>' + '04:27:47' + '</b></td>' + '<td><b>' + '05:02:42' + '</b></td>' + '<td><b>' + '06:28:15' + '</b></td>'
              html += '<td><b>' + '07:51:01' + '</b></td>' + '<td><b>' + '09:19:35' + '</b></td>' + '<td><b>' + '10:05:26' + '</b></td>' + '<td><b>' + '-' + '</b></td>' + '<td><b>' + '11:19:16' + '</b></td>'
              html += '<td><b>' + '13:20:55' + '</b></td>' + '<td><b>' + '-' + '</b></td>' + '<td><b>' + '19:32:17' + '</b></td>' + '<td><b>' + '20:03:13' + '</b></td>' + '<td><b>' + '23:44:09' + '</b></td>'
              html += '<td><b>' + '24:46:00' + '</b></td>' + '<td><b>' + '-' + '</b></td>' + '<td><b>' + '25:37:51' + '</b></td></tr>'
            }
            html += "</table>";
            $(function () {
              // pass the id and the <td> place you want to sort by (td counts from 0)
              sortTable('headerTable', 0);
            });
          });



          this.getLayer(id).bindPopup('<p class="big" align="left">' +
            '<b>' + '<font size = 2, font color = Black>' + feature.properties.displayname + '</font>' + '</b>' + '</p>' +
            '<p class="small" align="left">' + '<b>' + '<font size = 2, font color = Black>' + "Rank: " + '</font>' + '</b>' + '<font size = 2, font color = Black>' + feature.properties.ranking + '<br>' +
            '<b>' + '<font size = 2, font color = Black>' + "Elev: " + '</font>' + '</b>' + '<font size = 2, font color = Black>' + feature.properties.alt + "m" + '<br>' +
            '<b>' + '<font size = 2, font color = Black>' + "Dist: " + '</font>' + '</b>' + '<font size = 2, font color = Black>' + distKm + 'km' + '<br>' +
            '<b>' + '<font size = 2, font color = Black>' + "Pace: " + '</font>' + '</b>' + '<font size = 2, font color = Black>' + '?' + '<br>' +
            '<b>' + '<font size = 2, font color = Black>' + "Categ: " + '</font>' + '</b>' + '<font size = 2, font color = Black>' + renameClassesPopup(feature.properties.class) + '<br>' +
            '</font>' + '</p>' + '<button type="button" class="sidebar-open-button btn btn-dark btn-sm" data = "'
            + feature.properties.id + '" ' + ' >Click for more</button>')
        }.bind(this));
      });
    };


    function launchRealtimeMaleTeam() {
      realtimeMlTeam = realtimeMaleTeam(url_all, subgroupMaleTeam).addTo(map);
      realtimeMlTeam.on('update', function (e) {
        Object.keys(e.update).forEach(function (id) {
          var feature = e.update[id];
          nameTeams[feature.properties.id] = feature.properties.name;
          markersTeams[feature.properties.id] = this.getLayer(id)
          rankingTeams[feature.properties.id] = feature.properties.ranking;
          bibTeams[feature.properties.id] = feature.properties.bib;
          genderTeams[feature.properties.id] = feature.properties.gender;


          var distKm = feature.properties.distance / 1000;
          controlElevation.setRunner({
            id: feature.properties.bib,
            className: 'leaflet-div-icon2',
            dist: feature.properties.distance / 1000,
            text: feature.properties.bib,
            color: 'rgba(53,184,29,0.7)',
          });


          Object.keys(e.enter).forEach(function (id) {
            infoPanel[feature.properties.id] = feature.properties;
            infoPanelSidebar.push(infoPanel[feature.properties.id]);
            var feature = e.enter[id];
            nameTeams[feature.properties.id] = feature.properties.name;
            markersTeams[feature.properties.id] = this.getLayer(id)
            rankingTeams[feature.properties.id] = feature.properties.ranking;
            bibTeams[feature.properties.id] = feature.properties.bib;
            genderTeams[feature.properties.id] = feature.properties.gender;
            var perrow = 1;
            html = '<table id="headerTable" class="table table-striped table-responsive table-sortable"><thead class="thead-dark"><tr><th>Rank</th><th class="setWidth">Name</th><th>BIB</th><th>Gender</th>'
            html += '<th>START</th><th>CP1</th><th>CP2</th><th>CP3</th><th>CP4</th><th>CP5</th><th>CP6</th><th>CP7</th><th>CP8</th><th>CP9</th><th>CP10</th><th>CP11</th>'
            html += '<th>CP12</th><th>CP13</th><th>CP14</th><th>CP15</th><th>CP16</th><th>CP17</th><th>CP18</th><th>FINISH</th></tr></thead>';

            for (var i in markersTeams) {
              html += `<tr style="display:${displayedLayers[i] ? 'table-row' : 'none'}"><td><b>` + rankingTeams[i] + '</b></td>'
              html += '<td>' + '<a href="#tableRunners" onmouseover="onTabRunnerMouseover(' + bibTeams[i] + ')" onmouseout="onTabRunnerMouseout(' + bibTeams[i] + ')" onclick=markersTeams["' + [i] + '"].openTooltip()><b>' + nameTeams[i] + '</b></a><br/>' + '</td>';
              html += '<td><b>' + bibTeams[i] + '</b></td>'
              html += '<td><b>' + genderTeams[i] + '</b></td>' + '<td><b>' + '00:00:00' + '</b></td>' + '<td><b>' + '00:41:01' + '</b></td>' + '<td><b>' + '01:47:16' + '</b></td>'
              html += '<td><b>' + '03:36:55' + '</b></td>' + '<td><b>' + '04:27:47' + '</b></td>' + '<td><b>' + '05:02:42' + '</b></td>' + '<td><b>' + '06:28:15' + '</b></td>'
              html += '<td><b>' + '07:51:01' + '</b></td>' + '<td><b>' + '09:19:35' + '</b></td>' + '<td><b>' + '10:05:26' + '</b></td>' + '<td><b>' + '-' + '</b></td>' + '<td><b>' + '11:19:16' + '</b></td>'
              html += '<td><b>' + '13:20:55' + '</b></td>' + '<td><b>' + '-' + '</b></td>' + '<td><b>' + '19:32:17' + '</b></td>' + '<td><b>' + '20:03:13' + '</b></td>' + '<td><b>' + '23:44:09' + '</b></td>'
              html += '<td><b>' + '24:46:00' + '</b></td>' + '<td><b>' + '-' + '</b></td>' + '<td><b>' + '25:37:51' + '</b></td></tr>'
            };
            html += "</tr></table>";
          })
          // $(function(){
          //   // pass the id and the <td> place you want to sort by (td counts from 0)
          //   sortTable('headerTable', 0);
          // });

          this.getLayer(id).bindPopup('<p class="big" align="left">' +
            '<b>' + '<font size = 2, font color = Black>' + feature.properties.displayname + '</font>' + '</b>' + '</p>' +
            '<p class="small" align="left">' + '<b>' + '<font size = 2, font color = Black>' + "Rank: " + '</font>' + '</b>' + '<font size = 2, font color = Black>' + feature.properties.ranking + '<br>' +
            '<b>' + '<font size = 2, font color = Black>' + "Elev: " + '</font>' + '</b>' + '<font size = 2, font color = Black>' + feature.properties.alt + "m" + '<br>' +
            '<b>' + '<font size = 2, font color = Black>' + "Dist: " + '</font>' + '</b>' + '<font size = 2, font color = Black>' + distKm + 'km' + '<br>' +
            '<b>' + '<font size = 2, font color = Black>' + "Pace: " + '</font>' + '</b>' + '<font size = 2, font color = Black>' + '?' + '<br>' +
            '<b>' + '<font size = 2, font color = Black>' + "Categ: " + '</font>' + '</b>' + '<font size = 2, font color = Black>' + renameClassesPopup(feature.properties.class_) + '<br>' +
            '</font>' + '</p>' + '<button type="button" class="sidebar-open-button btn btn-dark btn-sm" data = "'
            + feature.properties.id + '" ' + ' >Click for more</button>')
        }.bind(this));
      });
    };


    function launchRealtimeMixTeam() {
      realtimeMxTeam = realtimeMixTeam(url_all, subgroupMixTeam).addTo(map);
      realtimeMxTeam.on('update', function (e) {
        Object.keys(e.update).forEach(function (id) {
          var feature = e.update[id];
          nameTeams[feature.properties.id] = feature.properties.name;
          markersTeams[feature.properties.id] = this.getLayer(id)
          rankingTeams[feature.properties.id] = feature.properties.ranking;
          bibTeams[feature.properties.id] = feature.properties.bib;
          genderTeams[feature.properties.id] = feature.properties.gender;


          var distKm = feature.properties.distance / 1000;
          controlElevation.setRunner({
            id: feature.properties.bib,
            className: 'leaflet-div-icon2',
            dist: feature.properties.distance / 1000,
            text: feature.properties.bib,
            color: 'rgba(53,184,29,0.7)',
          });


          Object.keys(e.entry).forEach(function (id) {
            infoPanel[feature.properties.id] = feature.properties;
            infoPanelSidebar.push(infoPanel[feature.properties.id]);
            var feature = e.entry[id];
            nameTeams[feature.properties.id] = feature.properties.name;
            markersTeams[feature.properties.id] = this.getLayer(id)
            rankingTeams[feature.properties.id] = feature.properties.ranking;
            bibTeams[feature.properties.id] = feature.properties.bib;
            genderTeams[feature.properties.id] = feature.properties.gender;
            var perrow = 1;
            html = '<table id="headerTable" class="table table-striped table-responsive table-sortable><thead class="thead-dark"><tr><th>Rank</th><th class="setWidth">Name</th><th>BIB</th><th>Gender</th>'
            html += '<th>START</th><th>CP1</th><th>CP2</th><th>CP3</th><th>CP4</th><th>CP5</th><th>CP6</th><th>CP7</th><th>CP8</th><th>CP9</th><th>CP10</th><th>CP11</th>'
            html += '<th>CP12</th><th>CP13</th><th>CP14</th><th>CP15</th><th>CP16</th><th>CP17</th><th>CP18</th><th>FINISH</th></tr></thead>';

            for (var i in markersTeams) {
              html += `<tr style="display:${displayedLayers[i] ? 'table-row' : 'none'}"><td><b>` + rankingTeams[i] + '</b></td>'
              html += '<td>' + '<a href="#tableRunners" onmouseover="onTabRunnerMouseover(' + bibTeams[i] + ')" onmouseout="onTabRunnerMouseout(' + bibTeams[i] + ')" onclick=markersTeams["' + [i] + '"].openTooltip()><b>' + nameTeams[i] + '</b></a><br/>' + '</td>';
              html += '<td><b>' + bibTeams[i] + '</b></td>'
              html += '<td><b>' + genderTeams[i] + '</b></td>' + '<td><b>' + '00:00:00' + '</b></td>' + '<td><b>' + '00:41:01' + '</b></td>' + '<td><b>' + '01:47:16' + '</b></td>'
              html += '<td><b>' + '03:36:55' + '</b></td>' + '<td><b>' + '04:27:47' + '</b></td>' + '<td><b>' + '05:02:42' + '</b></td>' + '<td><b>' + '06:28:15' + '</b></td>'
              html += '<td><b>' + '07:51:01' + '</b></td>' + '<td><b>' + '09:19:35' + '</b></td>' + '<td><b>' + '10:05:26' + '</b></td>' + '<td><b>' + '-' + '</b></td>' + '<td><b>' + '11:19:16' + '</b></td>'
              html += '<td><b>' + '13:20:55' + '</b></td>' + '<td><b>' + '-' + '</b></td>' + '<td><b>' + '19:32:17' + '</b></td>' + '<td><b>' + '20:03:13' + '</b></td>' + '<td><b>' + '23:44:09' + '</b></td>'
              html += '<td><b>' + '24:46:00' + '</b></td>' + '<td><b>' + '-' + '</b></td>' + '<td><b>' + '25:37:51' + '</b></td></tr>'
            };
            html += "</tr></table>";
          })
          document.getElementById('anchorsTeams').innerHTML = html;
          if (document.getElementById("status") != null) {
            document.getElementById("anchorsTeams").innerHTML = html;
          }
          $('#allTeams').append(anchorsTeams);

          this.getLayer(id).bindPopup('<p class="big" align="left">' +
            '<b>' + '<font size = 2, font color = Black>' + feature.properties.displayname + '</font>' + '</b>' + '</p>' +
            '<p class="small" align="left">' + '<b>' + '<font size = 2, font color = Black>' + "Rank: " + '</font>' + '</b>' + '<font size = 2, font color = Black>' + feature.properties.ranking + '<br>' +
            '<b>' + '<font size = 2, font color = Black>' + "Elev: " + '</font>' + '</b>' + '<font size = 2, font color = Black>' + feature.properties.alt + "m" + '<br>' +
            '<b>' + '<font size = 2, font color = Black>' + "Dist: " + '</font>' + '</b>' + '<font size = 2, font color = Black>' + distKm + 'km' + '<br>' +
            '<b>' + '<font size = 2, font color = Black>' + "Pace: " + '</font>' + '</b>' + '<font size = 2, font color = Black>' + '?' + '<br>' +
            '<b>' + '<font size = 2, font color = Black>' + "Categ: " + '</font>' + '</b>' + '<font size = 2, font color = Black>' + renameClassesPopup(feature.properties.class_) + '<br>' +
            '</font>' + '</p>' + '<button type="button" class="sidebar-open-button btn btn-dark btn-sm" data = "'
            + feature.properties.id + '" ' + ' >Click for more</button>')
        }.bind(this));
      });
    };


    var customIconRescueWalk = L.DivIcon.extend({
      options: {
        iconSize: [22, 22],
        popupAnchor: [0, -9],
        className: 'leaflet-div-icon-rescue',
        iconAnchor: [11, 11],
        html: '<i class="fas fa-walking fa-2x"></i>'
      }
    });

    var customIconRescueCar = L.DivIcon.extend({
      options: {
        iconSize: [22, 22],
        popupAnchor: [0, -11],
        className: 'leaflet-div-icon-rescue',
        iconAnchor: [11, 11],
        html: '<i class="fas fa-car fa-2x"></i>'
      }
    });

    var realtimeRescueTeam = L.realtime({
      url: 'https://roip.ngrok.io/trx',
      crossOrigin: true,
      type: 'json'
    },
      {
        interval: 15 * 1000,
        getFeatureId: function (featureData) {
          return featureData.properties.nume;
        },
        pointToLayer: function (feature, latlng) {
          if (feature.properties.type === 'foot') {
            return L.marker(latlng, {
              icon: new customIconRescueWalk(),
              zIndexOffset: 202,
              riseOnHover: true,
              riseOffset: 250,
              title: 'Rescue Team'
            });
          } else if (feature.properties.type === 'car') {
            return L.marker(latlng, {
              icon: new customIconRescueCar(),
              zIndexOffset: 202,
              riseOnHover: true,
              title: 'Rescue Team'
            });
          }
        },
      });

    realtimeRescueTeam.on('update', function (e) {
      var coordPart = function (v, dirs) {
        return dirs.charAt(v >= 0 ? 0 : 1) +
          (Math.round(Math.abs(v) * 100) / 100).toString();
      },
        popupContent = function (fId) {
          var feature = e.features[fId],
            c = feature.geometry.coordinates;
          rid = feature.properties.rid;
          speed = feature.properties.speed;
          direction = feature.properties.direction;
          heading = feature.properties.heading;
          msgtext = feature.properties.smsgtxt;
          msgtime = feature.properties.msgtime;
          tm = feature.properties.updated;
          return '<p align="left"><strong>' + feature.properties.nume + '</strong> <br />' +
            '<br /><b>Radio ID: </b>' + rid +
            '<br /><b>Location: </b>' + coordPart(c[1], 'N') + ', ' + coordPart(c[0], 'E') +
            '<br /><b>Direction: </b>' + direction +
            '<br /><b>Heading: </b>' + heading +
            '<br /><b>Speed: </b>' + speed +
            '<br /><b>Last update: </b>' + tm +
            '<br /><b>Message text: </b>' + msgtext +
            '<br /><b>Message time: </b>' + msgtime + '</p>';
        },

        bindFeaturePopup = function (fId) {
          realtimeRescueTeam.getLayer(fId).bindPopup(popupContent(fId));
        },
        updateFeaturePopup = function (fId) {
          realtimeRescueTeam.getLayer(fId).getPopup().setContent(popupContent(fId));
        };

      //map.fitBounds(realtimeRescueTeam.getBounds(), {maxZoom: 14});
      Object.keys(e.enter).forEach(bindFeaturePopup);
      Object.keys(e.update).forEach(updateFeaturePopup);
    });


    var baseLayers = [
      {
        group: "Open Source",
        collapsed: true,
        layers: [
          {
            name: "OpenTopoMap",
            layer: fifth
          },
          {
            name: "Open Street Map",
            layer: first
          },
          {
            name: "OSM Thunderforest",
            layer: second
          }
        ]
      },
      {
        group: "Google Maps",
        collapsed: true,
        layers: [
          {
            name: "Google Hybrid",
            layer: third
          },
          {
            name: "Google Terrain",
            layer: forth
          }
        ]
      }
    ];

    var overLayers = [
      {
        group: "Individual",
        layers: [
          {
            active: true,
            name: "Women",
            icon: '<i class="fa  fa-circle" style="color:rgb(241, 196, 15); display: inline-block; text-align: left;"></i>',
            layer: subgroupFemInd
          },
          {
            active: true,
            name: "Men",
            icon: '<i class="fa fa-circle" style="color:rgb(46,134,193); display: inline-block;"></i>',
            layer: subgroupMaleInd
          }
        ]
      },
      {
        group: "Teams",
        layers: [
          {
            active: true,
            name: "Women",
            icon: '<i class="fa fa-circle" style="color:rgb(255,25,91);"></i>',
            layer: subgroupFemTeam
          },
          {
            active: true,
            name: "Men",
            icon: '<i class="fa fa-circle" style="color:rgb(53,184,29);"></i>',
            layer: subgroupMaleTeam
          },
          {
            active: true,
            name: "Mix",
            icon: '<i class="fas fa-circle" style="color:rgb(155,89,182);"></i>',
            layer: subgroupMixTeam
          }
        ]
      }, {
        group: "Rescue Team",
        collapsed: true,
        layers: [
          {

            active: false,
            name: "Rescue Team",
            icon: '<span class="fa-stack"><i class="fas fa-circle fa-stack style="color:rgb(243, 42, 7);"></i><i class="fas fa-walking fa-stack-1x fa-inverse"></i></span>',
            layer: realtimeRescueTeam
          }
        ]
      }
    ];


    // Table data sorting starts....
    function sortTable(table_id, sortColumn) {
      var tableData = document.getElementById(table_id).getElementsByTagName('tbody').item(0);
      var rowData = tableData.getElementsByTagName('tr');
      for (var i = 0; i < rowData.length - 1; i++) {
        for (var j = 0; j < rowData.length - (i + 1); j++) {
          if (Number(rowData.item(j).getElementsByTagName('td').item(sortColumn).innerHTML.replace(/[^0-9\.]+/g, "")) > Number(rowData.item(j + 1).getElementsByTagName('td').item(sortColumn).innerHTML.replace(/[^0-9\.]+/g, ""))) {
            tableData.insertBefore(rowData.item(j + 1), rowData.item(j));
          }
        }
      }
    }


    //adding kml layer dynamically using leaflet filelayer plugin
    var kmlLayers = {

      title: 'KML Layers',
      layers: [
        {
          group: "Group 1",
          collapsed: true,
          layers: []
        }
        // ,{
        //   group: "Group 2",
        //   collapsed: true,
        //   layers: []
        // }
      ]
    };

    var panelLayers = new L.Control.PanelLayers(baseLayers, overLayers, {
      compact: true,
      collapsed: true,
      collapsibleGroups: true
    });
    map.addControl(panelLayers);


    map.once('data_loaded', function (e) {
      vf.eachLayer(function (layer) {
        controlElevation.addCheckpoint(layer)
      });
      controlPointsChart.eachLayer(function (layer) {
        controlElevation.addCheckpoint(layer)
      });
      launchRealtimeFemInd();
      launchRealtimeMaleInd();
      launchRealtimeMixTeam();
      launchRealtimeMaleTeam();
      launchRealtimeFemTeam();
    });


    let displayedLayers = {};

    map.on('layeradd', function (e) {
      if (e.layer.feature && e.layer.feature.properties && e.layer.feature.properties.bib) {
        controlElevation.showRunner(e.layer.feature.properties.bib);
        displayedLayers[e.layer.feature.properties.id] = true;
        addRow(e.layer.feature.properties.bib)
      }
    })
    map.on('layerremove', function (e) {
      if (e.layer.feature) {
        controlElevation.hideRunner(e.layer.feature.properties.bib);
        displayedLayers[e.layer.feature.properties.id] = false;
        removeRow(e.layer.feature.properties.bib)
      }
    });


    function removeRow(markersTeamsID) {
      if (markersTeamsID) {
        $("tr:has(td:contains(" + markersTeamsID + "))").each(function () {
          //var toggleVisibility = (($(this).closest("tr").find("td:eq(2)")).is(":visible"))
          if ((($(this).closest("tr").find("td:eq(2)").text() == markersTeamsID))) {
            $(this).attr("style", "display:none");
          }
        })
      };
    }


    function addRow(markersTeamsID) {
      if (markersTeamsID) {
        $("tr:has(td:contains(" + markersTeamsID + "))").each(function () {
          if (($(this).closest("tr").find("td:eq(2)").text() == markersTeamsID)) {
            $(this).show();
          }
        })
      };
    }

    var controlElevation = L.control.dynamicElevation(elevationControl.options);

    controlElevation.options.detached = true,
      controlElevation.options.useHeightIndicator = true,
      controlElevation.options.useMapIndicator = true,
      controlElevation.options.collapsed = true, //collapsed mode, show chart on click or mouseover
      controlElevation.options.elevationDiv = "#elevation-div",
      controlElevation.options.margins.bottom = 30,
      controlElevation.options.margins.top = 23,
      controlElevation.options.yTicks = 4,
      controlElevation.options.xTicks = 10,
      controlElevation.options.legend = false,
      controlElevation.loadChart(map);
    controlElevation.loadData(opts.elevationControl.url);

    function onTabRunnerMouseover(bib) {
      controlElevation.selectRunner(bib);
    }

    function onTabRunnerMouseout(bib) {
      controlElevation.unselectRunner(bib);
    }


    //set contur of slope along track
    var conturLineSlope = {
      "color": 'black',
      "weight": 5
    };
    var contur = L.geoJson(panta_ultra, {
      style: conturLineSlope
    }).addTo(map);

    // get color depending on slope values din mtb1_panta
    function getColor(d) {
      return d >= 60 ? '#800026' :
        d > 50 ? '#bd0026' :
          d > 40 ? '#e31a1c' :
            d > 30 ? '#fc4e2a' :
              d > 15 ? '#fd8d3c' :
                d > 5 ? '#feb24c' :
                  d > 0 ? '#fed976' :
                    d > -5 ? '#f7fbff' :
                      d > -15 ? '#f7fbff' :
                        d > -30 ? '#9ecae1' :
                          d > -40 ? '#6baed6' :
                            d > -50 ? '#4292c6' :
                              d > -70 ? '#2171b5' :
                                '#084594';
    }


    function style(feature) {
      return {
        weight: 3.5,
        opacity: 1,
        //color: 'white',
        //dashArray: '3',
        //fillOpacity: 0.7,
        color: getColor(feature.properties.PANTA)
      };
    }

    geojson = L.geoJson(panta_ultra, {
      style: style,
    }).addTo(map);


    var legend = L.control({
      position: 'bottomleft'
    });

    legend.onAdd = function (map) {
      var div = L.DomUtil.create('div', 'legend'),
        grades = [50, 40, 30, 15, 5, -5, -15, -30, -40, -50, -70],
        labels = ['<strong> Legend  <br> Slope (%)</strong>'],
        from, to;

      for (var i = 0; i < grades.length; i++) {
        from = grades[i];
        to = grades[i - 1];

        labels.push(
          '<i style="background:' + getColor(from - 1) + '"></i> ' +
          from + (to ? '&ndash;' + to : '+'));
      }
      div.innerHTML = labels.join('<br>');
      return div;
    };

    //toggle legend with button
    var toggle = L.easyButton({
      states: [{
        stateName: 'add-legend',
        icon: 'fas fa-info-circle fa-2x',
        title: 'Add slope legend',
        onClick: function (control) {
          legend.addTo(map);
          control.state('remove-legend');
        }
      }, {
        icon: 'fas fa-eraser fa-2x',
        stateName: 'remove-legend',
        onClick: function (control) {
          legend.remove(map);
          control.state('add-legend');
        },
        title: 'Remove legend'
      }]
    });
    toggle.addTo(map);

    //Add style for kml file  added with leaflet filelayer plugin
    var styleGPX = {
      color: 'rgba(3, 181, 218,0.9)',
      opacity: 1,
      fillOpacity: 0.6,
      weight: 3,
      clickable: true
    };


    L.Control.FileLayerLoad.TITLE = 'Load local GPX'
    L.Control.FileLayerLoad.LABEL = '<i class="fas fa-folder-open"></i>';
    var controlKML = L.Control.fileLayerLoad({
      fitBounds: true,
      position: 'topleft',
      fileSizeLimit: 1024,
      formats: [
        '.gpx'
      ],
      layerOptions: {
        style: styleGPX,
        pointToLayer: function (data, latlng) {
          return L.circleMarker(
            latlng,
            { style: styleGPX }
          );
        },
        onEachFeature: function (feature, layer) {
          if (feature.properties.name) {
            layer.bindTooltip('Name: ' + feature.properties.name + '<br>',
              {
                interactive: true
              });
          }
        }
      },
    }).addTo(map);

    var overlayKML = L.control.panelLayers(kmlLayers.layers, null, {
      title: kmlLayers.title,
      position: 'bottomleft',
      compact: true,//panle will take up only space needed instead of page height
      collapsibleGroups: true,//alows group to be colapsed by user
      collapsed: true //panel will colaps on mouse off
    });



    controlKML.loader.on('data:loaded', function (e) {
      // event.layer gives you access to the layers you just uploaded!
      kml_layers = e.layer
      panelLayers.addOverlay({ layer: kml_layers, icon: '<i class="fa fa-square fa-xs" style="color:rgb(3, 181, 218);"></i>' }, e.filename, 'Local GPX');
    });


    // Add control search
    var controlSearch = new L.Control.Search({
      position: 'topleft',
      layer: parent,
      propertyName: 'name',
      initial: false,
      textPlaceholder: 'Search name',
      // zoom: 14,
      casesensitive: false,
      circleLocation: true,
      autoType: true,
      autoCollapse: true,
      autoCollapseTime: 1400,
      hideMarkerOnCollapse: true,
      moveToLocation: function (latlng, name, map) {
        var zoom;
        if (latlng.layer.feature.geometry.type == 'Feature') {
          zoom = map.getBoundsZoom(latlng.layer.getBounds());
          lastStateLayerFound = latlng.layer;
        }
        else {
          lastStateLayerFound = null;
          zoom = 16;
        }
        map.setView(latlng, zoom);
      }
      // marker: false
    });
    controlSearch.on('search:locationfound', function (e) {
      // if (e.layer.feature.geometry.type == 'Feature')
      //   e.layer.setStyle({fillColor: '#3f0', color: '#0f0'});
      if (e.layer._popup)
        e.layer.openPopup();
    })
    // .on('search:collapsed', function(e) {
    //     if (lastStateLayerFound) {
    //       us_statesLayer.resetStyle(lastStateLayerFound);
    //     }
    // });

    map.addControl(controlSearch);

    // Get location in realtime
    var lc = L.control.locate({
      position: 'topleft',
      strings: {
        title: "Get my location!"
      }
    }).addTo(map);
  })
}