iris.ui(function (self) {
	"use strict";

	var book = iris.resource(iris.path.resource.book.js);

	self.create = function() {
		self.tmpl(iris.path.ui.featureItem.html);

		iris.on('featureNameChange', onFeatureNameChange);
		self.inflate(self.settings());
		
		self.get('btnRemove').on('click', onRemove);
	};

	self.destroy = function() {
		iris.off('featureNameChange', onFeatureNameChange);
	};

	function onFeatureNameChange(e) {
		if (self.setting('feature').id === e.featureId) {
			self.get('featureName').text(e.name);
		}
	}

	function onRemove() {
		book.removeFeature(self.setting('episode').id, self.setting('feature').id, function(err) {
			if (err) return alert('Error deleting feature');
			iris.navigate('#/');
			self.destroyUI();
		});
	}

}, iris.path.ui.featureItem.js);
