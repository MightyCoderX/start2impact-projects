export class PollutionAPI
{
    constructor(token)
    {
        this.token = token;
        this.baseURL = "https://api.waqi.info";
    }

    getDataByCoords(lat, lon)
    {
        const URL = `${this.baseURL}/feed/geo:${lat};${lon}/?token=${this.token}`;
        
        fetch(URL)
        .then(res => res.json())
        .then(json =>
        {
            console.log(_.get(json, 'data.city.name'));
        });
    }

    getDataByCity(cityName)
    {
        const URL = `${this.baseURL}/feed/${cityName}/?token=${this.token}`;
        
        fetch(URL)
        .then(res => res.json())
        .then(json =>
        {
            console.log(_.get(json, 'data.attributions'));
        });
    }

    searchByStation(stationName)
    {
        const URL = `${this.baseURL}/search/?keyword=${stationName}&token=${this.token}`;

        fetch(URL)
        .then(res => res.json())
        .then(json =>
        {
            console.log(_.get(json, 'data'));
        });
    }
}