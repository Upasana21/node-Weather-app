// const chalk = require('chalk');
const request = require('postman-request');

// using callback fn to call it mulitple times anywhere in the program

const geoCode = (address, callback) => {
    const geolocationURL = `https://api.positionstack.com/v1/forward?access_key=98349dc30916f9cafaf004004f6b1302&query=${address}`;
    request(geolocationURL, (error, {body}) => {//destrucring response=> body:response.body as {body} only
        if (error) {
            // console.log('An Unknown error occured !!!');
            callback('An Unknown error occured !!!', undefined)
        } else if (JSON.parse(body).error) {
            // console.log(JSON.parse(body).error.message);
            callback('Unable to find location.Try another search!!!.', undefined)
        } else {
            const data = JSON.parse(body).data[0]
            // console.log(data);
            const geoData={
                latitude:data.latitude,
                longitude:data.longitude,
                locality:data.locality
            }
            callback(undefined,geoData)
            // console.log(data.latitude, data.longitude)
        }
    })
}

module.exports=geoCode;