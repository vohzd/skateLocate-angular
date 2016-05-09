"use strict";

function MapCtrl($scope, helpersSrv){

	$scope.isEditing = false;

	let map = L.map('map-core', { zoomControl: false }).setView([51.505, -0.09], 13);


	L.tileLayer('https://api.mapbox.com/styles/v1/intheon/cinz0kw8i0006bgnmykeq58x6/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaW50aGVvbiIsImEiOiJjaW5lZ3RkaDUwMDc2d2FseHhldHl0Y3dyIn0.L1RWCbggwqkNegUc1ZIwJw').addTo(map);
	
	L.Icon.Default.imagePath = '../../img/leaflet/';

	new L.Control.Zoom({ position: 'bottomleft' }).addTo(map);

	L.easyButton( '<div class="waves-effect white lighten-4 btn-flat toggleControl">Add a park</div>', function(){
		toggleEditButton($scope, helpersSrv);
	}).addTo(map);

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



export default MapCtrl;