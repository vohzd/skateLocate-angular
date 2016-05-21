"use strict";

function getFromDB ($http, $rootScope){

	let db = {}

	db.getAll = function(){
		return $http.get("/skateparks");
	}

	return db;

}

//allParksSrv.$inject["$http"];

export default getFromDB;
