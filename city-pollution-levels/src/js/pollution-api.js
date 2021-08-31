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
        
        this._pollutants = [];
        this._weather = [];

        for(let key in iaqi)
        {
            const value = iaqi[key].v;
            
            const aqiValue = {
                id: key,
                name: key,
                fullName: this.name,
                description: key,
                value
            };

            switch (key)
            {
                case 'h':
                    aqiValue.name = 'Humidity'
                    aqiValue.description = 'Humidity measured in percentage (%)'
                    break;

                case 'p':
                    aqiValue.name = 'Pressure';
                    break;

                case 't':
                    aqiValue.name = 'Temperature';
                    break;

                case 'w':
                    aqiValue.name = 'Wind';
                    break;

                case 'co':
                    aqiValue.name = key.toUpperCase();
                    break;

                case 'no2':
                    aqiValue.name = 'NO<sub>2</sub>';
                    break;

                case 'o3':
                    aqiValue.name = 'O<sub>3</sub>';
                    break;

                case 'o3':
                    aqiValue.name = 'O<sub>3</sub>';
                    break;
            }

            this._iaqi.push(aqiValue);
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
            '0..50': PollutionLevel.GOOD,
            '51..100': PollutionLevel.MODERATE,
            '101..150': PollutionLevel.UNHEALTHY_FOR_SENSITIVE_GROUPS,
            '151..200': PollutionLevel.UNHEALTHY,
            '201..300': PollutionLevel.VERY_UNHEALTHY,
            '300..': PollutionLevel.HAZARDOUS
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

class PollutionLevel
{
    static GOOD = new this('Good', 'green');
    static MODERATE = new this('Moderate', 'yellow');
    static UNHEALTHY_FOR_SENSITIVE_GROUPS = new this('Unhealthy for Sensitive Groups', 'orange');
    static UNHEALTHY = new this('Unhealthy', 'red');
    static VERY_UNHEALTHY = new this('Very Unhealthy', 'purple');
    static HAZARDOUS = new this('Hazardous', 'darkred');

    constructor(name, color)
    {
        this.name = name;
        this.color = color;
    }
}