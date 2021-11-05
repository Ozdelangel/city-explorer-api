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

let handleWeather = require('./modules/weather.js');
let handleMovies = require('./modules/movies.js');
app.get('/weather', handleWeather);

app.get('/movies', handleMovies);

app.get('*', (request, response) => {
    response.status(404).send('Not Found');
})


app.listen(PORT, () => console.log('listening on Port', PORT));