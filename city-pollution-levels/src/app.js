const _ = require('lodash');

const API_TOKEN = process.env.API_TOKEN;

const latitudeRegex =  /^[-+]?([1-8]?\d([\.,]\d+)?|90(\.0+)?)$/gi;
const longitudeRegex =  /^[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))([\.,]\d+)?)$/gi;

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
    console.log(e.type);

    const formData = new FormData(e.target);

    const lat = formData.get('lat');
    const lon = formData.get('lon');

    console.log("Submitted Coords: ", lat, lon);

    getPollutionFromCoords(lat, lon);
});

getCoordinates()
.then(pos =>
{
    const { latitude: lat, longitude: lon } = pos.coords;
    getPollutionFromCoords(lat, lon);
});