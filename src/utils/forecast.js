// const chalk = require('chalk');
const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=b90da18b46db73c36b0e9b3eba72d498&query=${latitude},${longitude}`;

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('An Unknown error occured !!!',undefined)
        } else if (body.error) {
            callback(body.error.type,undefined)
        } else {
            const data = body.current
            // callback(undefined,chalk.blue.inverse(`It is currently ${data.temperature} degrees out in ${body.location.country}. And weather is ${data.weather_descriptions}.`))
            callback(undefined,`It is currently ${data.temperature} degrees out in ${body.location.country}. And weather is ${data.weather_descriptions}.`)
        }
    })
}

module.exports = forecast;