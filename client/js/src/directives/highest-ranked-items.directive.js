function highestRankedItems(){
	
	return {

		"restrict": "E",
		"templateUrl": "../../../views/highest-ranked-items.view.html",
		"replace": true,
		"link": function(scope, element, attrs){

			/*

			this fires, bbut wont be adding any additional buttons to this view... yet
			console.log("hello");
			console.log(scope);
			console.log(element);
			console.log(attrs);

			*/
		}

	}

}

export default highestRankedItems;