iris.ui(function (self) {
	"use strict";

	var book = iris.resource(iris.path.resource.book.js);

	self.create = function() {
		self.tmpl(iris.path.ui.scenario.html);

		//window.materialadmin.App.initialize();
		UICard.init(self.get());
		//UIForm.init(self.get());

		self.get('btnClose').on('click', onBtnCloseClick);

		loadScenario(self.setting('scenario'));
		self.get().hide().fadeIn();
	};

	function loadScenario(scenario) {
		iris.log('Load scenario', scenario);
		self.inflate({scenario: scenario});

		var stepNames = ['Given', 'When', 'Then'];
		stepNames.forEach(function(stepName) {
			var steps = scenario.steps[stepName.toLowerCase()];
			if (steps && steps.length > 0) {
				for (var f=0; f < steps.length; f++) {
					createStep(stepName.toLowerCase(), (f === 0) ? stepName : 'And', steps[f]);
				}
			}
		});

		data();

		UIForm.init(self.get()); // position of floating labels TODO move to step UI
	}

	function onNewStep(stepUi) {
		var newStepUi = createStep(stepUi.setting('stepName'), 'And');
		newStepUi.get().detach().appendTo(stepUi.get());
		newStepUi.focus();
	}

	function createStep(stepName, label, val) {
		var stepUi = self.ui('steps', iris.path.ui.step.js, {
			stepName: stepName,
			label: label,
			value: val
		}, self.APPEND);

		stepUi.on('newStep', onNewStep);
		stepUi.on('stepChange', onStepChange);

		UIForm.init(self.get()); // position of floating labels TODO move to step UI

		return stepUi;
	}

	function data() {
		var result = {steps: {given: [], when: [], then: []}};
		var stepUis = self.ui('steps');
		if (stepUis && stepUis.length > 0) {
			stepUis.forEach(function(stepUi) {
				result.steps[stepUi.data().stepName].push(stepUi.data().value);
			});
		}
		return result;
	}

	function onStepChange() {
		self.get('infoSaved').toggleClass('hidden', true);
		self.get('infoSaving').toggleClass('hidden', false).fadeIn();

		var episodeId = self.setting('episodeId');
		var featureId = self.setting('featureId');
		var scenarioId = self.setting('scenario').id;
		book.updateScenario(episodeId, featureId, scenarioId, data(), function(err, result) {
			if (err) return alert(err);
			self.get('infoSaving').toggleClass('hidden', true);
			self.get('infoSaved').toggleClass('hidden', false).fadeIn();
		});
	}

	function onBtnCloseClick() {
		self.get().fadeOut(function () {
			self.destroyUI();

			toastr.clear();

			toastr.options.closeButton = false;
			toastr.options.progressBar = false;
			toastr.options.debug = false;
			toastr.options.positionClass = 'toast-top-full-width';
			toastr.options.showDuration = 333;
			toastr.options.hideDuration = 333;
			toastr.options.timeOut = 0;
			toastr.options.extendedTimeOut = 1000;
			toastr.options.showEasing = 'swing';
			toastr.options.hideEasing = 'swing';
			toastr.options.showMethod = 'slideDown';
			toastr.options.hideMethod = 'slideUp';

			var message = 'Scenario removed. <button type="button" id="okBtn" class="btn btn-flat btn-success toastr-action">Undo</button>';

			toastr.info(message, '');
		});
	}

}, iris.path.ui.scenario.js);
