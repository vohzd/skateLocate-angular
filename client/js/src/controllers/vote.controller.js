"use strict";

function VoteCtrl($http){

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
			allowOnlyOneVote();

		});

	}

}


function allowOnlyOneVote(){

	console.log("add me to localstorage");


}

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

