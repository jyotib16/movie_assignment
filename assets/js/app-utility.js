import * as constants from "./constants.js";

export class Utility{
	constructor(){
		console.log("Inside Utility Constructor!");
	}
	getGenres = (ids) => {
		let genresData = localStorage.getItem('GenresData');
		genresData = JSON.parse(genresData).genres;
		return insertValues(genresData,ids);
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
		if(ids){
			for(let j=0;j<ids.length;j++){
				if(data[i].id == ids[j]){
					names.push(data[i].name);
				}
			}
		}
	}
	return names;
}