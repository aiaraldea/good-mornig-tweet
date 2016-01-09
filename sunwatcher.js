var EventEmitter = require('events').EventEmitter;
var SunCalc = require('suncalc');
var util = require('util');

function Sunwatcher(config) {
    this._config = config;
}

module.exports = function (latitude, longitude) {
    var config = {
        latitude: latitude,
        longitude: longitude
    };

    return new Sunwatcher(config);
};

util.inherits(Sunwatcher, EventEmitter);

/**
 * Starts watching the current time and the time of sunset/sunrise. While the sun is setting
 * an event is emitted with the calculated brightness.
 *
 * The brightness is the inverted value of the remaining time until sunset, adjusted for the
 * maximum amount of brightness that is given.
 *
 */
Sunwatcher.prototype.startSunWatch = function () {
    var self = this;
    var sunPosition = getSunPosition(self._config.latitude, self._config.longitude);

    setInterval(function () {
        var now = new Date();
        console.log(now);

        var difference = getDifferenceBetweenNowAndSunType('nightEnd', now, sunPosition);
        if (difference <= -(24 * 60 - 5) * 60 * 1000) {
            // If we are comparing to yesterdays date update it.
            console.log('Recalculate sun positions %j', sunPosition);
            sunPosition = getSunPosition(self._config.latitude, self._config.longitude);
            console.log('Recalculate sun positions %j', sunPosition);
        }

        if (isSunBetween('dawn', 'sunrise', now, sunPosition)) {
            console.log("emit dawn");
            self.emit("dawn", now, sunPosition.sunriseEnd, sunPosition.sunsetStart);
        }
    }, 20000); // Runs every 20 seconds
};

/**
 * Returns the times of the positions of the sun.
 *
 * @returns {*}
 */
function getSunPosition(latitude, longitude) {
    return SunCalc.getTimes(
        new Date(),
        latitude,
        longitude
    );
}

/**
 * Calculates if the sun is between 2 positions
 *
 * @param fromType
 * @param toType
 * @param now
 * @param sunPositions
 *
 * @returns {boolean}
 */
function isSunBetween(fromType, toType, now, sunPositions) {
    return (
        getDifferenceBetweenNowAndSunType(fromType, now, sunPositions) <= 0 &&
        getDifferenceBetweenNowAndSunType(toType, now, sunPositions) >= 0
    );
}

/**
 * Gets the difference (in ms) between now and the given type of sun event.
 *
 * @param type
 * @param now
 * @param sunPositions
 *
 * @returns {number}
 */
function getDifferenceBetweenNowAndSunType(type, now, sunPositions) {
    return sunPositions[type].getTime() - now.getTime();
}
