"use strict";

function getFromDB($http, $rootScope){

	let db = {}

	db.getAll = function(){
		return $http.get("/skateparks");
	}

	return db;

}

getFromDB.$inject = [
	"$http",
	"$rootScope"
];

export default getFromDB;
