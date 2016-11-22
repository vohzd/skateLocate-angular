/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	/* this is the main reference point for the app, all stuff is effectively pulled into here, and then bundled with jspm */

	// library imports
	import angular from "angular";
	import $ from "jquery";
	import material from "materialize-css";
	import nemLogging from "angular-simple-logger";
	import ngFileUpload from "ng-file-upload";
	import LocalStorageModule from "angular-local-storage";
	import swiper from "swiper";

	//inc
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
	import searchPanel from "./directives/search-panel.directive.js";
	import tagsPanel from "./directives/tags-panel.directive.js";
	import highestPanel from "./directives/highest-panel.directive.js";
	import newestPanel from "./directives/newest-panel.directive.js";
	import geoPanel from "./directives/geo-panel.directive.js";
	import aboutPanel from "./directives/about-panel.directive.js";
	import addPanel from "./directives/add-panel.directive.js";

	import fullscreen from "./directives/fullscreen.directive.js";
	import fullscreenSlideshow from "./directives/fullscreen-slideshow.directive.js";
	import voteButton from "./directives/vote-button.directive.js";

	// controllers
	import MainCtrl from "./controllers/main.controller.js";
	import MapCtrl from "./controllers/map.controller.js";
	import skateparkCtrl from "./controllers/skatepark.controller.js";
	import VoteCtrl from "./controllers/vote.controller.js";
	import ToggleCtrl from "./controllers/toggle.controller.js";
	import fullscreenSlideshowCtrl from "./controllers/fullscreenSlideshow.controller.js";
	import SearchCtrl from "./controllers/search.controller.js";

	// GO
	angular.module("ngSkateApp", ["nemLogging", "ui-leaflet", "ngFileUpload", "LocalStorageModule"])
		.controller("MainCtrl", MainCtrl)
		.controller("MapCtrl", MapCtrl)
		.controller("skateparkCtrl", skateparkCtrl)
		.controller("fullscreenSlideshowCtrl", fullscreenSlideshowCtrl)
		.controller("VoteCtrl", VoteCtrl)
		.controller("SearchCtrl", SearchCtrl)
		.controller("ToggleCtrl", ToggleCtrl)
		.directive("headerGraphic", headerGraphic)
		.directive("searchPanel", searchPanel)
		.directive("tagsPanel", tagsPanel)
		.directive("highestPanel", highestPanel)
		.directive("newestPanel", newestPanel)
		.directive("geoPanel", geoPanel)
		.directive("aboutPanel", aboutPanel)
		.directive("addPanel", addPanel)
		.directive("highestRankedItems", highestRankedItems)
		.directive("recentlyAddedItems", recentlyAddedItems)
		.directive("addNewSkatepark", addNewSkatepark)
		.directive("infoTriangle", infoTriangle)
		.directive("filterItemsByTag", filterItemsByTag)
		.directive("existingSkateparkInfo", existingSkateparkInfo)
		.directive("fullscreen", fullscreen)
		.directive("fullscreenSlideshow", fullscreenSlideshow)
		.directive("searchBar", searchBar)
		.service("helpersSrv", helpersSrv)
		.service("sendToDB", sendToDB)
		.service("getFromDB", getFromDB)
		.service("uploadImageToCloud", uploadImageToCloud)
		.service("tagsSrv", tagsSrv);




/***/ }
/******/ ]);