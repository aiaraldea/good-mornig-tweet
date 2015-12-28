"use strict";

var http = require('http');
var assert = require('assert');

module.exports = function(town, key) {
  var url = `http://api.openweathermap.org/data/2.5/weather?q=${town},uk&appid=${key}&units=metric`;
  var promise = new Promise(function (resolve, reject) {
    http.get(url, function (res) {
      res.on('data', function (chunk) {
        // TODO reject on fail
        try {
//      console.log(chunk);
          let weather = JSON.parse(chunk);
          assert.ok(Number.isFinite(weather.main.temp));
          resolve(weather.main.temp);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', function (e) {
      reject(e);
    });
  });
  return promise;
};