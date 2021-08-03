var axios = require("axios").default;

let lat;
let lon;

function getRestaurants() {
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
        let cuisines = {}

        for (let i = 0; i < response.data.data.length; i++) {
            let restaurant = await response.data.data[i];
            // console.log(restaurant.name)
            // console.log(restaurant.cuisine)

            // (Object.values(restaurant));
            if (restaurant.cuisine){
                for (let j = 0; j < restaurant.cuisine.length; j++) {
                    console.log(JSON.stringify(restaurant.cuisine[j].name));
                    cuisines[JSON.stringify(restaurant.cuisine[j].name)] = '';
                }
                // try .filter()
            }
        }
        console.log(cuisines)
    }).catch(function (error) {
        console.error(error);
    });
}

console.log('getting location')
var location = {
    method: 'GET',
    url: 'https://ip-geo-location.p.rapidapi.com/ip/check',
    params: { format: 'json' },
    headers: {
        'x-rapidapi-key': 'ac95e95c1dmsh4614f2ca3bc50acp1b7076jsnc9412c4bada5',
        'x-rapidapi-host': 'ip-geo-location.p.rapidapi.com'
    }
};
axios.request(location).then(async function (response) {
    lat = await response.data.location.latitude;
    lon = await response.data.location.longitude;
    console.log(lat, lon)
    getRestaurants()
}).catch(function (error) {
    console.error(error);
})