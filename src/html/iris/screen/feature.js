iris.ui(function (self) {
	"use strict";

	var book = iris.resource(iris.path.resource.book.js);
	var episodeId;
	var featureId;

	self.create = function() {
		self.tmpl(iris.path.screen.feature.html);

		self.get('btnAddScenario').on('click', addScenario);

		self.ui('featureName', iris.path.ui.editableLabel.js, {defaultText: 'New feature'}).on('change', onFeatureNameChange);
		self.ui('featureMotivation', iris.path.ui.editableLabel.js, {defaultText: 'Motivation'}).on('change', onFeatureChange);
		self.ui('featureBeneficiary', iris.path.ui.editableLabel.js, {defaultText: 'Beneficiary'}).on('change', onFeatureChange);
		self.ui('featureExpectedBehaviour', iris.path.ui.editableLabel.js, {defaultText: 'Expected behaviour'}).on('change', onFeatureChange);

		UIBtn.init(self.get());
	};

	self.awake = function() {
		episodeId = self.param('episodeId');
		featureId = self.param('featureId');
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
		self.destroyUIs('scenarios');

		if (!scenarioList || scenarioList.length === 0) {
			return;
		}

		scenarioList.forEach(function(scenario) {
			self.ui('scenarios', iris.path.ui.scenario.js, {episodeId: episodeId, featureId: featureId, scenario: scenario}, self.APPEND);
		});
	}

	function addScenario() {
		var scenarioDefault = {name: 'New scenario', steps: {given: [''], when: [''], then: ['']}};
		book.createScenario(episodeId, featureId, scenarioDefault, function(err, scenario) {
			self.ui('scenarios', iris.path.ui.scenario.js, {episodeId: episodeId, featureId: featureId, scenario: scenario}, self.APPEND);
			$("html, body").animate({ scrollTop: $(document).height()-$(window).height() });
		});
	}

	function onFeatureNameChange() {
		iris.notify('featureNameChange', {featureId: featureId, name: self.ui('featureName').text()});
		onFeatureChange();
	}

	function onFeatureChange() {
		var data = {
			name: self.ui('featureName').text(),
			description: {
				motivation: self.ui('featureMotivation').text(),
				beneficiary: self.ui('featureBeneficiary').text(),
				expectedBehaviour: self.ui('featureExpectedBehaviour').text()
			}
		};

		book.updateFeature(episodeId, featureId, data, function(err) {
			if (err) return console.error(err);
			console.log('Feature updated');
		});
	}

}, iris.path.screen.feature.js);
