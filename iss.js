const request = require("request");

const fetchMyIP = function(callback) { 
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', (error, response, data) => {
    // error checking if invalid domain, user is offline, etc
    if (error) {
      callback(error, null);
      return;
    }

    // checking for status code
    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching IP. Response: ${data}`;
      callback(Error(msg), null);
      return;
    }

    // happy path
    const ipAddress = JSON.parse(data).ip;
    callback(null, ipAddress);
  });
}

const fetchCoordsByIP = (ip, callback) => {
  // https://freegeoip.app/json/
  request(`https://api.ipbase.com/v2/info?ip=${ip}`, (error, response, data) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching Coords. Response: ${data}`;
      callback(Error(msg), null);
      return;
    }

    // const { latitude, longitude } = JSON.parse(body);
    const parsedData = JSON.parse(data);
    const coords = {
      latitude: `${parsedData.data.location.latitude}`,
      longitude: `${parsedData.data.location.longitude}`
    };
    callback(null, coords);

  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  const lat = coords.latitude;
  const lon = coords.longitude;
  request(`https://iss-pass.herokuapp.com/json/?lat=${lat}&lon=${lon}`, (error, response, data) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching flyover. Response: ${data}`;
      callback(Error(msg), null);
      return;
    }

    const flyoverTimes = JSON.parse(data).response;
    callback(null, flyoverTimes);
  });
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    return fetchCoordsByIP(ip, (error, location) => {
      if (error) {
        return callback(error, null);
      }

      return fetchISSFlyOverTimes(location, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      })
    })
  })
};
 
module.exports = { 
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation,
};