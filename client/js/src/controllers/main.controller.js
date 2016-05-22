"use strict";

function MainCtrl($scope, $rootScope, $compile, $timeout, getFromDB, tagsSrv){

	// This is fired on page init to get ALL the skateparks

	this.tags = tagsSrv;

	getFromDB.getAll().success((response) => {

		// Store the response in the array
		this.allData = response;


	}).then((response) => {

		// Parse Markers
		$rootScope.$broadcast("parseMarkers", response.data);

	});

	$rootScope.$on("pushLastToScope", function(event, response){
		$scope.main.allData.push(response);
	});



}

export default MainCtrl;