"use strict";

function MapCtrl($scope, $log, $rootScope, $compile, leafletData, helpersSrv){

	// Bootstrap the mofo
	configureLeaflet($scope, $log, $compile, leafletData, helpersSrv);

	// A button the user has to click to switch to 'add skatepark' modes
	$scope.isEditing 			= false;
	$scope.isMarkerInProg 		= false;
	$scope.markers 				= {};

	$rootScope.$on("parseMarkers", function(event, response){
		parseMarkers($scope, response);
	});

	$rootScope.$on("destroyPopup", function(event){
		
		toggleEditButton($scope, helpersSrv);

	});



}
						
function toggleEditButton($scope, helpersSrv)
{
	if (!$scope.isEditing)
	{
		$scope.isEditing = true;
		helpersSrv.createToast("Click or tap on the map to add a new park!");
		helpersSrv.toggleEditOn();
	}
	else if ($scope.isEditing)
	{
		$scope.mapInstance.removeLayer($scope.lastMarker);

		//$scope.lastMarker.remove();
		$scope.isEditing = false;
		helpersSrv.toggleEditOff();
	}
}

function configureLeaflet($scope, $log, $compile, leafletData, helpersSrv)
{
	// where default images are stored
	//L.Icon.Default.imagePath = '../../img/leaflet/';

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
			tileSize: 512,
		},


	});

	/*
	// Map center
	$scope.init = {
		lat: 51.5,
		lng: 0,
		zoom: 7
	}

	// Map 'tiles' (which is another name for a skin) + api keys
	$scope.tiles = {
		name: 'basic',
		url: 'https://api.mapbox.com/styles/v1/intheon/ciobor26g00aevemcqytkj4e9/tiles/{z}/{x}/{y}?access_token={apikey}',
		type: 'xyz',
		options: {
			apikey: 'pk.eyJ1IjoiaW50aGVvbiIsImEiOiJjaW5lZ3RkaDUwMDc2d2FseHhldHl0Y3dyIn0.L1RWCbggwqkNegUc1ZIwJw',
			mapid: 'mapbox://styles/intheon/ciobor26g00aevemcqytkj4e9'
		},
		tileSize: 1024
	}

	*/

	// markers

	// store the map instance
	// returns a promise, which is ensures you dont run anything on 'undefined'
	leafletData.getMap("map-core").then((map) => {

		$scope.mapInstance = map;
		// Set a listener on the map instance

		$scope.mapInstance.on("click", (event) => {
			// Dont do anything if edit mode is off
			if (!$scope.isEditing)
			{
				return;
			}
			else
			{
				createTempMarker($scope, $compile, event.latlng);
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
		//console.log($scope.lastMarker);
		//$scope.lastMarker.remove();
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
function parseMarkers($scope, markers)
{
	for (marker of markers)
	{

		Object.defineProperty($scope.markers, marker._id, {

			enumerable: true,
			writable: true,
			configurable: true,
			value: {
				lat: marker.skateparkLocation[1],
				lng: marker.skateparkLocation[0],
				title: marker.skateparkName,
				label: {
					message: marker.skateparkName,
					options: {
						noHide: true
					}
				},
				group: "group"
			}

		});

	}

}




export default MapCtrl;