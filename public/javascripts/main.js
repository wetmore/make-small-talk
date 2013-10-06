$(function() {
  
  var map = {
    'inane': 141,
    'watercooler': 531,
    'pseudo': 925
  };

  var iconMap = {
    'lol': 'github',
    'news': 'globe',
    'gossip': 'camera',
    'weather': 'cloud'
  };

  $('#choices .button').click(function(e) {
    var which = e.target.id;
    $('.dimmer').removeClass('inactive').addClass('active');
    $('#triangle').animate({ 'margin-left': map[which] + 'px' });

    var promise = $.getJSON('/smalltalk', {
      level: which
    });

    promise.done(function(data) {
      $('#speech-bubble .content').empty().html(data.text);
      console.log(data);
      $('#speech-bubble i').removeClass()
        .addClass('icon').addClass(iconMap[data.topic]);
      $('.dimmer').removeClass('active').addClass('inactive');

    });
  });

});
