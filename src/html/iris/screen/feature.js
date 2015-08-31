iris.ui(function (self) {
	"use strict";

	var book = iris.resource(iris.path.resource.book.js);

	self.create = function() {
		self.tmpl(iris.path.screen.feature.html);

		self.get('btnAddScenario').on('click', addScenario);

		self.ui('featureName', iris.path.ui.editableLabel.js, {defaultText: 'New feature'});
		self.ui('featureMotivation', iris.path.ui.editableLabel.js, {defaultText: 'Motivation'});
		self.ui('featureBeneficiary', iris.path.ui.editableLabel.js, {defaultText: 'Beneficiary'});
		self.ui('featureExpectedBehaviour', iris.path.ui.editableLabel.js, {defaultText: 'Expected behaviour'});
	};

	self.awake = function() {
		var episodeId = self.param('episodeId');
		var featureId = self.param('featureId');
		iris.log('Scenarios Screen params episodeId[' + episodeId + '] featureId[' + featureId + ']');

		if (featureId && episodeId) {
			book.getFeature(episodeId, featureId, onGetFeature);
		}
	};

	function onGetFeature(err, feature) {
		if (err) return alert('Episode not found');
		if (!feature) return alert('Feature not found');

		iris.log('Get feature=', feature);

		self.ui('featureName').text(feature.name);
		self.ui('featureMotivation').text(feature.description.motivation);
		self.ui('featureBeneficiary').text(feature.description.beneficiary);
		self.ui('featureExpectedBehaviour').text(feature.description.expectedBehaviour);
		setScenarios(feature.scenarios);
	}

	function setScenarios(scenarioList) {
		if (!scenarioList || scenarioList.length === 0) {
			return;
		}

		self.destroyUIs('scenarios');
		scenarioList.forEach(function(scenario) {
			self.ui('scenarios', iris.path.ui.scenario.js, {scenario: scenario}, self.APPEND);
		});
	}

	function addScenario() {
		var scenario = {name: 'New scenario', steps: {given: [''], when: [''], then: ['']}};
		self.ui('scenarios', iris.path.ui.scenario.js, {scenario: scenario}, self.APPEND);
		$("html, body").animate({ scrollTop: $(document).height()-$(window).height() });
	}

}, iris.path.screen.feature.js);
