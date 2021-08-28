const _ = require('lodash');

const { PollutionAPI } = require('./pollution-api');
const { getCurrentPosition } = require('./utils');

const API_TOKEN = process.env.API_TOKEN;

const api = new PollutionAPI(API_TOKEN);

const latitudeRegex =  /^[-+]?([1-8]?\d([\.,]\d+)?|90(\.0+)?)$/gi;
const longitudeRegex =  /^[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))([\.,]\d+)?)$/gi;

const formSearchByCoords = document.getElementById('formSearchByCoords');

formSearchByCoords.addEventListener('submit', e =>
{
    e.preventDefault();
    console.log(e.type);

    const formData = new FormData(e.target);

    const lat = formData.get('lat');
    const lon = formData.get('lon');

    console.log("Submitted Coords: ", lat, lon);

    api.getDataByCoords(lat, lon);
});

const formSearchByCity = document.getElementById('formSearchByCity');

formSearchByCity.addEventListener('submit', e =>
{
    e.preventDefault();
    console.log(e.type);

    const formData = new FormData(e.target);

    const city = formData.get('city');

    console.log("Submitted City Name: ", city);

    api.getDataByCity(city);
});

getCurrentPosition()
.then(pos =>
{
    const { latitude: lat, longitude: lon } = pos.coords;
    api.getDataByCoords(lat, lon);
});