
const axios = require('axios');

const forecast = async (lat,long) => {
    const url = 'http://api.weatherstack.com/current?access_key=3fae2484beb64256eb7e8daddb5c3ce3&query=' + lat + ',' + long+ '&units=f';

    try{
        const response = await axios.get(url);
        const data = response.data;
        if(data.error){
            return {error:'Unable to find location'};
        }
        else{
            return ({weather:data.current.weather_descriptions[0],
                temp:data.current.temperature,
                feelslike:data.current.feelslike
            })
        }
    }
    catch(error){
       return {error:'Unable to connect to weather services!'};
    }
    
}

module.exports = forecast;