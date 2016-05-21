/* this is the main reference point for the app, all stuff is effectively pulled into here, and then bundled with jspm */

// library imports
import angular from "angular";
import $ from "jquery";
import material from "materialize-css";
import nemLogging from "angular-simple-logger";
import ngFileUpload from "ng-file-upload";

import leaflet from "Leaflet/Leaflet";
import uiLeaflet from "angular-ui/ui-leaflet";
import leafletMarkerCluster from "Leaflet/Leaflet.markercluster";
import leafletEasyButton from "leaflet-easybutton";
import leafletLabel from "Leaflet/Leaflet.label"

// services
import helpersSrv from "./services/helpers.service.js";
import uploadImageToCloud from "./services/uploadImageToCloud.service.js";
import sendToDB from "./services/sendToDB.service.js";
import getFromDB from "./services/getFromDB.service.js";
import tagsSrv from "./services/tags.service.js";


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
import addNewSkateparkCtrl from "./controllers/addNewSkatepark.controller.js";
import ToggleCtrl from "./controllers/toggle.controller.js";


// GO
angular.module("ngSkateApp", ["nemLogging", "ui-leaflet", "ngFileUpload"])
	.controller("MainCtrl", MainCtrl)
	.controller("MapCtrl", MapCtrl)
	.controller("addNewSkateparkCtrl", addNewSkateparkCtrl)
	.controller("ToggleCtrl", ToggleCtrl)
	.directive("headerGraphic", headerGraphic)
	.directive("highestRankedItems", highestRankedItems)
	.directive("recentlyAddedItems", recentlyAddedItems)
	.directive("addNewSkatepark", addNewSkatepark)
	.directive("infoTriangle", infoTriangle)
	.directive("filterItemsByTag", filterItemsByTag)
	.directive("existingSkateparkInfo", existingSkateparkInfo)
	.directive("searchBar", searchBar)
	.service("helpersSrv", helpersSrv)
	.service("sendToDB", sendToDB)
	.service("getFromDB", getFromDB)
	.service("uploadImageToCloud", uploadImageToCloud)
	.service("tagsSrv", tagsSrv);


