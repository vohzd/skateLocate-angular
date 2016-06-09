"use strict";

function MainCtrl($scope, $rootScope, $compile, $timeout, getFromDB, tagsSrv, localStorageService){

	// This is fired on page init to get ALL the skateparks

	this.tags = tagsSrv;

	getFromDB.getAll().success((response) => {

		// Store the response in the array from the server
		this.allData = response;


	}).then(() => {

		// Once the server has the result, add in an extra property if the user has already voted on it
		// This should be determined by grabbing the localStorage object on the end-users browser to see what they've voted on.
		this.addVotedProp(this.allData);

		// Parse Markers
		$rootScope.$broadcast("parseMarkers", this.allData);

	});

	$rootScope.$on("pushLastToScope", function(event, response){
		$scope.main.allData.push(response);
	});

	$rootScope.$on("incrementVote", (event, response) => {

		this.allData.forEach((value, pointer) => {
			if (value._id === response._id){
				value.skateparkRating += 1;
			}
		})

	});


	this.showSkateparkDetails = function(id, item){


		console.log("called");
		console.log(id);

		$rootScope.$broadcast("focusPopup", id);
	}

	// Cycles through all the skateparks, and compares them against whats in localstorage
	// If it finds items in localstorage, then it means that the user has already voted for it.
	this.addVotedProp = function(){

		// get the ones this particular client/end-user has voted for
		const votedSkateparks = localStorageService.get("userSkateparkVotes");

		if (votedSkateparks){

			// Loop through ALL skateparks
			this.allData.forEach((skatepark, count) => {

				// Within this, loop through all the client-saved votes
				votedSkateparks.forEach((voted, pointer) => {

					// If a match is found, add a prop to the obj
					if (skatepark._id === voted._id){

						this.allData[count].hasVote = true;

					}

				});
			});

		}
	}

}


export default MainCtrl;