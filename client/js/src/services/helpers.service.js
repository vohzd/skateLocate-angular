"use strict";

function helpers(){

	let helpers = {};

	helpers.rev = function(array){
		let copy = [].concat(array);
		return copy.reverse();
	}

	return helpers;

}


export default helpers;