"use strict";

function MainCtrl($scope, $compile, getFromDB){

	// This is fired on page init to get ALL the skateparks

	getFromDB.getAll().success((response) => {

		// Store the response in the array
		this.allData = response;

	}).then((response) => {



	});



}

export default MainCtrl;