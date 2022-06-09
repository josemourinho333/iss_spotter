const { fetchMyIP, fetchCoordsByIP } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log('it did not work', error);
//     return;
//   }

//   console.log('it worked', ip);
// });

fetchCoordsByIP('173.180.172.76', (error, data) => {
  if (error) {
    console.log('fetchcoord error', error);
    return;
  }

  console.log('fetchcoords success', data);
});