
/* jshint esversion: 6 */

"use strict";
import "./import-templates.js";
import * as constants from "./constants.js";
import { Movie } from "./card.js";
import { LoadMethods } from "./detail-functions.js";

const ID = constants.URL.split("?id=")[1];
const CAST_ID = constants.URL.split("?castId=")[1];

const main = document.getElementsByClassName("main")[0];
const search_page = document.getElementsByClassName("movies_result")[0];

var allMovies = {};
var movie = new Movie();
var method = new LoadMethods();

const LOAD_MOVIES = (API_URL, index) => {	
	fetch(API_URL)
	.then((movies) => {
		return movies.json();
	}).then((data) => {
		Array.prototype.push.apply(allMovies, data.results);
		localStorage.setItem('MoviesData',JSON.stringify(allMovies));
		movie.card(data.results, index, 4);
	}).catch((error) => {
        console.log(error);
    });
}
	
const LOAD_GENRES = (API_URL) => {
	fetch(API_URL)
	.then((genreIds) => {
		return genreIds.json();
	}).then((data) => {			
		localStorage.setItem('GenresData',JSON.stringify(data));
	}).catch((error) => {
        console.log(error);
    });	
}

const LOAD_RELATED_MOVIES = (API_URL, index) => {	
	fetch(API_URL)
	.then((movies) => {
		return movies.json();
	}).then((data) => {
		movie.card(data.results, index, 4);
	}).catch((error) => {
        console.log(error);
    });
}

const LOAD_MOVIE_DETAILS = (API_URL) => {
	fetch(API_URL)
	.then((movie) => {
		return movie.json();
	}).then((details) => {
		method.movieDetails(details);
	}).catch((error) => {
        console.log(error);
    });
}

const LOAD_ACTOR_DETAILS = (API_URL) => {
	fetch(API_URL)
	.then((actor) => {
		return actor.json();
	}).then((details) => {
		method.actorDetails(details);
	}).catch((error) => {
        console.log(error);
    });
}

const LOAD_ACTOR_FILMOGRAPHY = (API_URL) => {
	fetch(API_URL)
	.then((actor) => {
		return actor.json();
	}).then((filmography) => {
		method.actorFilmography(filmography);
	}).catch((error) => {
        console.log(error);
    });
}

if(main){
	LOAD_MOVIES(constants.API_LATEST_MOVIES, 0);
	LOAD_MOVIES(constants.API_TRENDING_MOVIES, 1);
	LOAD_MOVIES(constants.API_MOST_WATCHED_MOVIES, 2);
	LOAD_GENRES(constants.API_MOVIE_GENRES);
}

if(search_page){
	method.searchMovie(localStorage.getItem('MoviesData'));
}

if(ID){
	LOAD_MOVIE_DETAILS(constants.API_MOVIE_DETAILS(ID));
	LOAD_RELATED_MOVIES(constants.API_RELATED_MOVIES(ID), 0);
}

if(CAST_ID){
	LOAD_ACTOR_DETAILS(constants.API_ACTOR_DETAILS(CAST_ID));
	LOAD_ACTOR_FILMOGRAPHY(constants.API_ACTOR_FILMOGRAPHY(CAST_ID));
}
