
let myMap = L.map("mapdiv");    //http://leafletjs.com/reference-1.3.0.html#map-l-map
const awsGroup = L.featureGroup();
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

    bmapoverlay : L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
        subdomains : ["maps","maps1","maps2","maps3","maps4"],
        attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
    }
),

    bmapgrau : L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
        subdomains : ["maps","maps1","maps2","maps3","maps4"],
        attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
    }
),

    bmaphidpi : L.tileLayer("https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains : ["maps","maps1","maps2","maps3","maps4"],
        attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
    }
),

    bmaporthofoto30cm : L.tileLayer("https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains : ["maps","maps1","maps2","maps3","maps4"],
        attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
    }
),
};
myMap.addLayer(myLayers.geolandbasemap);    //http://leafletjs.com/reference-1.3.0.html#layer-onadd

let myMapControl = L.control.layers({   //http://leafletjs.com/reference-1.3.0.html#control-layers-l-control-layers
    "Openstreetmap" : myLayers.osm,
    "Geolandbasemap" : myLayers.geolandbasemap,
    "Overlay" : myLayers.bmapoverlay,
    "Grau" : myLayers.bmapgrau,
    "Highdpi" : myLayers.bmaphidpi,
    "Orthofoto" : myLayers.bmaporthofoto30cm
},{
    "Overlay" : myLayers.bmapoverlay,
    "Wetterstationen": awsGroup,
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

    //console.log("Stationen: ", stationen);

    myMap.addLayer(awsGroup);
let geojson = L.geoJSON(stationen).addTo(awsGroup);
geojson.bindPopup(function(layer) {         //zu jedem Marker wird ein Popup hinzugefügt
    const props = layer.feature.properties;     //props als verkürzte Schreibweise für layer.feature.properties
    const popupText = `<h1>${props.name}</h1>
    <p>Temperatur_ ${props.LT} °C</p>`;
    return popupText;
});         //ich muss pinkeln aber kann nicht gehen weil ich sonst alles verpasse
myMap.fitBounds(awsGroup.getBounds());
