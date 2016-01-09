var expect = require("chai").expect;
var MessageComposer = require('../MessageComposer.js');

describe("Compose message", function() {

    var data = {
        "days": {
            "day": [{
                "day": "asteazkena 30",
                "maxTemperature": 14,
                "minTemperature": -1,
                "periods": {
                    "period": [{
                        "rain": 0,
                        "skyStatusCode": "12n",
                        "periodo": "18-24",
                        "temperature": 0,
                        "wind": {
                            "direction": "S",
                            "speed": 5
                        }
                    }, {
                        "rain": 0,
                        "skyStatusCode": "11",
                        "periodo": "12-18",
                        "temperature": 0,
                        "wind": {
                            "direction": "SO",
                            "speed": 10
                        }
                    }, {
                        "rain": 0,
                        "skyStatusCode": "12n",
                        "periodo": "00-06",
                        "temperature": 0,
                        "wind": {
                            "direction": "C",
                            "speed": 0
                        }
                    }, {
                        "rain": 0,
                        "skyStatusCode": "11",
                        "periodo": "06-12",
                        "temperature": 0,
                        "wind": {
                            "direction": "SO",
                            "speed": 5
                        }
                    }]
                }
            }, {
                "day": "osteguna 31",
                "maxTemperature": 11,
                "minTemperature": 3,
                "periods": {
                    "period": [{
                        "rain": 15,
                        "skyStatusCode": "14n",
                        "snow": 1500,
                        "periodo": "18-24",
                        "temperature": 0,
                        "wind": {
                            "direction": "C",
                            "speed": 0
                        }
                    }, {
                        "rain": 60,
                        "skyStatusCode": "46",
                        "snow": 1700,
                        "periodo": "12-18",
                        "temperature": 0,
                        "wind": {
                            "direction": "NO",
                            "speed": 10
                        }
                    }, {
                        "rain": 5,
                        "skyStatusCode": "13n",
                        "periodo": "00-06",
                        "temperature": 0,
                        "wind": {
                            "direction": "C",
                            "speed": 0
                        }
                    }, {
                        "rain": 35,
                        "skyStatusCode": "15",
                        "snow": 1800,
                        "periodo": "06-12",
                        "temperature": 0,
                        "wind": {
                            "direction": "C",
                            "speed": 0
                        }
                    }]
                }
            }, {
                "day": "ostirala 1",
                "maxTemperature": 11,
                "minTemperature": 3,
                "periods": {
                    "period": [{
                        "rain": 55,
                        "skyStatusCode": "44",
                        "snow": 1900,
                        "periodo": "12-24",
                        "temperature": 0,
                        "wind": {
                            "direction": "SO",
                            "speed": 20
                        }
                    }, {
                        "rain": 10,
                        "skyStatusCode": "14",
                        "snow": 1600,
                        "periodo": "00-12",
                        "temperature": 0,
                        "wind": {
                            "direction": "SO",
                            "speed": 20
                        }
                    }]
                }
            }, {
                "day": "larunbata 2",
                "maxTemperature": 8,
                "minTemperature": 0,
                "periods": {
                    "period": [{
                        "rain": 20,
                        "skyStatusCode": "13",
                        "snow": 1200,
                        "periodo": "12-24",
                        "temperature": 0,
                        "wind": {
                            "direction": "NO",
                            "speed": 20
                        }
                    }, {
                        "rain": 65,
                        "skyStatusCode": "43",
                        "snow": 1600,
                        "periodo": "00-12",
                        "temperature": 0,
                        "wind": {
                            "direction": "NO",
                            "speed": 20
                        }
                    }]
                }
            }, {
                "day": "igandea 3",
                "maxTemperature": 10,
                "minTemperature": 0,
                "periods": {
                    "period": [{
                        "rain": 80,
                        "skyStatusCode": "45",
                        "snow": 1400,
                        "periodo": "00-24",
                        "temperature": 0,
                        "wind": {
                            "direction": "SO",
                            "speed": 20
                        }
                    }]
                }
            }, {
                "day": "astelehena 4",
                "maxTemperature": 12,
                "minTemperature": 8,
                "periods": {
                    "period": [{
                        "rain": 85,
                        "skyStatusCode": "25",
                        "snow": 2000,
                        "periodo": "00-24",
                        "temperature": 0,
                        "wind": {
                            "direction": "O",
                            "speed": 20
                        }
                    }]
                }
            }, {
                "day": "asteartea 5",
                "maxTemperature": 10,
                "minTemperature": 3,
                "periods": {
                    "period": [{
                        "rain": 80,
                        "skyStatusCode": "23",
                        "snow": 1500,
                        "periodo": "00-24",
                        "temperature": 0,
                        "wind": {
                            "direction": "NO",
                            "speed": 40
                        }
                    }]
                }
            }]
        },
        "province": "Teruel",
        "town": "Calamocha"
    };
    describe("Compose message", function() {
        it("basic message", function() {
            expect("A").to.equal("A");
        });
    });
    describe("fail message", function() {
        it("basic message", function() {
            expect("A").to.equal("B");
        });
    });
});