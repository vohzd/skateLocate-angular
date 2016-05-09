/* this is the main reference point for the app, all stuff is effectively pulled into here, and then bundled with jspm */

// library imports
import angular from "angular";
import $ from "jquery";
import material from "materialize-css";
import leaflet from "leaflet";
import leafletMarkerCluster from "leaflet.markercluster";
import leafletEasyButton from "leaflet-easybutton";

// services
import helpersSrv from "./services/helpers.service.js";

// directives
import headerGraphic from "./directives/header.directive.js";
import highestRankedItems from "./directives/highest-ranked-items.directive.js";
import existingSkateparkInfo from "./directives/existing-skatepark-info.directive.js";
import recentlyAddedItems from "./directives/recently-added-items.directive.js";
import filterItemsByTag from "./directives/filter-items-by-tag.directive.js";
import infoTriangle from "./directives/info-triangle.directive.js";
import searchBar from "./directives/search.directive.js";

// controllers
import MainCtrl from "./controllers/main.controller.js";
import MapCtrl from "./controllers/map.controller.js";


angular.module("ngSkateApp", [])
	.controller("MainCtrl", MainCtrl)
	.controller("MapCtrl", MapCtrl)
	.directive("headerGraphic", headerGraphic)
	.directive("highestRankedItems", highestRankedItems)
	.directive("recentlyAddedItems", recentlyAddedItems)
	.directive("infoTriangle", infoTriangle)
	.directive("filterItemsByTag", filterItemsByTag)
	.directive("existingSkateparkInfo", existingSkateparkInfo)
	.directive("searchBar", searchBar)
	.service("helpersSrv", helpersSrv);

	//.controller("MapCtrl", MapCtrl);

	//.directive("headerGraphic", headerGraphic)
	//.service("stylesSrv", stylesSrv);





/*
for (let i = 0; i < markers.length; i++)
{
	let arr = [markers[i][0], markers[i][1]]
	let mark = L.marker( arr ).addTo(mymap).bindPopup("<b>Hello world!</b><br>I am a popup.");
	mark.bindPopup("<div><b>Hello world!</b><br>I am a popup.</div>");
}
*/


//let marker = L.marker( [54.0, -0.09] ).addTo(mymap);

//marker.bindPopup("<div><b>Hello world!</b><br>I am a popup.</div>");

//var marker = L.marker([51.5, -0.09]).addTo(mymap);
// get some stuff



// services
//import allParksSrv from "./services/all-parks.service.js";

// controllers
//import MainCtrl from "./controllers/main.controller.js";
//import MapCtrl from "./controllers/map.controller.js";

// directives
//import headerGraphic from "./directives/header.directive.js";


// filters


// GO!



	//.controller("MainCtrl", MainCtrl)
	//.controller("MapCtrl", MapCtrl);
	//.directive("headerGraphic", headerGraphic)
	//.service("stylesSrv", stylesSrv);
