const _ = require('lodash');

const { PollutionAPI } = require('./js/pollution-api');
const { getCurrentPosition } = require('./js/utils');

const API_TOKEN = process.env.API_TOKEN;

const api = new PollutionAPI(API_TOKEN);

const latitudeRegex =  /^[-+]?([1-8]?\d([\.,]\d+)?|90(\.0+)?)$/gi;
const longitudeRegex =  /^[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))([\.,]\d+)?)$/gi;

const formSearchByCoords = document.getElementById('formSearchByCoords');

formSearchByCoords.addEventListener('submit', async e =>
{
    e.preventDefault();
    console.log(e.type);

    const formData = new FormData(e.target);

    const lat = formData.get('lat');
    const lon = formData.get('lon');

    console.log("Submitted Coords: ", lat, lon);

    const feed = await api.getDataByCoords(lat, lon);
    generateStationReport(feed);
});

const formSearchByCity = document.getElementById('formSearchByCity');

formSearchByCity.addEventListener('submit', async e =>
{
    e.preventDefault();
    console.log(e.type);

    const formData = new FormData(e.target);

    const city = formData.get('city');

    console.log("Submitted City Name: ", city);

    const feed = await api.getDataByCity(city);
    
    generateStationReport(feed);
});

function generateStationReport(pollutionFeed)
{
    const mainElem = document.querySelector('main');
    
    if(pollutionFeed.status == 'error')
    {
        console.log(pollutionFeed);
        mainElem.innerHTML = pollutionFeed.data;
        return;
    }

    mainElem.querySelector('.station-report-container')?.remove?.();

    const stationReportTemplate = document.getElementById('stationReport');
    const newStationReport = stationReportTemplate.content.cloneNode(true);

    newStationReport.querySelector('.station-name').innerText = pollutionFeed.city.name;
    newStationReport.querySelector('.aqi-display').style.borderColor = pollutionFeed.pollutionLevel.color;
    newStationReport.querySelector('.aqi-value').innerText = pollutionFeed.aqi;
    newStationReport.querySelector('.aqi-level').innerText = pollutionFeed.pollutionLevel.name;
    newStationReport.querySelector('.aqi-level').style.color = pollutionFeed.pollutionLevel.color;
    
    const pollutantsGrid = newStationReport.querySelector('.pollutants-grid');

    const pollutantCardTemplate = newStationReport.getElementById('pollutantCard')
    
    const pollutants = pollutionFeed.pollutants;
    const weather = pollutionFeed.weather;

    [...pollutants, ...weather].forEach(aqiValue =>
    {
        const newPollutantCard = pollutantCardTemplate.content.cloneNode(true);
        newPollutantCard.querySelector('.pollutant-name').innerHTML = aqiValue.name;
        newPollutantCard.querySelector('.pollutant-value').innerHTML = aqiValue.value + " " + aqiValue.unit;
        pollutantsGrid.appendChild(newPollutantCard);
    });

    mainElem.appendChild(newStationReport);
}

getCurrentPosition()
.then(async pos =>
{
    const { latitude: lat, longitude: lon } = pos.coords;
    let feed = await api.getDataByCoords(lat, lon);
    generateStationReport(feed);
});