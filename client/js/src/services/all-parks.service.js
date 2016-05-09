"use strict";

function allParksSrv ($http){

	return $http.get("/skateparks");

}

//allParksSrv.$inject["$http"];

export default allParksSrv;