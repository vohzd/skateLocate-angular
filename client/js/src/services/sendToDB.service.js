"use strict";

function sendToDB ($http, $rootScope){

	// Object to be returned to Controller
	let parkDBLayer = {

		// POST
		submitNewPark: (payload) => {

			// Saves the skatepark data to the db
			$http.post("/skateparks", payload)
				.success((data) => {

					// the _id will be returned
					$http.get("/skateparks/" + data)
						.success((response) => {

							// Emit the success to the controller
							$rootScope.$emit("pushLastToScope", response);
							
						})

				})
				.error((data) => {
					console.log('Error: ' + data);
				});

		},

		// PUT
		updateExistingPark: (id, payload) => {

			// Send put request to server
			$http.put("/skateparks/" + id, payload).success((response) => { 

				// no need to return anything...

			});

		}


	};

	return parkDBLayer;

}

//allParksSrv.$inject["$http"];

export default sendToDB;
