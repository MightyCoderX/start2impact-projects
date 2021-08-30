import _ from "lodash";

export class PollutionAPI
{
    constructor(token)
    {
        this.token = token;
        this.baseURL = "https://api.waqi.info";
    }

    getDataByCoords(lat, lon)
    {
        return this._apiCall(`/feed/geo:${lat};${lon}/?token=${this.token}`);
    }

    getDataByCity(cityName)
    {
        return this._apiCall(`/feed/${cityName}/?token=${this.token}`);
    }

    searchByStation(stationName)
    {
        return this._apiCall(`/search/?keyword=${stationName}&token=${this.token}`);
    }

    async _apiCall(path)
    {
        const json = await (await fetch(this.baseURL + path)).json();

        return new PollutionFeed(json.data);
    }
}

class PollutionFeed
{
    constructor(data)
    {
        const { aqi, city, dominentpol, iaqi, time } = data;
        this._aqi = aqi;
        this._city = new City(city);
        this._dominentpol = dominentpol;
        
        this._iaqi = {};
        for(let pol in iaqi)
        {
            this._iaqi[pol] = iaqi[pol].v;
        }

        this._time = new Date(time.iso);
        console.log(this);
    }

    get aqi()
    {
        return this._aqi;
    }

    get pollutionLevel()
    {
        const pollutionLevel = {
            '0..50': 'Good',
            '51..100': 'Moderate',
            '101..150': 'Unhealthy for Sensitive Groups',
            '151..200': 'Unhealthy',
            '201..300': 'Very Unhealty',
            '300..': 'Hazardous'
        };

        for(let range in pollutionLevel)
        {
            const [ min, max ] = range.split('..');
            if(this._aqi >= min && this._aqi <= (max || Infinity))
            {
                return pollutionLevel[range];
            }
        }
    }

    get city()
    {
        return this._city;
    }

    get dominentpol()
    {
        return this._dominentpol;
    }

    get iaqi()
    {
        return this._iaqi;
    }

    get time()
    {
        return this._time;
    }
}

class City
{
    constructor(city)
    {
        this._coords = { latitude: city.geo[0], longitude: city.geo[1] };
        this._name = city.name;
        this._url = city.url;
    }

    get coords()
    {
        return this._coords;
    }

    get name()
    {
        return this._name;
    }

    get url()
    {
        return this._url;
    }
}