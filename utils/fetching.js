const axios = require("axios");

// GETS ALL RESTAURANTS IN YOUR AREA
const getLocation = async () => {
  let lat;
  let lon;
  var location = {
    method: 'GET',
    url: 'https://ip-geo-location.p.rapidapi.com/ip/check',
    params: { format: 'json' },
    headers: {
      'x-rapidapi-key': 'ac95e95c1dmsh4614f2ca3bc50acp1b7076jsnc9412c4bada5',
      'x-rapidapi-host': 'ip-geo-location.p.rapidapi.com'
    }
  };
  console.log('getting location')
  // Awaits coordinates then sends them to getRestaurants function
  await axios.request(location).then(async function (response) {
    lat = await response.data.location.latitude;
    lon = await response.data.location.longitude;
  }).catch(async function (error) {
    console.log('No coordinates could be recieved')
    console.error(error);
  })
  return { lat, lon }
}

const getRestaurants = async ({ lat, lon }) => {
  let restaurants = []
  let cuisines = []
  console.log('getting restaurants')
  var searchParams = {
    method: 'GET',
    url: 'https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng',
    params: {
      latitude: lat,
      longitude: lon,
      limit: "30", // max
      currency: 'USD',
      distance: '10', // max
      open_now: 'true',
      lunit: 'mi',
      lang: 'en_US',
    },
    headers: {
      'x-rapidapi-key': 'ac95e95c1dmsh4614f2ca3bc50acp1b7076jsnc9412c4bada5',
      'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
    }
  };

  await axios.request(searchParams).then(async function (response) {

    for (let i = 0; i < response.data.data.length; i++) {
      let restaurant = await response.data.data[i]
      let restuarantObj = {}

      if (restaurant.name) { // if the restaurant has a name 
        if (restaurant.cuisine && JSON.stringify(restaurant.cuisine) != '[]') { // and also has a cuisine listed
          // CREATE RESTAURANT OBJECT
          restuarantObj = {
            id: restaurants.length,
            name: await check(restaurant.name),
            photo: await check(restaurant.photo),
            distance: await check(restaurant.distance_string),
            closing_time: await check(restaurant.open_now_text),
            price: await check(restaurant.price_level),
            description: await check(restaurant.description),
            url: await check(restaurant.web_url),
            phone: await check(restaurant.phone),
            website: await check(restaurant.website),
            // address_obj: check(restaurant.address_obj),
            address: await check(restaurant.address), // this works better than the obj
            /*unreliable so should not really be used .. implement hours in the future*/
            // hours: restaurant.hours, 
            cuisines: await check(JSON.stringify(restaurant.cuisine))
          }
          restaurants.push(restuarantObj)
          // ADD "AVAILABLE" CUISINES TO LIST
          for (let j = 0; j < restaurant.cuisine.length; j++) { // for each quisine that restuarant lists...
            if (cuisines.includes(restaurant.cuisine[j].name) === false) { // allow no duplicates
              cuisines.push(restaurant.cuisine[j].name); // add cuisines
            }
          }
        }
      }
    }
  }).catch(function (error) {
    console.error(error);
  });
  return {cuisines, restaurants}
}

const check = async (param) => { // "better run a check" - Ice Cube
  if (param) {
    if (param.images) {
      // just for photos
      return (param.images.large.url)
    }
    return param
  } else { return null }
}

module.exports = async function combo () {
    let ret;
    await getLocation().then(async data => {
      await getRestaurants(data).then(async data => {
        ret = (data)
      })
    })
    return ret
  }
