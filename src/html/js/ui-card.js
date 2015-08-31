(function($) {
  "use strict";

  var AppCard = function() {};
  var p = AppCard.prototype;

  // =========================================================================
  // INIT
  // =========================================================================

  p.init = function($ctx) {
    var self = this;
    $ctx.find('.card-head .tools .btn-collapse').on('click', function (e) {
      self._handleCardCollapse(e);
    });
    //$ctx.find('.card-head .tools .btn-close').on('click', function (e) {
    //  self._handleCardClose(e);
    //});
  };

  p._handleCardCollapse = function (e) {
    var card = $(e.currentTarget).closest('.card');
    this.toggleCardCollapse(card);
  };

  //p._handleCardClose = function (e) {
  //  var card = $(e.currentTarget).closest('.card');
  //  this.removeCard(card);
  //};

  // =========================================================================
  // CARD LOADER
  // =========================================================================

  p.addCardLoader = function (card) {
    var container = $('<div class="card-loader"></div>').appendTo(card);
    container.hide().fadeIn();
    var opts = {
      lines: 17, // The number of lines to draw
      length: 0, // The length of each line
      width: 3, // The line thickness
      radius: 6, // The radius of the inner circle
      corners: 1, // Corner roundness (0..1)
      rotate: 13, // The rotation offset
      direction: 1, // 1: clockwise, -1: counterclockwise
      color: '#000', // #rgb or #rrggbb or array of colors
      speed: 2, // Rounds per second
      trail: 76, // Afterglow percentage
      shadow: false, // Whether to render a shadow
      hwaccel: false, // Whether to use hardware acceleration
      className: 'spinner', // The CSS class to assign to the spinner
      zIndex: 2e9 // The z-index (defaults to 2000000000)
    };
    var spinner = new Spinner(opts).spin(container.get(0));
    card.data('card-spinner', spinner);
  };

  p.removeCardLoader = function (card) {
    var spinner = card.data('card-spinner');
    var loader = card.find('.card-loader');
    loader.fadeOut(function () {
      spinner.stop();
      loader.remove();
    });
  };

  // =========================================================================
  // CARD COLLAPSE
  // =========================================================================

  p.toggleCardCollapse = function (card, duration) {
    duration = typeof duration !== 'undefined' ? duration : 400;
    var dispatched = false;
    card.find('.nano').slideToggle(duration);
    card.find('.card-body').slideToggle(duration, function () {
      if (dispatched === false) {
        $('#COLLAPSER').triggerHandler('card.bb.collapse', [!$(this).is(":visible")]);
        dispatched = true;
      }
    });
    card.toggleClass('card-collapsed');
  };

  // =========================================================================
  // CARD REMOVE
  // =========================================================================

  p.removeCard = function (card) {
    card.fadeOut(function () {
      card.remove();
    });
  };

  // =========================================================================
  // DEFINE NAMESPACE
  // =========================================================================

  window.UICard = new AppCard;
}(jQuery)); // pass in (jQuery):
