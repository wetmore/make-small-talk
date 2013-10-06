var request = require('request')
  , Parser = require('feedparser')
  , _ = require('underscore');

// keys
var wunderkey = '42c3ee410f744198'
  , alchemykey = 'b2eb68b44445316ffd00617bbb4e2186d39d5170';

var alchemyUrl = 'http://access.alchemyapi.com/calls/text/TextGetRelations';

function getInane(res) {
  var summaries = [];
  Parser.parseUrl('http://www.tmz.com/rss.xml').on('article', function(obj) {
    var rawSummary = obj.summary;
    var splitSummary = rawSummary.split('&hellip;');
    var summary = splitSummary[0];
    summaries.push(summary.substr(0, summary.lastIndexOf('.') + 1));
  })
  .on('end', function() {
    request({
      url: alchemyUrl,
      json: true,
      qs: {
        text: _.sample(summaries),
        apikey: alchemykey,
        maxRetrieve: 1,
        outputMode: 'json',
        requireEntities: 1
      }
    }, function(error, response, body) {
      if (body.relations.length > 0) {
        var r = body.relations[0];
        var text = r.subject.text + ' ' + r.action.text + ' ' + r.object.text;
        res.json({
          subject: 'gossip',
          text: text
        });
      } else {
        res.json({
          subject: 'lol',
          text: 'I can\'t do this anymore'
        });
      }
    });
  });
}

function getWatercooler(res) {
  var rand = 1// Math.random();
  if (rand === 0) {
    // weather
    // make the wunderground api request
    var url = 'http://api.wunderground.com/api/' + 
              wunderkey +
              '/forecast/q/MA/Boston.json';
    request({ url: url, json: true },  function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var forecast = _.sample(body.forecast.simpleforecast.forecastday);
        res.json({
          topic: 'weather',
          text: 'on ' + forecast.date.weekday + ' it will be ' + forecast.conditions
        });
      }
    });
  } else {
    // news
    //
  }
}

function getPseudo(res) {
  
}

/*
 * GET some smalltalk
 */

exports.generate = function(req, res) {
  switch (req.query.level) {
    case 'inane': 
      getInane(res);
      break;
    case 'watercooler':
      getWatercooler(res);
      break;
    case 'pseudo':
      getPseudo(res);
      break;
  }

  // return the json yo
};