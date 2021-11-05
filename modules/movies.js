'use strict'

const axios = require('axios');

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

module.exports = handleMovies;