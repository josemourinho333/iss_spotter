const { nextISSTimesForMyLocation } = require('./iss_promised');

nextISSTimesForMyLocation()
  .then((passTimes) => {
    passTimes.forEach((time) => {
      const date = new Date(0);
      date.setUTCSeconds(time.risetime);
      console.log(`Next pass at ${date} for ${time.duration} seconds`);
    });
  })
  .catch((error) => {
    console.log('ERROR: ', error.message);
  });