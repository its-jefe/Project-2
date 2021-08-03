var axios = require("axios").default;

let lat;
let lon;

function getRestaurants(){
    console.log('getting restaurants')
    var restaurants = {
        method: 'GET',
        url: 'https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng',
        params: {
            latitude: lat,
            longitude: lon,
            limit: "30", // max
            currency: 'USD',
            distance: '5',
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
        for (let i = 0; i < response.data.data.length; i++) {
            console.log(i);
            console.log(await response.data.data[i].name);
            console.log(await response.data.data[i].cuisine);
        }
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



