"use strict";

function VoteCtrl($rootScope, $scope, $http, localStorageService){

	this.incrementRating = function(item){

		// Increment the item rating
		// This has two-way binding so saves having to do a get request once the below PUT is done
		item.skateparkRating += 1;
		item.hasVote = true;

		// call the function to update the skateparks rating
		this.updateRating(item);

		$rootScope.$broadcast("incrementVote", item);

	}

	this.updateRating = function(item){

		// This updates the particular document on MongoDb via http PUT
		$http.put("/skateparks/" + item._id, item).success((response) => {

			// upon success set a flag in localStorage to say this has been voted for from this machine
			if (!item.hasVote){
				localStorageHandler($scope, localStorageService, item);
			}

		});

	}

}

function localStorageHandler($scope, localStorageService, item){

	// get a list of all votes the user has cast
	let local = localStorageService.get("userSkateparkVotes");

	// if 'null' is returned, create new localstorage
	if (!local){
		localStorageService.set("userSkateparkVotes", [item]);
	}
	else {
		local.push(item);
		localStorageService.set("userSkateparkVotes", local);
	}

}

VoteCtrl.$inject = [
	"$rootScope",
	"$scope",
	"$http",
];


export default VoteCtrl;

