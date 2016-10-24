"use strict";

function MapCtrl($scope, $rootScope, $log, $compile, leafletData, helpersSrv, localStorageService, leafletMapEvents){

	// Bootstrap the mofo
	configureLeaflet($rootScope, $scope, $log, $compile, leafletData, helpersSrv);

	// A button the user has to click to switch to 'add skatepark' modes
	$scope.isEditing 			= false;
	$scope.isMarkerInProg 		= false;
	$scope.markers 				= [];
	$scope.markersClone			= [];

	$rootScope.$on("parseMarkers", function(event, response){
		parseMarkers($scope, $compile, localStorageService);
	});

	$rootScope.$on("destroyPopup", function(event){
		toggleEditButton($scope, helpersSrv);
	});

	$rootScope.$on("focusPopup", function(event, targetId, item){
		focusOnParticularSkateparkMarker($scope, targetId, item);
	});

	$rootScope.$on("filterMarkers", function(event, searchedString){
		filterMarkersByString($scope, searchedString);
	});

	$rootScope.$on("matchMarkersToTags", function(event, tagsArr){
		filterMarkersByTags($scope, tagsArr);
	});
	
}

function configureLeaflet($rootScope, $scope, $log, $compile, leafletData, helpersSrv){
	angular.extend($scope, {
		init : {
			lat: 40.275335,
			lng: -37.880859,
			zoom: 4
		},
		tiles : {
			name: 'skatev2',
			url: 'https://api.mapbox.com/styles/v1/intheon/ciu8pd4ly004j2imly4ombo2g/tiles/{z}/{x}/{y}?access_token={apikey}',
			type: 'xyz',
			options: {
				apikey: 'pk.eyJ1IjoiaW50aGVvbiIsImEiOiJjaW5lZ3RkaDUwMDc2d2FseHhldHl0Y3dyIn0.L1RWCbggwqkNegUc1ZIwJw',
				mapid: 'mapbox://styles/intheon/ciu8pd4ly004j2imly4ombo2g',
				tileSize: 512,
				zoomOffset: -1
			},
		},
	});

	// store the map instance - returns a promise, which is ensures you dont run anything on 'undefined'
	leafletData.getMap("map-core").then((map) => {

		L.Icon.Default.prototype.options.iconRetinaUrl = "/img/leaflet/marker-icon-2x.png"
		L.Icon.Default.prototype.options.iconUrl = "/img/leaflet/marker-icon.png"
		L.Icon.Default.prototype.options.shadowUrl = "/img/leaflet/marker-shadow.png"

		$scope.mapInstance = map;
		// Set a listener on the map instance
		$scope.mapInstance.on("click", (event) => {
			if (event.originalEvent.type == "keypress"){
				return false;
			}
			else {
				// Dont do anything if edit mode is off
				if (!$scope.isEditing){
					return;
				}
				else {
					createTempMarker($rootScope, $scope, $compile, event.latlng);
				}
			}
		});

		$scope.mapInstance.on("popupclose", (event) => {
			$rootScope.$emit("removeIdentifierInURL");
		});

		// Search
		L.easyButton( '<a class="align no-round top-round" ng-class="{ blue-toolbar-icon : main.panelsShown.search}"> <i class="material-icons">search</i></a>', function(){
			$rootScope.$emit("showOnlyOnePanel", "search");
			toggleHighlight($rootScope, $scope, this);
		}).addTo($scope.mapInstance);

		// Tags
		L.easyButton( '<a class="align no-round"><i class="material-icons">label_outline</i></a>', function(){
			$rootScope.$emit("showOnlyOnePanel", "tags");
			toggleHighlight($rootScope, $scope, this);

		}).addTo($scope.mapInstance);

		// Highest rated
		L.easyButton( '<a class="align no-round"><i class="material-icons">trending_up</i></a>', function(){
			$rootScope.$emit("showOnlyOnePanel", "highest");
			toggleHighlight($rootScope, $scope, this);

		}).addTo($scope.mapInstance);

		// Newest
		L.easyButton( '<a class="align no-round"><i class="material-icons">update</i></a>', function(){
			$rootScope.$emit("showOnlyOnePanel", "newest");
			toggleHighlight($rootScope, $scope, this);

		}).addTo($scope.mapInstance);

		// Geolocation
		L.easyButton( '<a class="align no-round"><i class="material-icons">explore</i></a>', function(){
			$rootScope.$emit("showOnlyOnePanel", "geo");
			toggleHighlight($rootScope, $scope, this);

		}).addTo($scope.mapInstance);

		// About / Help
		L.easyButton( '<a class="align no-round"><i class="material-icons">help</i></a>', function(){
			$rootScope.$emit("showOnlyOnePanel", "about");
			toggleHighlight($rootScope, $scope, this);

		}).addTo($scope.mapInstance);

		// Add
		L.easyButton( '<a class="align no-round  bottom-round"><i class="material-icons">add_location</i></a>', function(){
			toggleHighlight($rootScope,  $scope, this);
			toggleEditButton($scope, helpersSrv);
			$rootScope.$emit("dismissAllPanels");
		}).addTo($scope.mapInstance);
	});
}
	
function toggleHighlight($rootScope, $scope, el){

	let element = el.button.children[0];

	if ( $(element).hasClass(("blue-toolbar-icon")) ){
		$(element).removeClass(("blue-toolbar-icon"));
		$rootScope.$emit("dismissAllPanels");
	}
	else
	{
		$(".easy-button-button span").removeClass("blue-toolbar-icon");
		$(element).addClass(("blue-toolbar-icon"))
	}

	clearSearch($scope);
}


function clearSearch($scope){
	if (!$scope.$parent.main.panelsShown.search){
		$scope.$parent.searchString = null;
		filterMarkersByString($scope, null);
	}
	if (!$scope.$parent.main.panelsShown.tags){
		$(".chip").removeClass("active-chip");
		filterMarkersByTags($scope, []);
	}

}
					
function toggleEditButton($scope, helpersSrv){
	if (!$scope.isEditing){
		$scope.isEditing = true;
		helpersSrv.createToast("Click or tap on the map to add a new park!");
		helpersSrv.toggleEditOn();
	}
	else if ($scope.isEditing){
		if (!$scope.lastMarker){
			return;
		}
		else {
			$scope.mapInstance.removeLayer($scope.lastMarker);
		}
		$scope.isEditing = false;
		helpersSrv.toggleEditOff();
	}
}

function createTempMarker($rootScope, $scope, $compile, position){
	if ($scope.lastMarker){
		$scope.mapInstance.removeLayer($scope.lastMarker);
	}
		
	$scope.isMarkerInProg = true;
	$scope.lastMarker = L.marker([position.lat, position.lng]).addTo($scope.mapInstance);
	$scope.lastMarkerPosition = position;

	// This compiles the directive, because otherwise, you just get a blank pop up
	//let directiveTag = $(document.createElement("add-new-skatepark"));
	let directiveTag = $("<add-new-skatepark></add-new-skatepark>");
	let compiledDirective = $compile(directiveTag)($scope);

	$scope.lastMarker.bindPopup(compiledDirective[0]).openPopup();

	$(".leaflet-popup-close-button").click(() => {
		$(".easy-button-button span").removeClass("blue-toolbar-icon");
		$rootScope.$emit("destroyPopup");
	})
}

// translates my own DB format into a object format leaflet prefers to work with, specifically the lng lat are properties.
function parseMarkers($scope, $compile, markers, localStorageService, leafletMapEvents){
	// get the ones this particular client/end-user has voted for
	// loop through the markers and add to the map
	for (marker of $scope.$parent.main.allData){
		let asString = JSON.stringify(marker);
			// fixes issue with this breaking the string
			asString = asString.replace(/'/g, "\\&#39;");

		$scope.markers.push({
				lat: marker.skateparkLocation[1],
				lng: marker.skateparkLocation[0],
				title: marker.skateparkName,
				label: {
					message: marker.skateparkName,
					options: {
						noHide: true
					}
				},
				message: "<existing-skatepark-info current-skatepark='"+asString+"'></existing-skatepark-info>",
				compileMessage: true,
				getMessageScope: function(){ return $scope },
				focus: false,
				group: "group",
				internalId: marker._id,
				descTags: marker.skateparkTags
		});

	}

	// the clone is the original array, so you can always retreive all markers if you undo a search, tag etc
	// there is an edge case that if you add a marker, then the clones wont represent the updated source
	$scope.markersClone = $scope.markers;
}

function focusOnParticularSkateparkMarker($scope, popupId, popup){

	let lat, lng;

	if (popup.skateparkLocation){
		lat = popup.skateparkLocation[1];
		lng = popup.skateparkLocation[0];
	}
	else if (popup.lat && popup.lng){
		lat = popup.lat;
		lng = popup.lng;
	}


	$scope.init = {
		lat: lat,
		lng: lng,
		zoom: 12
	}
	$scope.markers.filter((input) => {
		if (input.internalId === popupId) input.focus = !input.focus;
	});


}	


function filterMarkersByString($scope, searchedString){

	if (!searchedString){
		$scope.markers = $scope.markersClone;
		$scope.$parent.main.visibleMarkers = [];
	}
	else {

		// Will try to match markers based on title
		let matched = [];

		$scope.markersClone.forEach((marker, pointer) => {

			const lower = marker.title.toLowerCase();
			const search = searchedString.toLowerCase();
			const result = lower.indexOf(search);

			if (result > -1){
				matched.push(marker);
			}

		});

		$scope.markers = matched;
		$scope.$parent.main.visibleMarkers = matched;

	}


}

function filterMarkersByTags($scope, selectedTags){

	// Will try to match markers based on tags
	let matched = [];

	if (selectedTags.length === 0){
		// restores back to original
		$scope.markers = $scope.markersClone
	}
	else {

		$scope.markersClone.forEach((marker, pointer) => {
			// option one -- http://stackoverflow.com/questions/15514907/determining-whether-one-array-contains-the-contents-of-another-array-in-javascri
			let testForMatches = marker.descTags.filter((cur) => {
				return selectedTags.indexOf(cur) > -1;
			}).length == selectedTags.length;

			if (testForMatches){
				matched.push(marker);
			}
		});

		$scope.markers = matched;

	}

}

MapCtrl.$inject = [
	"$scope",
	"$rootScope",
	"$log",
	"$compile",
	"leafletData",
	"helpersSrv",
	"localStorageService",
	"leafletMapEvents"
];

export default MapCtrl;