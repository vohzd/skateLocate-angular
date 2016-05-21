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

	// Minimise the panel when clicked

	// Make the panels fade in when clicked
	this.fadeInBody = function(event){

		// bit unsmooth this

		/*
		const availableElements = event.currentTarget.nextElementSibling.children;
		$(availableElements).hide();

		$(availableElements).each(function(index) {

			$(this).delay(130*index).fadeIn(1110);
		});

		*/
	}


}

export default MainCtrl;