const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    console.log('error', error);
    return;
  }

  passTimes
    .forEach( (time) => {
      const date = new Date(0);
      date.setUTCSeconds(time.risetime);
      console.log(`Next pass at ${date} for ${time.duration} seconds`);
    });
});