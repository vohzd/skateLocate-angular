"use strict";

function ToggleCtrl(){

	this.panelShown = true;

	this.togglePanel = function(){

		if (this.panelShown)
		{
			$(".sidebar").addClass("no-sidebar");
			this.panelShown = false;
		}
		else if (!this.panelShown)
		{
			$(".sidebar").removeClass("no-sidebar");
			this.panelShown = true;
		}

	}

}

export default ToggleCtrl;