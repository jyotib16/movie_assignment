import * as constants from "./constants.js";
import { Import } from "./import-templates.js";
import { Utility } from "./app-utility.js";
import { QuickView } from "./quick-view.js";

const imp = new Import();
imp.cardTemplate();
imp.quickViewTemplate();

export class Movie extends QuickView{
	constructor(id){
		super(id);
		console.log("Inside Movie Card Constructor!");
	}

	card = (movieList, idx, items) => {
		var card = document.querySelectorAll("#movieCard")[0];
		var mainSection = document.getElementsByClassName('movies_list')[idx];
		for(let [index, movie] of movieList.entries()){
			if (index < items){				
				let cloneCard = document.importNode(card.content, true);
				
				cloneCard.querySelectorAll(".card__title span")[0].textContent  = movie.original_title;
				
				let cardImage = cloneCard.querySelectorAll(".card__image")[0];
				if(movie.backdrop_path){
					cardImage.src  = constants.IMAGE_BASE_URL + movie.backdrop_path;
				}
				else{
					cardImage.src  = 'assets/images/no-image.jpg';
				}

				cardImage.addEventListener("click", function(){
					loadDetailAPI(movie.id);
				});
				
				cloneCard.querySelectorAll(".card__desc")[0].textContent  = utility.loadGenres(movie.genre_ids);
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
	const API = constants.API_MOVIE_DETAILS(id);
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