"use strict";

var Sunwatcher = require('./sunwatcher');

var weatherTweet = weatherTweet || {};
weatherTweet.config = require('./config.json');
weatherTweet.tweetSender = require('./TweetSender.js')(weatherTweet.config.twitter);
weatherTweet.currentTemperatureRetriever = require('./CurrentTemperatureRetriever.js');
weatherTweet.forecastRetriver = require('./ForecastRetriever.js').forecastRetriever;
weatherTweet.MessageComposer = require('./MessageComposer.js');

weatherTweet.messageComposer = weatherTweet.MessageComposer(weatherTweet.config.town, weatherTweet.config.forecastUrl);

console.log("Config %j", weatherTweet.config);
try {
  // var fs = require('fs');
  // var fd = fs.openSync('app.log', 'a');
  // require('daemon')({
  //   stdout: fd,
  //   stderr: fd
  // });
}
catch (err) {
  console.error(err);
}

weatherTweet.sendGoodMorning = function() {
  let forecastPromise = weatherTweet.forecastRetriver();
  let temperaturePromise = weatherTweet.currentTemperatureRetriever(
    weatherTweet.config.town,
    weatherTweet.config.openweathermapKey);
  Promise.all([temperaturePromise, forecastPromise]).then(function(values) {
    console.log("%j", values[1]);
    let message = weatherTweet.messageComposer.compose(values[0], values[1]);
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


  sunwatcher.on("dawn", function(now, dawn, sunrise) {
    if (now - weatherTweet.lastEventDate < 7200000) {
      console.log('discarding event %j %j %j', now);
      // The event has been already processed in the last 2 hours.
      return;
    }
    weatherTweet.lastEventDate = now;
    console.log('dawn!! %j %j %j', now, dawn, sunrise);
    weatherTweet.sendGoodMorning();
  });
};
weatherTweet.subscribe();
// weatherTweet.sendGoodMorning();


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
