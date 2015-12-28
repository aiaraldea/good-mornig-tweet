"use strict";

var http = require('http');

exports.forecastRetriever = function () {
  var url = "http://aemetproxy-aiaraldea.rhcloud.com/AemetProxy/webresources/eguraldia/01002.json";
  var promise = new Promise(function (resolve, reject) {
    http.get(url, function (response) {
      var body = '';

      response.on('data', function (chunk) {
        body += chunk;
      });

      response.on('end', function () {
        try {
          let data = JSON.parse(body)
          resolve(data.days.day[0]);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', function (e) {
      reject(e);
    });;
    ;
  });
  return promise;
};