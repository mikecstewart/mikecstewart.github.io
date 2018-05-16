
let myMap = L.map("map", {
    fullscreencontrol: true
});    
let bikeGroup = L.featureGroup().addTo(myMap)

let myLayers = {
    
    osm : L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {    //http://leafletjs.com/reference-1.3.0.html#tilelayer-l-tilelayer
        subdomains : ["a","b","c"],
        attribution : "Datenquelle: <a href='https://www.openstreetmap.org'> openstreetmap.at </a>"
    }
),
    geolandbasemap : L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
        subdomains : ["maps","maps1","maps2","maps3","maps4"],  //http://leafletjs.com/reference-1.3.0.html#tilelayer-subdomains
        attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"    //http://leafletjs.com/reference-1.3.0.html#layer-attribution
    }
),
    summer : L.tileLayer("http://wmts.kartetirol.at/wmts/gdi_base_summer/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80", {
    attribution : "Datenquelle: <a href='https://www.kartetirol.at'>kartetirol.at</a>",
    }
), 
    winter : L.tileLayer("http://wmts.kartetirol.at/wmts/gdi_base_winter/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80", {
    attribution : "Datenquelle: <a href='https://www.kartetirol.at'>kartetirol.at</a>",
    }
), 
    ortho : L.tileLayer("http://wmts.kartetirol.at/wmts/gdi_ortho/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80", {
    attribution : "Datenquelle: <a href='https://www.kartetirol.at'>kartetirol.at</a>",
    }
),
};

myMap.addLayer(myLayers.geolandbasemap);    //http://leafletjs.com/reference-1.3.0.html#layer-onadd

let myMapControl = L.control.layers({   //http://leafletjs.com/reference-1.3.0.html#control-layers-l-control-layers
    "Openstreetmap" : myLayers.osm,
    "Geolandbasemap" : myLayers.geolandbasemap,
    "Sommerkarte": myLayers.summer,
    "Winterkarte": myLayers.winter,
    "Orthokarte": myLayers.ortho,

},{
    "Bmapoverlay" : myLayers.bmapoverlay,
    "Route": bikeGroup,
}, {
    collapsed : false       //http://leafletjs.com/reference-1.3.0.html#control-layers-collapsed
});

myMap.addControl(myMapControl);     //http://leafletjs.com/reference-1.3.0.html#map-addcontrol

myMap.setView([47.267,11.383], 11); //http://leafletjs.com/reference-1.3.0.html#map-setview

L.control.scale({                    //http://leafletjs.com/reference-1.3.0.html#control-scale-l-control-scale
    position: 'bottomleft',         //http://leafletjs.com/reference-1.3.0.html#control-scale-position
    maxWidth: 200,                  //http://leafletjs.com/reference-1.3.0.html#control-scale-maxwidth
    metric: true,                   //http://leafletjs.com/reference-1.3.0.html#control-scale-metric
    imperial: false,                //http://leafletjs.com/reference-1.3.0.html#control-scale-imperial
    }).addTo(myMap);

const wenns = [47.167234, 10.729962];
const landeck = [47.136962, 10.566817]
const iconStart = L.icon({
    iconUrl: "images/start.png"
});
const iconFinish= L.icon({
    iconUrl: "images/finish.png"
});

const markerOptions1 = {
    title: "Wenns - Landeck",
    opactiy: 1,
    dragable: false,
    icon: iconStart,
};
const markerOptions2 = {
    title: "Wenns - Landeck",
    opactiy: 1,
    dragable: false,
    icon: iconFinish,
};

L.marker(wenns,markerOptions1).addTo(bikeGroup).bindPopup("<p><a href='https://de.wikipedia.org/wiki/Wenns'>Wenns im Pitztal</a></p>")
L.marker(landeck,markerOptions2).addTo(bikeGroup).bindPopup("<p><a href='https://de.wikipedia.org/wiki/Landeck_(Tirol)'>Landeck</a></p>");

  myMap.fitBounds(bikeGroup.getBounds());
  


const url = "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&srsName=EPSG:4326&outputFormat=json&typeName=ogdwien:SPAZIERPUNKTOGD,ogdwien:SPAZIERLINIEOGD"


 myMap.addLayer(bikeGroup);

 /*let geojson = L.geoJSON(toGeoJSON).addTo(bikeGroup);
geojson.bindPopup(function(layer) {
    //console.log("Layer for Popup:", layer.feature.geometry); 
    const props = layer.feature.geometry;
    const line = `<p>${props.coordinates}</p>`;
    return line // popupText;
});*/

let gpxTrack = new L.GPX("data/etappe28.gpx", {
    async : true,
}).addTo(bikeGroup);
gpxTrack.on("loaded", function(evt) {
    myMap.fitBounds(evt.target.getBounds());
});

// eine neue Leaflet Karte definieren

// Grundkartenlayer mit OSM, basemap.at, Elektronische Karte Tirol (Sommer, Winter, Orthophoto jeweils mit Beschriftung) über L.featureGroup([]) definieren
// WMTS URLs siehe https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol

// GeoJSON Track als Linie in der Karte einzeichnen und auf Ausschnitt zoomen
// Einbauen nicht über async, sondern über ein L.geoJSON() mit einem Javascript Objekt (wie beim ersten Stadtspaziergang Wien Beispiel)

// Baselayer control für OSM, basemap.at, Elektronische Karte Tirol hinzufügen

// Overlay controls zum unabhängigem Ein-/Ausschalten der Route und Marker hinzufügen
