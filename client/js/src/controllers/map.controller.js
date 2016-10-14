"use strict";

function MapCtrl($scope, $rootScope, $log, $compile, leafletData, helpersSrv, localStorageService){

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
		})
		// Add the edit button
		L.easyButton( '<div class="waves-effect white lighten-4 btn-flat toggleControl">Add a park</div>', function(){
			toggleEditButton($scope, helpersSrv);
		}).addTo($scope.mapInstance);
	});
}
					
function toggleEditButton($scope, helpersSrv){
	if (!$scope.isEditing){
		$scope.isEditing = true;
		helpersSrv.createToast("Click or tap on the map to add a new park!");
		helpersSrv.toggleEditOn();
	}
	else if ($scope.isEditing){
		$scope.mapInstance.removeLayer($scope.lastMarker);
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
		$rootScope.$emit("destroyPopup");
	})
}

// translates my own DB format into a object format leaflet prefers to work with, specifically the lng lat are properties.
function parseMarkers($scope, $compile, markers, localStorageService){
	// get the ones this particular client/end-user has voted for
	// loop through the markers and add to the map
	for (marker of $scope.$parent.main.allData){
		let asString = JSON.stringify(marker);
			// fixes issue with this breaking the string
			asString = asString.replace(/'/g, "\\&#39;");
		let popup = "<existing-skatepark-info current-skatepark='"+asString+"'></existing-skatepark-info>";

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
				message: popup,
				compileMessage: true,
				getMessageScope: function(){ return $scope },
				focus: false,
				group: "group",
				internalId: marker._id,
				descTags: marker.skateparkTags
		});

	}

	// the clone is the original array, so you can always retreive all markers if you undo a search, tag etc
	$scope.markersClone = $scope.markers;
}

function focusOnParticularSkateparkMarker($scope, popupId, popup){
	$scope.init = {
		lat: popup.skateparkLocation[1],
		lng: popup.skateparkLocation[0],
		zoom: 12
	}
	$scope.markers.filter((input) => {
		if (input.internalId === popupId) input.focus = !input.focus;
	});
}	


function filterMarkersByString($scope, searchedString){

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

}

function filterMarkersByTags($scope, selectedTags){

	// Will try to match markers based on tags
	let matched = [];

	if (selectedTags.length === 0){
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
	"localStorageService"
];

export default MapCtrl;