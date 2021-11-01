'use strict'

require('dotenv').config();
const axios = require('axios');
const express = require('express');
const cors = require('cors');
// const weather = require('./data/weather.json');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/', (request, response) => response.status(200).send('This is the root.'));

app.get('/weather', handleWeather);

app.get('/movies', handleMovies);



app.get('*', (request, response) => {
    response.status(404).send('Not Found');
})

 async function handleWeather(request, response){
    let {query} = request.query;
    console.log('INSIDE HANDLEWEATHER', request.query);
    let URL =`https://api.weatherbit.io/v2.0/forecast/daily?lat=${request.query.lat}&lon=${request.query.lon}&key=${process.env.WEATHER_BIT_API_KEY}&units=I`;
    try{
    let getWeather = await axios.get(URL);
    //   console.log(getMovie.data);

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


async function handleMovies(request, response){
    let {cityName} = request.query;
    let URL =`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_DB_API_KEY}&query=${cityName}`;
    try{
    let getMovies = await axios.get(URL);
      console.log(getMovies.data);

    let allMovies = getMovies.data.results.map(movieObj => {
        return new Film(movieObj);
    });
    // console.log(sendWeather);
    response.status(200).send(allMovies);
    }
    
    catch (error){
        response.status(404).send(`unable to find movies: ${error.message}`)
    }
    
    
}

class Film {
    constructor(theFilm){
        this.title = theFilm.original_title;
        this.overview = theFilm.overview;
        this.average_votes = theFilm.vote_average;
        this.total_votes = theFilm.vote_count;
        this.popularity = theFilm.popularity;
        this.image_url = 'https://image.tmdb.org/t/p/w500' + theFilm.poster_path;
        this.realeased_on = theFilm.release_date;
    }
}

app.listen(PORT, () => console.log('listening on Port', PORT));