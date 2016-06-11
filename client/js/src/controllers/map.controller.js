"use strict";

function MapCtrl($scope, $log, $rootScope, $compile, leafletData, helpersSrv, localStorageService){

	// Bootstrap the mofo
	configureLeaflet($scope, $log, $compile, leafletData, helpersSrv);

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

	$rootScope.$on("focusPopup", function(event, targetId){
		focusOnParticularSkatepark($scope, targetId);
	});

	$rootScope.$on("filterMarkers", function(event, searchedString){
		filterMarkersByString($scope, searchedString);
	});

	$rootScope.$on("matchMarkersToTags", function(event, tagsArr){
		filterMarkersByTags($scope, tagsArr);
	});
	

}
						
function toggleEditButton($scope, helpersSrv)
{
	if (!$scope.isEditing){
		$scope.isEditing = true;
		helpersSrv.createToast("Click or tap on the map to add a new park!");
		helpersSrv.toggleEditOn();
	}
	else if ($scope.isEditing){
		$scope.mapInstance.removeLayer($scope.lastMarker);
		//$scope.lastMarker.remove();
		$scope.isEditing = false;
		helpersSrv.toggleEditOff();
	}
}

function configureLeaflet($scope, $log, $compile, leafletData, helpersSrv)
{
	// where default images are stored
	L.Icon.Default.imagePath = '../../img/leaflet/';

	angular.extend($scope, {

		init : {
			lat: 51.5,
			lng: 0,
			zoom: 7
		},

		tiles : {
			name: 'skate-clean',
			url: 'https://api.mapbox.com/styles/v1/intheon/cinzqpcbf001cb7m7isotj0nz/tiles/{z}/{x}/{y}?access_token={apikey}',
			type: 'xyz',
			options: {
				apikey: 'pk.eyJ1IjoiaW50aGVvbiIsImEiOiJjaW5lZ3RkaDUwMDc2d2FseHhldHl0Y3dyIn0.L1RWCbggwqkNegUc1ZIwJw',
				mapid: 'mapbox://styles/intheon/cinzqpcbf001cb7m7isotj0nz'
			},

		},


	});


	// markers

	// store the map instance
	// returns a promise, which is ensures you dont run anything on 'undefined'
	leafletData.getMap("map-core").then((map) => {

		$scope.mapInstance = map;
		// Set a listener on the map instance

		$scope.mapInstance.on("click", (event) => {

			if (event.originalEvent.type == "keypress")
			{
				return false;
			}
			else
			{
				// Dont do anything if edit mode is off
				if (!$scope.isEditing)
				{
					return;
				}
				else
				{
					createTempMarker($scope, $compile, event.latlng);
				}
			}

		})


		// Add the edit button
		L.easyButton( '<div class="waves-effect white lighten-4 btn-flat toggleControl">Add a park</div>', function(){
			toggleEditButton($scope, helpersSrv);
		}).addTo($scope.mapInstance);



	});

}

function popUpContent()
{
	return "<header-graphic></header-graphic>";
}

function createTempMarker($scope, $compile, position)
{

	if ($scope.lastMarker)
	{
		$scope.mapInstance.removeLayer($scope.lastMarker);
	}
		
	$scope.isMarkerInProg = true;
	$scope.lastMarker = L.marker([position.lat, position.lng]).addTo($scope.mapInstance);
	$scope.lastMarkerPosition = position;

	// This compiles the directive, because otherwise, you just get a blank pop up
	//let directiveTag = $(document.createElement("add-new-skatepark"));
	let directiveTag = $("<add-new-skatepark></add-new-skatepark>");
	let compiledDirective = $compile(directiveTag)($scope);

	$scope.lastMarker.bindPopup(compiledDirective[0]).openPopup()
}

// translates my own DB format into a object format leaflet prefers to work with, specifically the lng lat are properties.
function parseMarkers($scope, $compile, markers, localStorageService)
{
	// get the ones this particular client/end-user has voted for
	// loop through the markers and add to the map
	for (marker of $scope.$parent.main.allData){

		let asString = JSON.stringify(marker);

		let popup = "<existing-skatepark-info current-skatepark='" + asString + "'></existing-skatepark-info>";

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
				focus: false,
				group: "group",
				internalId: marker._id,
				descTags: marker.skateparkTags

		});

	}

	console.log("clone");
	$scope.markersClone = $scope.markers;


}

function focusOnParticularSkatepark($scope, popupId){

	$scope.markers.forEach((val, point) => {

		if (val.internalId === popupId){
			val.focus = true;
		}
		else{
			val.focus = false;
		}
	})

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

export default MapCtrl;