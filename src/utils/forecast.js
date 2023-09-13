const request = require('request')

//const url = 'http://api.weatherstack.com/current?access_key=9f503aafc674a10b42ba77077aca37e4&query=37.8267,-122.4233&units=f'

const forecast = (latitute,longitute,callback) => {
const url = 'http://api.weatherstack.com/current?access_key=9f503aafc674a10b42ba77077aca37e4&query=' + latitute +',' + longitute + '&units=f'

request({ url, json: true},(error,{body})=>
// request({ url: url, json: true }, (error, response) => {
 {

    if(error){
        callback('Unable to connect to the weather services!!', undefined)

    }else if(body.error){
        // else if(response.body.error){
        callback('Unable to find location', undefined)

    }else{
        // callback(undefined, response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' out. It feels like ' + response.body.current.feelslike + ' degree out.')
        callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' out. It feels like ' + body.current.feelslike + ' degree out.')

    }
})
}

module.exports = forecast