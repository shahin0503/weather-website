const request = require('request')


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2hhaGluMDUwMyIsImEiOiJjbG1idTk1bTgxYXpsM3BvNTdidm5tcWNpIn0.shrV6TYBVZU6HqRhPn47Eg&limit=1'

    // request({ url: url, json: true }, (error, response) => {
        request({ url, json: true }, (error, {body}) => {

        if (error) {
            callback('Unable to connect to location services!', undefined)

        } else if (body.features.length === 0) {
            // else if (response.body.features.length === 0) {
            callback('Unable to find location. try another search', undefined)
        }else{
            callback(undefined, {
                latitute: body.features[0].center[1],
                longitute: body.features[0].center[0],
                location: body.features[0].place_name
                // latitute: response.body.features[0].center[1],
                // longitute: response.body.features[0].center[0],
                // location: response.body.features[0].place_name
            })
        }
    })

}

module.exports = geocode