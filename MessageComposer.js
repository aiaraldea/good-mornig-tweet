"use strict";

var MessageComposer = function(townName, forecastUrl) {
    this.townName = townName;
    this.forecastUrl = forecastUrl;
};
MessageComposer.prototype.compose = function(currentTemperature, forecast) {
    var getTodayMax = function(forecast) {
        return forecast.maxTemperature;
    }

    let maximunTemperature = getTodayMax(forecast);
    let roundedTemperature = Math.round(currentTemperature * 10) / 10;
    return `Egunon Aiaraldea. Orain ${this.townName}n ${roundedTemperature}ºC dago. Gaurko maximoa ${maximunTemperature}ºC. Iragarpen osoa: ${this.forecastUrl}`;
};
module.exports = function(townName, forecastUrl) {
    return new MessageComposer(townName, forecastUrl);
};
