const request = require('request')

const geocode = ((location, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + location + '.json?access_token=pk.eyJ1IjoiYWJoaW5hdjE3IiwiYSI6ImNsMnI1MmY5bjJ2a2kzbm83bWZ0bjVxMTgifQ.AALXX4d8yED7p0oRI6xWfg&limit=1'

    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback({ Error: 'Unable to connect to Internet' })
        }
        else if (body.features.length === 0) {
            callback({ Error: "Give proper location" })
        }
        else {
            // console.log(" Latitude: " + body.features[0].center[1] + " Longitude: " + body.features[0].center[0])
            data = {
                long: body.features[0].center[1],
                lat: body.features[0].center[0],
                location: body.features[0].place_name
            }
            callback(undefined, data)
        }

    })

})

module.exports = geocode