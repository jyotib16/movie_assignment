
/* jshint esversion: 6 */

"use strict";
import * as constants from "./constants.js";
import { Movie } from "./card.js";
import { Utility } from "./app-utility.js";

export class LoadMethods {
	
	constructor(){
		console.log("Inside Detail Data Constructor!!");
	}

	searchMovie = (allMovies) => {
		const search_field = document.getElementsByClassName("form__input")[0];
		if(search_field){			
			var ratingData = document.getElementById('movie-rating');
			loadSearchData('', JSON.parse(allMovies),"all data");
			ratingData.addEventListener('change',function(evt){
				loadSearchData(evt.currentTarget.value, JSON.parse(allMovies),"rating");
			})
			search_field.addEventListener('keyup', function(evt){
				loadSearchData(evt.currentTarget.value, JSON.parse(allMovies),"title search");
			});
		}
	}

	movieDetails = (movieData) => {
		var genres = movieData.genres.length;
		var genreNames = [];
		for(let i = 0 ; i < genres ; i++){
			genreNames.push(movieData.genres[i].name);
		}

		var casts = movieData.credits.cast.length;
		var castNames = [];
		for(let i = 0 ; i < casts ; i++){
			castNames.push( 
						`<a href='actor-details.html?castId=${movieData.credits.cast[i].id}'>
							${movieData.credits.cast[i].name}
						</a>`);
		}

		var crew = movieData.credits.crew.length;
		var director = '';
		for(let i = 0 ; i < crew ; i++){
			if(movieData.credits.crew[i].job == 'Director'){
				director = movieData.credits.crew[i].name;
			}
		}

		var section = document.querySelectorAll(".movie-details")[0];

		var bannerImg = section.querySelector('.banner__img');
		bannerImg.src = constants.IMAGE_BASE_URL + movieData.poster_path;

		var favIcon = section.querySelector('.fa');
		favIcon.addEventListener("click",function(evt){
			utility.favouriteMovie(evt.toElement);
		});

		section.querySelector('.content__heading').textContent = movieData.original_title;
		section.querySelector('.content__desc').textContent = movieData.overview;
		section.querySelectorAll(".genre-names")[0].textContent = genreNames;
		section.querySelectorAll(".rating")[0].innerHTML = utility.movieRating(movieData.vote_average);
		section.querySelectorAll(".cast")[0].innerHTML = castNames;
		section.querySelectorAll(".director")[0].innerHTML = director;

	}

	actorDetails = (actorData) => {

		var section = document.querySelectorAll(".actor-details")[0];
	
		var actorImage = section.querySelector('.detail__image');
		actorImage.src = constants.IMAGE_BASE_URL + actorData.profile_path;
	
		section.querySelector('.detail__heading').textContent = actorData.name;
		section.querySelector('.dob').textContent = actorData.birthday;	
		section.querySelector('.popularity_meter').textContent = Math.floor(actorData.popularity);	
		section.querySelectorAll(".detail__desc")[0].textContent = actorData.biography;
	
	}

	actorFilmography = (actorFilmData) => {
		var listSection = document.querySelectorAll("#getFilmList")[0];
		var list = document.querySelectorAll("#filmList")[0];
	
		var listCols = document.querySelectorAll("#listCols")[0];
	
		var castLength = actorFilmData.cast.length;
		var releaseYears = [];
		for(let i = 0 ; i < castLength ; i++){
			let releaseYear = actorFilmData.cast[i].release_date.split("-")[0];
			if(releaseYears.indexOf(releaseYear) == -1){
				releaseYears.push(releaseYear);
			}
		}
		
		releaseYears = releaseYears.sort().reverse();
		
		for(let j = 0 ; j < releaseYears.length; j++){
			
			let cloneList = document.importNode(list.content, true);
			cloneList.querySelectorAll(".release_year")[0].textContent  = releaseYears[j];	
			listSection.appendChild(cloneList);
	
			for(let k = 0 ; k < castLength ; k++){
				let year = actorFilmData.cast[k].release_date.split("-")[0];
				if(releaseYears[j] == year){
					let cloneListCols = document.importNode(listCols.content.querySelectorAll(".list__col")[0], true);

					cloneListCols.querySelectorAll(".list__col span")[0].textContent = actorFilmData.cast[k].title;	
					cloneListCols.querySelectorAll(".list__col span")[1].textContent = releaseYears[j];
					cloneListCols.querySelectorAll(".list__col span")[2].textContent = actorFilmData.cast[k].character;
	
					let ln = listSection.querySelectorAll(".list").length;
					listSection.querySelectorAll(".list")[ln-1].appendChild(cloneListCols);
				}
			}
		}
	
	}

}

const loadSearchData = (keyValue, allData, dataType) => {
	keyValue = keyValue.toLowerCase();
	allData = Object.values(allData);
	allData = onlyUniqueMovies(allData);
	document.getElementsByClassName('movies_list')[0].innerHTML = '';
	var filterData = [];
	allData.filter((data)=>{
		if(data.id){
			if(keyValue == ''){
				filterData.push(data);
			}
			if(keyValue != '' && data.original_title && dataType!= 'rating'){
				let flag = false;
				let title = data.original_title.toLowerCase();
				let genres = data.genre_ids;
				let genreNames = utility.loadGenres(genres);
				let actors = utility.loadActorNames(data.id);
				for(let i=0;i<actors.length;i++){
					if(actors[i].toLowerCase().indexOf(keyValue)!=-1){
						flag = true;
					}
				}
				for(let i=0;i<genreNames.length;i++){
					if(genreNames[i].toLowerCase().indexOf(keyValue)!= -1){
						flag = true;
					}
				}
				if(title.indexOf(keyValue) != -1){
					flag = true;
				}
				if(flag){
					filterData.push(data);
				}
			}
			if(keyValue != ''  && dataType == 'rating' && (keyValue >= 1 || keyValue <= 5)){
				let vote = Math.floor(data.vote_average / 2);
				if(vote == keyValue){
					filterData.push(data);
				}
			}
		}
	});
	if(filterData.length == 0){
		document.getElementsByClassName('no_result')[0].textContent = `No movie found matching '${keyValue}'`;
	}
	else{
		if(filterData.length<2){
			document.getElementsByClassName('no_result')[0].textContent = `${filterData.length} movie found`;
		}
		else{			
			document.getElementsByClassName('no_result')[0].textContent = `${filterData.length} movies found`;
		}
		movie.card(filterData, 0, filterData.length);
	}
}

const onlyUniqueMovies = ( movies ) => {
    var moviesLength = movies.length;
	var resultIds = [];
	var resultData = [];
	for(let movie of movies){
		if(resultIds.indexOf(movie.id) == -1){
			resultIds.push(movie.id);
			resultData.push(movie);
		}
	}
	return resultData;
}

var utility = new Utility();
var movie = new Movie();