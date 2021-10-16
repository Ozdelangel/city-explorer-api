'use strict'

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const weather = require('./data/weather.json');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/', (request, response) => response.status(200).send('This is the root.'));

app.get('/weather', handleWeather);

app.get('*', (request, response) => {
    response.status(404).send('Not Found');
})

function handleWeather(request, response){
    console.log('query params:', request.query);
    let {lat, lon, searchQuery } = request.query;
    console.log(lat, lon, searchQuery);
    let foundPlace = weather.find(place => place.city_name.toLowerCase() === searchQuery.toLowerCase());
    // console.log('foundplace:', foundPlace);
    try{
    const weatherArr = foundPlace.data.map(day => {
        return new Forecast(day)
    });
    console.log(weatherArr);
    response.status(404).send(weatherArr);
}
catch(error){
    console.log('can not find place');
    response.status(404).send('unable to locate place');
}
    // response.status(200).send('This is the weather');
    
}
class Forecast{
    constructor(day){
        this.date = day.valid_date;
        this.description = `Low of ${day.low_temp}, high of ${day.max_temp} with ${day.weather.description}`;
        
    }
}
app.listen(PORT, () => console.log('listening on Port', PORT));