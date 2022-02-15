const request=require('request')

const geoCode = (address, callback) => {
  const addressCode = encodeURIComponent(address);
  const geoCodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${addressCode}.json?access_token=pk.eyJ1IjoiZ2F1cmF2MjExMDAiLCJhIjoiY2t3OHo0cnN0Mjg1NjJvcDYzeHQxYWJpNSJ9.4om7HBk6jFKM9kypfaf31w&limit=5`;

  request({ url: geoCodeUrl, json: true }, (error, response) => {
    if (error) {
      callback("error in network connection, cant connect", undefined);
    } else if (response.body.features.length === 0) {
      callback("cant find location, try again with new location", undefined);
    } else {
      callback(undefined, {
        lat: response.body.features[0].center[1],
        lng: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports=geoCode