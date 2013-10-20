$(function() {

  var iconMap = {
    'lol': 'github',
    'news': 'globe',
    'gossip': 'camera',
    'weather': 'cloud'
  };

  var which = 'watercooler';

  $('#choices .button').click(function(e) {
    which = e.target.id;
    $('.dimmer').removeClass('inactive').addClass('active');

    // slide the arrow the right place
    var $button = $('#' + which);
    var left = $button.offset().left - $('#speech-bubble').offset().left
    var bw = $button.css('width');
    var width = parseInt(bw.substr(0, bw.length - 2), 10);
    var newpos = left - 40 + width / 2;

    $('#triangle').animate({ 'margin-left': newpos + 'px' });

    var promise = $.getJSON('/smalltalk', {
      level: which
    });

    promise.done(function(data) {
      $('#speech-bubble .content').empty().html(data.text);
      $('#speech-bubble i').removeClass()
        .addClass('icon').addClass(iconMap[data.topic]);
      $('.dimmer').removeClass('active').addClass('inactive');
      var $t = $('#triangle');
      if ($t.hasClass('gone')) {
        $t.removeClass('gone');
        $t.animate({ 'margin-top': '-24px' });
      }

    });
  });

  $(window).resize(function() {
    var $button = $('#' + which);
    var left = $button.offset().left - $('#speech-bubble').offset().left
    var bw = $button.css('width');
    var width = parseInt(bw.substr(0, bw.length - 2), 10);
    var newpos = left - 40 + width / 2;
    $('#triangle').css({ 'margin-left': newpos + 'px' });
  });

});
