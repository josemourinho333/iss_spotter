const request = require('request-promise-native');

const fetchMyIP = () => {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = (data) => {
  const ip = JSON.parse(data).ip
  return request(`https://api.ipbase.com/v2/info?ip=${ip}`);
}

const fetchISSFlyOverTimes = (coords) => {
  const parsedCoords = JSON.parse(coords);
  const coordinates = {
    latitude: `${parsedCoords.data.location.latitude}`,
    longitude: `${parsedCoords.data.location.longitude}`
  };

  return request(`https://iss-pass.herokuapp.com/json/?lat=${coordinates.latitude}&lon=${coordinates.longitude}`);
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then( (data) => {
      const { response } = JSON.parse(data);
      return response;
    });
}

module.exports = {
  nextISSTimesForMyLocation,
};