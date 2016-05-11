"use strict";

function addNewSkatepark($scope, helpersSrv){

	this.submitNewSkatepark = function(){
		let validation = isMandatoryFieldsFilled($scope);

		if (validation)
		{
			console.log("correct");
		}
		else if (!validation)
		{
			helpersSrv.createToast("Please fill out skatepark name, and your name :)");
		}
	}

}

function isMandatoryFieldsFilled($scope)
{
	if (!$scope.addNew.skateparkAdder || !$scope.addNew.skateparkName)
	{
		return false;
	}
	else
	{
		return true;
	}
}



export default addNewSkatepark;