const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log('it did not work', error);
//     return;
//   }

//   console.log('it worked', ip);
// });

// fetchCoordsByIP('173.180.172.76', (error, data) => {
//   if (error) {
//     console.log('fetchcoord error', error);
//     return;
//   }

//   console.log('fetchcoords success', data);
// });

// fetchISSFlyOverTimes( { "latitude": "49.03118133544922", "longitude": "-122.3010482788086" } ,(error, data) => {
//   if (error) {
//     console.log('flyover error', error);
//     return;
//   }

//   console.log('flyover succes', data);
// });