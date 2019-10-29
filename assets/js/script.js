
/* jshint esversion: 6 */

"use strict";
import { movieCard } from "./card.js";

const API_KEY = '289d5cc6f906a05d0910f4114c41bf6b';

const API_LATEST_MOVIES = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&include_adult=false`;
const API_MOVIE_GENRES = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;
const API_TRENDING_MOVIES = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;
const API_MOST_WATCHED_MOVIES = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
const API_MOVIE_DETAILS = `https://api.themoviedb.org/3/movie/{movie_id}?api_key=${API_KEY}&language=en-US&append_to_response=credits`;


const fetchData = (API_URL, index) => {	
	fetch(API_URL)
	.then((movies) => {
		return movies.json();
	}).then((data) => {
		document.getElementsByClassName('movies_list')[index].innerHTML = movieCard(data);
	});
}

fetchData(API_LATEST_MOVIES,0);
fetchData(API_TRENDING_MOVIES,1);
fetchData(API_MOST_WATCHED_MOVIES,2);

