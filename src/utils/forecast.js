const request = require('request')

const forecast = ((lat, lon, callback) => {
    // console.log(lat, lon)
    const url = "http://api.weatherstack.com/current?access_key=e8614c78a18fe0a7b46dc1f97dd4bd1c&query=" + lon + "," + lat
    // http://api.weatherstack.com/current?access_key=e8614c78a18fe0a7b46dc1f97dd4bd1c&query=28.613895,77.209006&units=f

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to Internet')
        }
        else if (body.error) {
            callback("No loction available")
        }
        else {
            callback(undefined, {
                current_temp: body.current.temperature,
                feels_like: body.current.feelslike,
                location: body.location.name + "," + body.location.country
            })
        }
    })
})

module.exports = forecast