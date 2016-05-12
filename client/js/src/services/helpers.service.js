"use strict";

function helpers(){

	let helpers = {};

	helpers.rev = function(array){
		let copy = [].concat(array);
		return copy.reverse();
	}

	helpers.createToast = function(string){
		Materialize.toast(string, 2000) // 2000 is the duration of the toast
	}

	helpers.toggleEditOn = function(){
		$(".toggleControl").removeClass("white");
		$(".toggleControl").addClass("green");
		$(".toggleControl").text("Stop")
	}

	helpers.toggleEditOff = function(){
		$(".toggleControl").removeClass("green");
		$(".toggleControl").addClass("white");
		$(".toggleControl").text("ADD")
	}

	helpers.testIsValidURL = function(string){
		// This regex probably sucks and will probably break
		const testRegEx = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
		const isIt = string.match(testRegEx);
		return isIt;
	}

	helpers.returnArray = function(string){
		let toReturn = [];

		if (typeof data === "string"){
			toReturn.push(data);
		}
		else if (typeof data === "object"){
			toReturn = data
		}

		return toReturn;
	}

	return helpers;
}


export default helpers;			
