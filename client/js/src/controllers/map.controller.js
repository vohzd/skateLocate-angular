"use strict";

function MapCtrl($scope, $log, $rootScope, $compile, leafletData, helpersSrv){

	// Bootstrap the mofo
	configureLeaflet($scope, $log, $compile, leafletData, helpersSrv);

	// A button the user has to click to switch to 'add skatepark' modes
	$scope.isEditing 			= false;
	$scope.isMarkerInProg 		= false;

	$rootScope.$on("parseMarkers", function(event, response){
		parseMarkers($scope, response);
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
		$scope.lastMarker.remove();
		$scope.isEditing = false;
		helpersSrv.toggleEditOff();
	}
}

function configureLeaflet($scope, $log, $compile, leafletData, helpersSrv)
{
	// where default images are stored
	L.Icon.Default.imagePath = '../../img/leaflet/';


	$scope.markers = {
		taipei: {
			group: "northTaiwan",
			lat: 25.0391667,
			lng: 121.525,
		},
		yangmei: {
			group: "northTaiwan",
			lat: 24.9166667,
			lng: 121.1333333
		},
		hsinchu: {
			group: "northTaiwan",
			lat: 24.8047222,
			lng: 120.9713889
		},
		miaoli: {
			group: "northTaiwan",
			lat: 24.5588889,
			lng: 120.8219444
		},
		tainan: {
			group: "southTaiwan",
			lat: 22.9933333,
			lng: 120.2036111,
			label: {
				message: "Marker2",
				options: {
					noHide: true
				}
			}
		},
		puzi: {
			group: "southTaiwan",
			lat: 23.4611,
			lng: 120.242
		},
		kaohsiung: {
			group: "southTaiwan",
			lat: 22.6252777778,
			lng: 120.3088888889
		},
		taitun: {
			group: "southTaiwan",
			lat: 22.75,
			lng: 121.15
		}
	};

	// Map center
	$scope.init = {
		lat: 25.0391667,
		lng: 121.525,
		zoom: 7
	}

	// Map 'tiles' (which is another name for a skin) + api keys
	$scope.tiles = {
		name: 'skate',
		url: 'https://api.mapbox.com/styles/v1/intheon/cinz0kw8i0006bgnmykeq58x6/tiles/{z}/{x}/{y}?access_token={apikey}',
		type: 'xyz',
		options: {
			apikey: 'pk.eyJ1IjoiaW50aGVvbiIsImEiOiJjaW5lZ3RkaDUwMDc2d2FseHhldHl0Y3dyIn0.L1RWCbggwqkNegUc1ZIwJw',
			mapid: 'mapbox://styles/intheon/cinz0kw8i0006bgnmykeq58x6'
		}
	}



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
		$scope.lastMarker.remove();
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



	/*
	$scope.markers = {
		m1: {
			lat: 51.5,
			lng: 0,
			focus: true,
			title: "Marker",
			draggable: true,
			label: {
				message: "Marker1",
				options: {
					noHide: true
				}
			}
		},
		m2: {
			lat: 51,
			lng: 0,
			focus: true,
			title: "Marker",
			draggable: true,
			label: {
				message: "Marker2",
				options: {
					noHide: true
				}
			}
		},
		m3: {
			lat: 50.6,
			lng: 0,
			focus: true,
			title: "Marker",
			draggable: true,
			label: {
				message: "Marker3",
				options: {
					noHide: true
				}
			}
		},
		m4: {
			lat: 51.6,
			lng: 0.1,
			focus: true,
			title: "Marker",
			draggable: true,
			label: {
				message: "Marker4",
				options: {
					noHide: true
				}
			}
		},
		m5: {
			lat: 53,
			lng: 0,
			focus: true,
			title: "Marker",
			draggable: true,
			label: {
				message: "Marker5",
				options: {
					noHide: true
				}
			}
		},
		m6: {
			lat: 51.4,
			lng: -0.1,
			focus: true,
			title: "Marker",
			draggable: true,
			label: {
				message: "Marker6",
				options: {
					noHide: true
				}
			}
		}
	}

	*/


	/*
	for (marker of markers)
	{

	}
	*/
}




export default MapCtrl;