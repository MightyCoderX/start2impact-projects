import { get } from 'lodash';

const API_TOKEN = process.env.API_TOKEN;

function getPollutionFromCoords(lat, lon)
{
    const URL = `https://api.waqi.info/feed/geo:${lat};${lon}/?token=${API_TOKEN}`;
    
    fetch(URL)
    .then(res => res.json())
    .then(json =>
    {
        console.log(get(json, 'data.city.name'));
    });
}

function getCoordinates() {
    return new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

getCoordinates()
.then(pos =>
{
    const { latitude: lat, longitude: lon } = pos.coords;
    getPollutionFromCoords(lat, lon);
})
