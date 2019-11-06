
/* jshint esversion: 6 */

"use strict";
import * as constants from "./constants.js";
import { starRating } from "./rating.js";
import { movieCard } from "./card.js";

const ID = window.location.href.split("?id=")[1];
const API_MOVIE_DETAILS = `https://api.themoviedb.org/3/movie/${ID}?api_key=${constants.API_KEY}&language=en-US&append_to_response=credits`;
const API_RELATED_MOVIES = `https://api.themoviedb.org/3/movie/${ID}/similar?api_key=${constants.API_KEY}&language=en-US&page=1`;

const fetchMovieData = fetch(API_MOVIE_DETAILS)
	.then((movie) => {
		return movie.json();
	}).then((details) => {
		showData(details);
	});

const fetchMovies = (API_URL, index) => {	
	fetch(API_URL)
	.then((movies) => {
		return movies.json();
	}).then((data) => {
		movieCard(data, index);
	});
}

fetchMovies(API_RELATED_MOVIES, 0);

const showData = (movieData) => {
	let genres = movieData.genres.length;
	let genreNames = [];
	for(let i = 0 ; i < genres ; i++){
		genreNames.push(movieData.genres[i].name);
	}
	
	let rating = starRating(movieData.vote_average);

	let casts = movieData.credits.cast.length;
	let castNames = [];
	for(let i = 0 ; i < casts ; i++){
		castNames.push(movieData.credits.cast[i].name);
	}

	let crew = movieData.credits.crew.length;
	let director = '';
	for(let i = 0 ; i < crew ; i++){
		if(movieData.credits.crew[i].job == 'Director'){
			director = movieData.credits.crew[i].name;
		}
	}

	let section = document.querySelectorAll(".movie-details")[0];

	let bannerImg = section.querySelector('.banner__img');
	bannerImg.src = constants.IMAGE_BASE_URL + movieData.poster_path;

	let contentHead = section.querySelector('.content__heading');
	contentHead.textContent = movieData.original_title;

	let contentDesc = section.querySelector('.content__desc');
	contentDesc.textContent = movieData.overview;

	let movieGenres = section.querySelectorAll(".genre-names")[0];
	movieGenres.textContent = genreNames;

	let movieRating = section.querySelectorAll(".rating")[0];
	movieRating.innerHTML = rating;

	let movieCast = section.querySelectorAll(".cast")[0];
	movieCast.innerHTML = castNames;

	let movieDirector = section.querySelectorAll(".director")[0];
	movieDirector.innerHTML = director;

}

