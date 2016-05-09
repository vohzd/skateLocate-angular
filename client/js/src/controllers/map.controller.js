"use strict";

function MapCtrl(){

	this.message = "hi there!"
	var mymap = L.map('leaflet').setView([51.505, -0.09], 13);

	L.tileLayer('https://api.mapbox.com/styles/v1/intheon/cinz0kw8i0006bgnmykeq58x6/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaW50aGVvbiIsImEiOiJjaW5lZ3RkaDUwMDc2d2FseHhldHl0Y3dyIn0.L1RWCbggwqkNegUc1ZIwJw', {
	    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	    maxZoom: 18,
	    id: 'mapbox://styles/intheon/cinz0kw8i0006bgnmykeq58x6',
	    accessToken: 'pk.eyJ1IjoiaW50aGVvbiIsImEiOiJjaW5lZ3RkaDUwMDc2d2FseHhldHl0Y3dyIn0.L1RWCbggwqkNegUc1ZIwJw'
	}).addTo(mymap);



}

export default MapCtrl;