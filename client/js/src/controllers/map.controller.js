"use strict";

function MapCtrl($scope, helpersSrv){

	// Bootstrap the mofo
	configureLeaflet($scope, helpersSrv);


	// A button the user has to click to switch to 'add skatepark' modes
	$scope.isEditing 			= false;
	$scope.isMarkerInProg 		= false;
	$scope.lastMarker 			= null;


	// Set a listener on the map instance
	$scope.map.on("click", (event) => {

		// Dont do anything if edit mode is off
		if (!$scope.isEditing)
		{
			return;
		}
		else
		{
			createTempMarker($scope, event.latlng);
		}

	})


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
		$scope.isEditing = false;
		helpersSrv.toggleEditOff();
	}
}

function configureLeaflet($scope, helpersSrv)
{
	$scope.map = L.map('map-core', { zoomControl: false }).setView([51.505, -0.09], 13);

	L.tileLayer('https://api.mapbox.com/styles/v1/intheon/cinz0kw8i0006bgnmykeq58x6/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaW50aGVvbiIsImEiOiJjaW5lZ3RkaDUwMDc2d2FseHhldHl0Y3dyIn0.L1RWCbggwqkNegUc1ZIwJw').addTo($scope.map);
	
	L.Icon.Default.imagePath = '../../img/leaflet/';

	new L.Control.Zoom({ position: 'bottomleft' }).addTo($scope.map);

	L.easyButton( '<div class="waves-effect white lighten-4 btn-flat toggleControl">Add a park</div>', function(){
		toggleEditButton($scope, helpersSrv);
	}).addTo($scope.map);

}

function popUpContent()
{
	return "<header-graphic></header-graphic>";
}

function createTempMarker($scope, position)
{
	if ($scope.lastMarker)
	{
		$scope.lastMarker.remove();
	}
		
	$scope.isMarkerInProg = true;
	$scope.lastMarker = L.marker([position.lat, position.lng]).addTo($scope.map);
	$scope.lastMarker.bindPopup("<div>wowow</div>").openPopup()
}



export default MapCtrl;