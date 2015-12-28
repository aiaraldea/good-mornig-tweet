"use strict";

var Sunwatcher = require('sunwatcher');

var weatherTweet = weatherTweet || {};
weatherTweet.config = require('./config.json');
weatherTweet.tweetSender = require('./TweetSender.js')(weatherTweet.config.twitter);
weatherTweet.currentTempteratureRetriever = require('./CurrentTemperatureRetriever.js').currentTempteratureRetriever;
weatherTweet.forecastRetriver = require('./ForecastRetriever.js').forecastRetriever;
weatherTweet.messageComposer = require('./MessageComposer.js').messageComposer;

console.log("Config %j", weatherTweet.config);
try {
  // var fs = require('fs');
  // var fd = fs.openSync('app.log', 'a');
  // require('daemon')({
  //   stdout: fd
  // });
}
catch (err) {
  console.error(err);
}

weatherTweet.sendGoodMorning = function() {
  let forecastPromise = weatherTweet.forecastRetriver();
  let temperaturePromise = weatherTweet.currentTempteratureRetriever();
  Promise.all([temperaturePromise, forecastPromise]).then(function(values) {
    console.log("%j", values[1]);
    let message = weatherTweet.messageComposer(values[0], values[1]);
    console.log(message);
    weatherTweet.tweetSender.send(message, weatherTweet.config.photo);
  }, function(err) {
    console.error(err);
  })
};

weatherTweet.subscribe = function() {
  var sunwatcher = new Sunwatcher(
    weatherTweet.config.position.lat, weatherTweet.config.position.long
  );
  sunwatcher.startSunWatch();


  sunwatcher.on("sunrise", function(now, sunrise, sunriseEnd) {
    if (now - weatherTweet.lastEventDate < 120000) {
      console.log('discarding event %j %j %j', now);
      // The event has been already processed in the last 2 hours.
      return;
    }
    weatherTweet.lastEventDate = now;
    console.log('sunrise!! %j %j %j', now, sunrise, sunriseEnd);
    weatherTweet.sendGoodMorning();
  });
};
//weatherTweet.subscribe();
weatherTweet.sendGoodMorning();

/**
 * Keep the script alive
 */
setInterval(function() {
  console.log("still alive");
}, 86400000);

/*
 * Schedule for sunrise or dawn
 * Get current temperature
 * Get maximun temperature
 * Maybe get something interesting forecast (rain, snow, wind)
 * Get the last image
 * Build the tweet text
 * Publish the tweet
 */

/*
 * Some other things:
 * Publish last photo to a remote file.
 * Create a time-lapse and upload to remote file.
 */
