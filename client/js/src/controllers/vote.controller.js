"use strict";

function VoteCtrl($http, localStorageService){

	this.incrementRating = function(item){

		// Increment the item rating
		// This has two-way binding so saves having to do a get request once the below PUT is done
		item.skateparkRating += 1;

		// call the function to update the skateparks rating
		this.updateRating(item);
	}


	this.updateRating = function(item){

		// This updates the particular document on MongoDb via http PUT
		$http.put("/skateparks/" + item._id, item).success((response) => {

			// upon success set a flag in localStorage to say this has been voted for from this machine
			if (!item.hasVote){
				localStorageHandler(localStorageService, item);
			}

		});

	}

	this.votedSkateparks = localStorageService.get("userSkateparkVotes");

	console.log(this.votedSkateparks);

}


function localStorageHandler(localStorageService, item){

	// get a list of all votes the user has cast
	let doesLsExist = localStorageService.get("userSkateparkVotes");

	// if 'null' is returned, create new localstorage
	if (!doesLsExist){
		localStorageService.set("userSkateparkVotes", [item]);
	}
	else {
		doesLsExist.push(item);
		localStorageService.set("userSkateparkVotes", doesLsExist);
	}

	// now set the local item to have a vote so the button becomes inactive
	item.hasVote = true;

	// now get the ones stored in localstorage
	const existing = localStorageService.get("userSkateparkVotes");

}

function getCurrentLocalStorageItems(keyName){
	return localStorageService.get("userSkateparkVotes");
}

/*

// Vote Controller - to allow the user only be able to vote on an item once
app.controller("VoteCtrl", ($scope, $rootScope, localStorageService) => {

	$rootScope.$on("runVoteCtrl", () => {

		// add a prop to each element in the allData array to mention if it matches the id of that in LocalStorage
		let votedFor = localStorageService.get("spUsrHasAdded");

		// NOTE, this can definitely be optimised, but i need to read up on the big O to find out the best way
		// Cycle through all data 
		$.each($scope.allData, (allDataPointer, allDataVal) => {

			// sub-list: cycle through localstorage data
			$.each(votedFor, (lsPointer, lsVal) => {

				if (allDataVal._id === lsVal._id)
				{
					$scope.allData[allDataPointer].hasVote = true;
				}

			});

		});
	})

});


*/


export default VoteCtrl;


/*
// Controller to handle ratings / upvotes
app.controller("RatingCtrl", ($scope, $rootScope, $http, localStorageService) => {

	// A button in the view fires this method
	// It's bound to the scope, so automagically updates
	$scope.incrementRating = (item) => {

		// Update the local scope // This means that no further GET request is needed for now
		item.skateparkRating += 1;

		// Send put request to server
		$http.put("/skateparks/" + item._id, item).success((response) => { 

			// Once success has been reached, add a reference within localStorage so that this particular skatepark can't get upvoted by this device.
			// note: can work around this by clearing browser cache / different browser but sufficient for this example - look into this as part of ongoing maintanence

			// init new localstorage
			if (!localStorageService.get("spUsrHasAdded"))
			{
				localStorageService.set("spUsrHasAdded", [response]);
				$rootScope.$broadcast("runVoteCtrl");
			}
			else
			{
				// append to existing
				let currents = localStorageService.get("spUsrHasAdded");
					currents.push(response);

					localStorageService.set("spUsrHasAdded", currents);

				// Tell the vote controller to do its thing
				$rootScope.$broadcast("runVoteCtrl");
			}

		});

	};

});
*/

