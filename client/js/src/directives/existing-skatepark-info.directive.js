function existingSkateparkInfo(){
	
	return {

		"restrict": "E",
		"templateUrl": "../../../views/existing-skatepark-info.view.html",
		"replace": true,
		"scope": "=",
		controller: function(){
			console.log("if this works ill be amazed");
			console.log();
		}

	}

}

export default existingSkateparkInfo;