"use strict";

exports.messageComposer = function(currentTemperature, forecast) {

    var getTodayMax = function(forecast) {
        return forecast.maxTemperature;
    }

    let maximunTemperature = getTodayMax(forecast);
    let roundedTemperature = Math.round(currentTemperature * 10) / 10;
    let forecastUrl = "http://www.aiaraldea.eus/eguraldia/Amurrio?utm_source=eguraldia&utm_medium=txio&utm_campaign=eguraldia";
    return `Egunon Aiaraldea. Orain Amurrion ${roundedTemperature}ºC dago. Gaurko maximoa ${maximunTemperature}ºC. Iragarpen osoa: ${forecastUrl}`;

};
