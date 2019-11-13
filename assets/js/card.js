import * as constants from "./constants.js";
import { Utility } from "./app-utility.js";
import { QuickView } from "./quick-view.js";

export class Movie extends QuickView{
	constructor(id){
		super(id);
		console.log("Inside Movie Card Constructor!");
	}

	card = (movieList, idx) => {
		var card = document.querySelectorAll("#movieCard")[0];
		var mainSection = document.getElementsByClassName('movies_list')[idx];
		for(let [index, movie] of movieList.results.entries()){
			if (index < 4){

				let cloneCard = document.importNode(card.content, true);
				
				cloneCard.querySelectorAll(".card__title span")[0].textContent  = movie.original_title;
				
				let cardImage = cloneCard.querySelectorAll(".card__image")[0];
				cardImage.src  = constants.IMAGE_BASE_URL + movie.backdrop_path;

				cardImage.addEventListener("click", function(){
					loadDetailAPI(movie.id);
				});
				
				cloneCard.querySelectorAll(".card__desc")[0].textContent  = utility.genreNames(movie.genre_ids, idx, index);
				cloneCard.querySelectorAll(".card__rating span")[0].innerHTML = utility.movieRating(movie.vote_average);
				
				let favourite = cloneCard.querySelectorAll(".fa")[0];
				favourite.addEventListener("click",function(evt){
					utility.favouriteMovie(evt.toElement);
				});

				let cardLink = cloneCard.querySelectorAll(".card__rating a")[0];
				cardLink.href = 'movie-details.html?id=' + movie.id;

				mainSection.appendChild(cloneCard);
			}
		}
	}	

	
}

/* Get Movie Detail API and show Quick View */
const loadDetailAPI = (id) => {	
	const API = `https://api.themoviedb.org/3/movie/${id}?api_key=${constants.API_KEY}&language=en-US&append_to_response=credits`;
	fetch(API)
	.then((movies) => {
		return movies.json();
	}).then((data) => {
		view.quickView(data);
	}).catch((error) => {
		console.log(error);
	});	
}


var utility = new Utility();
var view = new QuickView();