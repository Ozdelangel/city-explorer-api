'use strict'

const axios = require('axios');

async function handleWeather(request, response){
    let {query} = request.query;
    console.log('INSIDE HANDLEWEATHER', request.query);
    try{
    let URL =`https://api.weatherbit.io/v2.0/forecast/daily?lat=${request.query.lat}&lon=${request.query.lon}&key=${process.env.WEATHER_BIT_API_KEY}&units=I`;

    let getWeather = await axios.get(URL);


    let sendWeather = getWeather.data.data.map(forecastObj => {
        return new Forecast(forecastObj);
    });
    console.log(sendWeather);
    response.status(200).send(sendWeather);
    }

    
    catch (error){
        response.status(404).send(`unable to find weather: ${error.message}`)
    }
    
}

class Forecast{
    constructor(day){
        this.date = day.valid_date;
        this.hightemp = day.max_temp;
        this.lowtemp = day.low_temp;
        this.description = `Low of ${day.low_temp}, high of ${day.max_temp} with ${day.weather.description}`;
        
    }
}

module.exports = handleWeather;