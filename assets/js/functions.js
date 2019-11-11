
/* jshint esversion: 6 */

"use strict";
import * as constants from "./constants.js";
import { starRating } from "./rating.js";

export const movieDetails = (movieData) => {
	let genres = movieData.genres.length;
	let genreNames = [];
	for(let i = 0 ; i < genres ; i++){
		genreNames.push(movieData.genres[i].name);
	}
	
	let rating = starRating(movieData.vote_average);

	let casts = movieData.credits.cast.length;
	let castNames = [];
	for(let i = 0 ; i < casts ; i++){
		castNames.push( 
					`<a href='actor-details.html?castId=${movieData.credits.cast[i].id}'>
						${movieData.credits.cast[i].name}
					</a>`);
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

export const actorDetails = (actorData) => {

	let section = document.querySelectorAll(".actor-details")[0];

	let actorImage = section.querySelector('.detail__image');
	actorImage.src = constants.IMAGE_BASE_URL + actorData.profile_path;

	let actorName = section.querySelector('.detail__heading');
	actorName.textContent = actorData.name;

	let actorDOB = section.querySelector('.dob');
	actorDOB.textContent = actorData.birthday;

	let actorPopMeter = section.querySelector('.popularity_meter');
	actorPopMeter.textContent = Math.floor(actorData.popularity);

	let actorBiography = section.querySelectorAll(".detail__desc")[0];
	actorBiography.textContent = actorData.biography;

}

export const actorFilmography = (actorFilmData) => {
	let listSection = document.querySelectorAll("#getFilmList")[0];
	let list = document.querySelectorAll("#filmList")[0];

	let listCols = document.querySelectorAll("#listCols")[0];

	let castLength = actorFilmData.cast.length;
	let releaseYears = [];
	for(let i = 0 ; i < castLength ; i++){
		let releaseYear = actorFilmData.cast[i].release_date.split("-")[0];
		if(releaseYears.indexOf(releaseYear) == -1){
			releaseYears.push(releaseYear);
		}
	}
	
	releaseYears = releaseYears.sort();
	
	for(let j = 0 ; j < releaseYears.length; j++){
		
		let cloneList = document.importNode(list.content, true);
		let release = cloneList.querySelectorAll(".release_year")[0];
		release.textContent  = releaseYears[j];	
		listSection.appendChild(cloneList);

		for(let k = 0 ; k < castLength ; k++){
			let year = actorFilmData.cast[k].release_date.split("-")[0];
			if(releaseYears[j] == year){
				let cloneListCols = document.importNode(listCols.content.querySelectorAll(".list__col")[0], true);
				let movieTitle = cloneListCols.querySelectorAll(".list__col span")[0];
				movieTitle.textContent = actorFilmData.cast[k].title;

				let movieYear = cloneListCols.querySelectorAll(".list__col span")[1];
				movieYear.textContent = releaseYears[j];

				let movieCharacter = cloneListCols.querySelectorAll(".list__col span")[2];
				movieCharacter.textContent = actorFilmData.cast[k].character;

				let ln = listSection.querySelectorAll(".list").length;
				listSection.querySelectorAll(".list")[ln-1].appendChild(cloneListCols);
			}
		}
	}

}