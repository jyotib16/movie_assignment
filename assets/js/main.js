
/* jshint esversion: 6 */

"use strict";
import "./import-templates.js";
import * as constants from "./constants.js";
import { Movie } from "./card.js";
import { DetailData	} from "./detail-functions.js";

const API_LATEST_MOVIES = `https://api.themoviedb.org/3/movie/now_playing?api_key=${constants.API_KEY}&language=en-US&include_adult=false`;
const API_MOVIE_GENRES = `https://api.themoviedb.org/3/genre/movie/list?api_key=${constants.API_KEY}&language=en-US`;
const API_TRENDING_MOVIES = `https://api.themoviedb.org/3/trending/movie/week?api_key=${constants.API_KEY}`;
const API_MOST_WATCHED_MOVIES = `https://api.themoviedb.org/3/movie/popular?api_key=${constants.API_KEY}&language=en-US&page=1`;

const ID = window.location.href.split("?id=")[1];
const API_RELATED_MOVIES = `https://api.themoviedb.org/3/movie/${ID}/similar?api_key=${constants.API_KEY}&language=en-US&page=1`;
const API_MOVIE_DETAILS = `https://api.themoviedb.org/3/movie/${ID}?api_key=${constants.API_KEY}&language=en-US&append_to_response=credits`;

const CAST_ID = window.location.href.split("?castId=")[1];
const API_ACTOR_DETAILS = `https://api.themoviedb.org/3/person/${CAST_ID}?api_key=${constants.API_KEY}&language=en-US`;
const API_ACTOR_FILMOGRAPHY = `https://api.themoviedb.org/3/person/${CAST_ID}/movie_credits?api_key=${constants.API_KEY}&language=en-US`;

var movie = new Movie();

const LOAD_MOVIES = (API_URL, index) => {	
	fetch(API_URL)
	.then((movies) => {
		return movies.json();
	}).then((data) => {
		movie.card(data, index);
	}).catch((error) => {
        console.log(error);
    });
}

var data = new DetailData();

const LOAD_MOVIE_DETAILS = () => {
	fetch(API_MOVIE_DETAILS)
	.then((movie) => {
		return movie.json();
	}).then((details) => {
		data.movieDetails(details);
	}).catch((error) => {
        console.log(error);
    });
}

const LOAD_ACTOR_DETAILS = () => {
	fetch(API_ACTOR_DETAILS)
	.then((actor) => {
		return actor.json();
	}).then((details) => {
		data.actorDetails(details);
	}).catch((error) => {
        console.log(error);
    });
}

const LOAD_ACTOR_FILMOGRAPHY = () => {
	fetch(API_ACTOR_FILMOGRAPHY)
	.then((actor) => {
		return actor.json();
	}).then((filmography) => {
		data.actorFilmography(filmography);
	}).catch((error) => {
        console.log(error);
    });
}

const main = document.getElementsByClassName("homePage")[0];

if(main){
	LOAD_MOVIES(API_LATEST_MOVIES, 0);
	LOAD_MOVIES(API_TRENDING_MOVIES, 1);
	LOAD_MOVIES(API_MOST_WATCHED_MOVIES, 2);
}

if(ID){
	LOAD_MOVIE_DETAILS();
	LOAD_MOVIES(API_RELATED_MOVIES, 0);
}

if(CAST_ID){
	LOAD_ACTOR_DETAILS();
	LOAD_ACTOR_FILMOGRAPHY();
}
