let myMap = L.map("map", {
    fullscreenControl: true
});
let bikeGroup = L.featureGroup().addTo(myMap);
let bikeLine = L.featureGroup().addTo(myMap);
let myLayers = {
    osm : L.tileLayer (
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            subdomains : ["a","b","c"], 
            attribution : "Datenquelle: <a href='https://www.openstreetmap.org'> openstreetmap.at </a>"
        }
    ),
    geolandbasemap : L.tileLayer (
        "https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
            subdomains : ["maps","maps1","maps2","maps3","maps4"],
            attribution : "Datenquelle: <a href='https://www.basemap.at'> basemap.at </a>"
        }
    ),
    bmapoverlay :  L.tileLayer (
        "https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
            subdomains : ["maps","maps1","maps2","maps3","maps4"],
            attribution : "Datenquelle: <a href='https://www.basemap.at'> basemap.at </a>"
        }
    ),
    Summer : L.tileLayer("http://wmts.kartetirol.at/wmts/gdi_base_summer/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80", {
		attribution : "Datenquelle: <a href='https://www.kartetirol.at'>kartetirol.at</a>",
	}
), 
	Winter : L.tileLayer("http://wmts.kartetirol.at/wmts/gdi_base_winter/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80", {
		attribution : "Datenquelle: <a href='https://www.kartetirol.at'>kartetirol.at</a>",
	}
), 
	Ortho : L.tileLayer("http://wmts.kartetirol.at/wmts/gdi_ortho/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80", {
		attribution : "Datenquelle: <a href='https://www.kartetirol.at'>kartetirol.at</a>",
	}
), 
};




myMap.addLayer(myLayers.geolandbasemap);
let myMapControl = L.control.layers({ 
    "Openstreetmap" : myLayers.osm,
    "Geolandbasemap" : myLayers.geolandbasemap,
    "Sommerkarte": myLayers.Summer,
    "Winterkarte": myLayers.Winter,
    "Orthokarte": myLayers.Ortho,

}, {
    "Bmapoverlay" : myLayers.bmapoverlay,
    "Stationen" : bikeGroup,
    "Route": bikeLine,
}, {
    collapsed : false
});

myMap.addControl(myMapControl);

L.control.scale({
    position: "bottomleft",
    maxWidth: 200,
    metric: true,
    imperial: false,
    }
).addTo(myMap);

const wenns = [47.167234,10.729962];
const landeck = [47.136962,10.566817]

const iconStart = L.icon({
    iconUrl: "data/startfinish.png",
    iconAnchor : [16,37],
    popupAnchor : [0,-37],
});
const iconFinish = L.icon({
    iconUrl: "data/finish.png",
    iconAnchor : [16,37],
    popupAnchor : [0,-37],
});

const markerOptions1 = {
    title: "Wenns - Landeck", // feste Optionen für alle
    opacity: 1,
    draggable: false,
    icon: iconStart,
};
const markerOptions2 = {
    title: "Wenns - Landeck", // feste Optionen für alle
    opacity: 1,
    draggable: false,
    icon: iconFinish,
};
L.marker(wenns, markerOptions1).addTo(bikeGroup).bindPopup("<p><a href='https://de.wikipedia.org/wiki/Wenns'><strong>Wenns</strong></a></p><img style = 'width:200px' src='https://www.pitztal.com/sites/default/files/styles/adaptive/public/img_8040.jpg?itok=A0_-oVx5' alt='Wenns' />");
L.marker(landeck, markerOptions2).addTo(bikeGroup).bindPopup("<p><a href='https://de.wikipedia.org/wiki/Landeck_(Tirol)'><strong>Landeck</strong></a></p><img style = 'width:200px' src='https://thumbnails.trvl-media.com/q2l-vkZO3LO7QjrLyXmQasp3Evk=/768x432/images.trvl-media.com/media/content/shared/images/travelguides/destination/6046522/Seefeld-In-Tirol-48290.jpg' alt='Landeck' />");



//Hilfe fuer leaflet.gpx: https://github.com/mpetazzoni/leaflet-gpx
let gpxTrack = new L.GPX("data/etappe28.gpx", {
    async: true,
}).addTo(bikeLine);
gpxTrack.on("loaded", function(evt) {
    //console.log(evt.target.get_distance().toFixed(0));
    //console.log(evt.target.get_elevation_min());
    let laenge = evt.target.get_distance().toFixed(0);
    document.getElementById("laenge").innerHTML = laenge;

    myMap.fitBounds(evt.target.getBounds());
});



//myMap.fitBounds(bikeGroup.getBounds());

/*let geojson = L.geoJSON(toGeoJSON).addTo(bikeLine);
geojson.bindPopup(function(layer) {
    //console.log("Layer for Popup:", layer.feature.geometry); 
    const props = layer.feature.geometry;
    const line = `<p>${props.coordinates}</p>`;
    return line // popupText;
});*/
// eine neue Leaflet Karte definieren

// Grundkartenlayer mit OSM, basemap.at, Elektronische Karte Tirol (Sommer, Winter, Orthophoto jeweils mit Beschriftung) über L.featureGroup([]) definieren
// WMTS URLs siehe https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol

// Maßstab metrisch ohne inch

// Start- und Endpunkte der Route als Marker mit Popup, Namen, Wikipedia Link und passenden Icons für Start/Ziel von https://mapicons.mapsmarker.com/

// GeoJSON Track als Linie in der Karte einzeichnen und auf Ausschnitt zoomen
// Einbauen nicht über async, sondern über ein L.geoJSON() mit einem Javascript Objekt (wie beim ersten Stadtspaziergang Wien Beispiel)

// Baselayer control für OSM, basemap.at, Elektronische Karte Tirol hinzufügen

// Overlay controls zum unabhängigem Ein-/Ausschalten der Route und Marker hinzufügen*/
