iris.ui(function (self) {
	"use strict";

	self.events('newStep', 'stepChange');

	self.settings({
		label: 'label',
		value: '',
		stepName: ''
	});

	self.create = function() {
		self.tmpl(iris.path.ui.step.html);

		self.get('input').val(self.setting('value')).on('keyup', onKeyUp).on('blur', onBlur).on('change', onChange);
		self.get('label').text(self.setting('label'));

	};

	self.data = function() {
		return {stepName: self.setting('stepName'), value: self.get('input').val()};
	};

	self.focus = function() {
		self.get('input').focus();
		return self;
	};

	function onKeyUp(e) {
		if (e.keyCode === 13 && self.get('input').val() !== '') {
			self.notify('newStep', self);
		}
	}

	function onBlur() {
		if (self.get('label').text() === 'And' && self.get('input').val() === '') {
			self.destroyUI();
		}
	}

	function onChange() {
		self.notify('stepChange', self);
	}

}, iris.path.ui.step.js);
