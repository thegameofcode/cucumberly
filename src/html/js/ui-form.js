(function($) {
  "use strict";

  var AppForm = function() {};
  var p = AppForm.prototype;

  // =========================================================================
  // INIT
  // =========================================================================

  p.init = function($ctx) {
    // Init events
    this._enableEvents($ctx);

    this._initRadioAndCheckbox($ctx);
    this._initFloatingLabels($ctx);
    this._initValidation($ctx);
  };

  // =========================================================================
  // EVENTS
  // =========================================================================

  // events
  p._enableEvents = function ($ctx) {
    // Link submit function
    $ctx.find('[data-submit="form"]').on('click', function (e) {
      e.preventDefault();
      var formId = $(e.currentTarget).attr('href');
      $(formId).submit();
    });

    // Init textarea autosize
    $ctx.find('textarea.autosize').on('focus', function () {
      $(this).autosize({append: ''});
    });
  };

  // =========================================================================
  // RADIO AND CHECKBOX LISTENERS
  // =========================================================================

  p._initRadioAndCheckbox = function ($ctx) {
    // Add a span class the styled checkboxes and radio buttons for correct styling
    $ctx.find('.checkbox-styled input, .radio-styled input').each(function () {
      if ($(this).next('span').length === 0) {
        $(this).after('<span></span>');
      }
    });
  };

  // =========================================================================
  // FLOATING LABELS
  // =========================================================================

  p._initFloatingLabels = function ($ctx) {

    $ctx.find('.floating-label .form-control').on('keyup change', function (e) {
      var input = $(e.currentTarget);

      if ($.trim(input.val()) !== '') {
        input.addClass('dirty').removeClass('static');
      } else {
        input.removeClass('dirty').removeClass('static');
      }
    });

    $ctx.find('.floating-label .form-control').each(function () {
      var input = $(this);

      if ($.trim(input.val()) !== '') {
        input.addClass('static').addClass('dirty');
      }
    });

    $ctx.find('.form-horizontal .form-control').each(function () {
      $(this).after('<div class="form-control-line"></div>');
    });
  };

  // =========================================================================
  // VALIDATION
  // =========================================================================

  p._initValidation = function ($ctx) {
    if (!$.isFunction($.fn.validate)) {
      return;
    }
    $.validator.setDefaults({
      highlight: function (element) {
        $(element).closest('.form-group').addClass('has-error');
      },
      unhighlight: function (element) {
        $(element).closest('.form-group').removeClass('has-error');
      },
      errorElement: 'span',
      errorClass: 'help-block',
      errorPlacement: function (error, element) {
        if (element.parent('.input-group').length) {
          error.insertAfter(element.parent());
        }
        else if (element.parent('label').length) {
          error.insertAfter(element.parent());
        }
        else {
          error.insertAfter(element);
        }
      }
    });

    $ctx.find('.form-validate').each(function () {
      var validator = $(this).validate();
      $(this).data('validator', validator);
    });
  };

  // =========================================================================
  // DEFINE NAMESPACE
  // =========================================================================

  window.UIForm = new AppForm;
}(jQuery)); // pass in (jQuery):
