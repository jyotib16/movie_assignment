import * as constants from "./constants.js";

export class Utility{
	constructor(){
		console.log("Inside Utility Constructor!");
	}
	genreNames = (ids, mainIndex, childIndex) => {
		const API = `https://api.themoviedb.org/3/genre/movie/list?api_key=${constants.API_KEY}&language=en-US`;
		fetch(API)
		.then((ids) => {
			return ids.json();
		}).then((data) => {
			let mainSection = document.getElementsByClassName('movies_list')[mainIndex];
			let templateCard = mainSection.querySelectorAll(".card")[childIndex];
			let genreText = templateCard.querySelectorAll(".card__desc")[0];
			genreText.innerHTML = insertValues(data.genres, ids);
		});	
	}
	movieRating = (average) => {
		var rating = '';
		var filled_star = Math.floor(average / 2);
		var empty_star = 5 - filled_star;
		for(let i = 0 ; i < filled_star ; i++){
			rating += `<i class="fa fa-star"></i>\t`;
		}
		for(let j = 0 ; j < empty_star ; j++){
			rating += `<i class="fa fa-star-o"></i>\t`;
		}
		return rating;
	}
	favouriteMovie = (event) => {
		event.className = 'fa fa-heart text-danger pull-right';
	}
}

const insertValues = (data,ids) => {
	var names = [];
	for(let i=0;i<data.length;i++){
		for(let j=0;j<ids.length;j++){
			if(data[i].id == ids[j]){
				names.push(data[i].name);
			}
		}
	}
	return names;
}