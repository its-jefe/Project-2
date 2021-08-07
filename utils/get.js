// GETS ALL RESTAURANTS IN YOUR AREA

const axios = require ("axios");

function getLocation() {
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
    axios.request(location).then(async function (response) {
        let lat = await response.data.location.latitude;
        let lon = await response.data.location.longitude;

        console.log(lat, lon)
        getRestaurants(lat, lon)
    }).catch(function (error) {
        console.log('No coordinates could be recieved')
        console.error(error);
    })
}

async function getRestaurants(lat, lon) {
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

    axios.request(searchParams).then(async function (response) {
        let restaurants = []
        let cuisines = []

        for (let i = 0; i < response.data.data.length; i++) {
            let restaurant = await response.data.data[i]
            let restuarantObj = {}

            if (restaurant.name) { // if the restaurant has a name 
                if (restaurant.cuisine && JSON.stringify(restaurant.cuisine) != '[]' ) { // and also has a cuisine listed
                    // CREATE RESTAURANT OBJECT
                    restuarantObj = {
                        id: restaurants.length,
                        name: check(restaurant.name),
                        photo: check(restaurant.photo),
                        distance: check(restaurant.distance_string),
                        closing_time: check(restaurant.open_now_text),
                        price: check(restaurant.price_level),
                        description: check(restaurant.description),
                        url: check(restaurant.web_url),
                        phone: check(restaurant.phone),
                        website: check(restaurant.website),
                        // address_obj: check(restaurant.address_obj),
                        address: check(restaurant.address), // this works better than the obj
                        /*unreliable so should not really be used .. implement hours in the future*/
                        // hours: restaurant.hours, 
                        cuisines: check(JSON.stringify(restaurant.cuisine))
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
        console.log(restaurants)
        console.log(cuisines)
        module.exports = cuisines, restaurants;
        // return (cuisines, restaurants)
    }).catch(function (error) {
        console.error(error);
    });
}

function check(param) { // "better run a check" - Ice Cube
    if (param) {
        if (param.images){
            // just for photos
            return(param.images.large.url)
        }
        return param
    } else { return null }
}