iris.ui(function (self) {
	"use strict";

	self.events('change');

	self.settings({
		defaultText: '<value>',
		class: ''
	});

	self.create = function() {
		self.tmpl(iris.path.ui.editableLabel.html);

		self.get().on('keypress', onKeyPress).
				on('change', onChange).
				on('mouseup', onMouseUp).
				on('click', onClick).
				addClass(self.setting('class'));
	};

	self.text = function(text) {
		if (text !== undefined) {
			self.get().val(text);
			checkDefaultText();
			resizeInput();
		} else {
			return self.get().val();
		}
		return self;
	};

	function onClick(e) {
		e.stopPropagation();
	}

	function onKeyPress(e) {
		var text = this.value + String.fromCharCode(e.keyCode);
		var $text = $('<span>').text(text).addClass(self.setting('class')).appendTo(this.parentNode);
		this.style.width = $text.outerWidth() + 'px';
		$text.remove();

		if (e.keyCode === 13) {
			this.blur();
		}
	}

	function onChange() {
		self.get().val( $.trim(self.get().val()) );
		checkDefaultText();
		resizeInput();

		self.notify('change');
	}

	function checkDefaultText() {
		var defaultVal = self.get().val() === '' || self.get().val() === self.setting('defaultText');
		if (defaultVal) {
			self.get().val(self.setting('defaultText'));
		}
		self.get().toggleClass('defaultVal', defaultVal);
	}

	function resizeInput() {
		var text = self.get().val();
		var $text = $('<span>').text(text).addClass(self.setting('class')).appendTo(self.get().parent());
		self.get().css('width', $text.outerWidth() + 'px');
		$text.remove();
	}

	function onMouseUp(e) {
		e.stopPropagation();
		$(this).select();
	}

}, iris.path.ui.editableLabel.js);
