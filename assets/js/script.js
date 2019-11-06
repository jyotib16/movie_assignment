
/* jshint esversion: 6 */

"use strict";
import * as constants from "./constants.js";
import { movieCard } from "./card.js";

const API_LATEST_MOVIES = `https://api.themoviedb.org/3/movie/now_playing?api_key=${constants.API_KEY}&language=en-US&include_adult=false`;
const API_MOVIE_GENRES = `https://api.themoviedb.org/3/genre/movie/list?api_key=${constants.API_KEY}&language=en-US`;
const API_TRENDING_MOVIES = `https://api.themoviedb.org/3/trending/movie/week?api_key=${constants.API_KEY}`;
const API_MOST_WATCHED_MOVIES = `https://api.themoviedb.org/3/movie/popular?api_key=${constants.API_KEY}&language=en-US&page=1`;

const FETCH_MOVIES = (API_URL, index) => {	
	fetch(API_URL)
	.then((movies) => {
		return movies.json();
	}).then((data) => {
		movieCard(data, index);
	});
}

FETCH_MOVIES(API_LATEST_MOVIES, 0);
FETCH_MOVIES(API_TRENDING_MOVIES, 1);
FETCH_MOVIES(API_MOST_WATCHED_MOVIES, 2);

