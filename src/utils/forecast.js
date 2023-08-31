const request = require('request');

const forecast = (lat,long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=3fae2484beb64256eb7e8daddb5c3ce3&query=' + lat + ',' + long+ '&units=f';
    request({url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        }
        else if (body.error) {
            callback('Unable to find location', undefined);
        }
        else {
            callback(undefined, {
                weather:body.current.weather_descriptions[0],
                temp: body.current.temperature,
                feelslike:body.current.feelslike
            });
        }

    })
}

module.exports = forecast;