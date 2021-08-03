var axios = require("axios").default;

async function getRestaurants(lat, lon) {
    console.log('getting restaurants')
    var restaurants = {
        method: 'GET',
        url: 'https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng',
        params: {
            latitude: lat,
            longitude: lon,
            limit: "30", // max
            currency: 'USD',
            distance: '10',
            open_now: 'true',
            lunit: 'mi',
            lang: 'en_US',
        },
        headers: {
            'x-rapidapi-key': 'ac95e95c1dmsh4614f2ca3bc50acp1b7076jsnc9412c4bada5',
            'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
        }
    };

    axios.request(restaurants).then(async function (response) {
        let cuisines = []

        for (let i = 0; i < response.data.data.length; i++) {
            let restaurant = await response.data.data[i];

            if (restaurant.name) { // if the restaurant has a name 
                if (restaurant.cuisine) { // and also has a cuisine listed
                    for (let j = 0; j < restaurant.cuisine.length; j++) {
                        if (cuisines.includes(restaurant.cuisine[j].name) === false) { // allow no duplicates
                            cuisines.push(restaurant.cuisine[j].name); // add cuisines
                        }
                    }
                }
                console.log(i + ": " + restaurant.name) // just for show .. log names with their index number
            }
        }
        console.log(cuisines) // log filled cuisines array
    }).catch(function (error) {
        console.error(error);
    });
}

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

getLocation();