
let myMap = L.map("mapdiv");    //http://leafletjs.com/reference-1.3.0.html#map-l-map
const attractions = L.featureGroup();
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
    "Grau" : myLayers.bmapgrau,
    "Highdpi" : myLayers.bmaphidpi,
    "Orthofoto" : myLayers.bmaporthofoto30cm
},{
    "Overlay" : myLayers.bmapoverlay,
    "Sehenswürdigkeiten": attractions,
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
  
async function addGeojson(url) {
    console.log("URL wird geladen: ", url);
    const response = await fetch(url); //Adresse von anderem Server herunterladen
    console.log("Response: ", response);
   const wienbikedata = await response.json();
   console.log("GeoJson: ", wienbikedata);
   const geojson = L.geoJSON(wienbikedata, {
       style: function(feature) {
           return { color: "#ff0000"};
  
       }, 
       pointToLayer: function(geoJsonPoint, latlng) {
           return L.marker(latlng, {
               icon: L.icon({
                   iconUrl: "sight.png"
               })
           });
       }
   });
   attractions.addLayer(geojson);
   myMap.fitBounds(attractions.getBounds());

}    

const url = "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:SEHENSWUERDIGOGD&srsName=EPSG:4326&outputFormat=json"

addGeojson(url);

 myMap.addLayer(attractions);
/* let geojson = L.geoJSON(orte).addTo(spaziergang);
     geojson.bindPopup(function(layer) {         //zu jedem Marker wird ein Popup hinzugefügt
    const props = layer.feature.properties;     //props als verkürzte Schreibweise für layer.feature.properties
    const popupText = `<h1>${props.NAME}</h1>
    <p>${props.BEMERKUNG}</p>`;
    return popupText; 
});        */ 

