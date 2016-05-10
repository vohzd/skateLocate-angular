/* this is the main reference point for the app, all stuff is effectively pulled into here, and then bundled with jspm */

// library imports
import angular from "angular";
import $ from "jquery";
import material from "materialize-css";
import leaflet from "leaflet";
import nemLogging from "angular-simple-logger";
import uiLeaflet from "ui-leaflet";

import leafletMarkerCluster from "leaflet.markercluster";
import leafletEasyButton from "leaflet-easybutton";

// services
import helpersSrv from "./services/helpers.service.js";

// directives
import headerGraphic from "./directives/header.directive.js";
import highestRankedItems from "./directives/highest-ranked-items.directive.js";
import existingSkateparkInfo from "./directives/existing-skatepark-info.directive.js";
import recentlyAddedItems from "./directives/recently-added-items.directive.js";
import addNewSkatepark from "./directives/add-new-skatepark.directive.js";
import filterItemsByTag from "./directives/filter-items-by-tag.directive.js";
import infoTriangle from "./directives/info-triangle.directive.js";
import searchBar from "./directives/search.directive.js";

// controllers
import MainCtrl from "./controllers/main.controller.js";
import MapCtrl from "./controllers/map.controller.js";


angular.module("ngSkateApp", ["nemLogging", "ui-leaflet"])
	.controller("MainCtrl", MainCtrl)
	.controller("MapCtrl", MapCtrl)
	.directive("headerGraphic", headerGraphic)
	.directive("highestRankedItems", highestRankedItems)
	.directive("recentlyAddedItems", recentlyAddedItems)
	.directive("addNewSkatepark", addNewSkatepark)
	.directive("infoTriangle", infoTriangle)
	.directive("filterItemsByTag", filterItemsByTag)
	.directive("existingSkateparkInfo", existingSkateparkInfo)
	.directive("searchBar", searchBar)
	.service("helpersSrv", helpersSrv);
