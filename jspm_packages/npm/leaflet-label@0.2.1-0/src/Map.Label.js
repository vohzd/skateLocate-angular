/* */ 
"format cjs";
L.Map.include({
	showLabel: function (label) {
		return this.addLayer(label);
	}
});