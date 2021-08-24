const _ = require('lodash');

const API_TOKEN = process.env.API_TOKEN;

function getPollutionFromCoords(lat, lon)
{
    const URL = `https://api.waqi.info/feed/geo:${lat};${lon}/?token=${API_TOKEN}`;
    
    fetch(URL)
    .then(res => res.json())
    .then(json =>
    {
        console.log(_.get(json, 'data.city.name'));
    });
}

function getCoordinates() {
    return new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

const formCoords = document.getElementById('formCoords');

formCoords.addEventListener('submit', e =>
{
    e.preventDefault();

    const formData = new FormData(e.target);
    
    const coordsString = formData.get('coords');
    const parts = coordsString.split(' ');

    const lat = +parts[0];
    const lon = +parts[1];

    getPollutionFromCoords(lat, lon);
});

getCoordinates()
.then(pos =>
{
    const { latitude: lat, longitude: lon } = pos.coords;
    getPollutionFromCoords(lat, lon);
})