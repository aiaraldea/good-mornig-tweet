"use strict";

var http = require('http');
var assert = require('assert');

exports.currentTempteratureRetriever = function () {
  var url = "http://api.openweathermap.org/data/2.5/weather?q=Amurrio,uk&appid=2de143494c0b295cca9337e1e96b00e0&units=metric";
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