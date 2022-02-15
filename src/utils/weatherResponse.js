const request = require("request");

const weatherForcast = (lat, lng, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=8027ee97318a45c4593b23bf30666e1b&query=${lat},${lng}`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("error in network connection, cant connect", undefined);
    } else if (response.body.error) {
      callback("location and weather not found", undefined);
    } else {
      const data = response.body.current;
      callback(
        undefined,
        `It is ${data.temperature} °C and ${data.weather_descriptions[0]} out there with ${data.precip}% rain and ${data.humidity}% humidity `
      );
    }
  });
};

module.exports=weatherForcast