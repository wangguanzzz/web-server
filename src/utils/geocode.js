const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoid2FuZ2d1YW56enoiLCJhIjoiY2tsNGxrdzVrMXlxdDJvbXM2aWtwb2M3MiJ9.xjUfd-BCLYf6j5blImYDgQ&limit=1'
    request({ url, json: true }, (err, {body:result}={}) => {
        if (err) {
            callback('cannot connect to geocode website', undefined)
        } else if (result.features.length === 0) {
            callback('geocode query is wrong', undefined)
        } else {
            callback(undefined, {
                latitude: result.features[0].center[1],
                longtitude: result.features[0].center[0],
                location: result.features[0].place_name
            })
        }
    })
}
module.exports = geocode