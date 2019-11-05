import * as constants from "./constants.js";
import { starRating } from "./rating.js";
import { genreNames } from "./get-genres.js";
import { quickView } from "./quick-view.js";

const getDetailAPI = (id) => {	
	const API = `https://api.themoviedb.org/3/movie/${id}?api_key=${constants.API_KEY}&language=en-US&append_to_response=credits`;
	fetch(API)
	.then((movies) => {
		return movies.json();
	}).then((data) => {
		quickView(data);
	});	
}

export const movieCard = (movies, idx) => {
	//let template = '';
	var link = document.querySelector('link[rel="import"]');
    var content = link.import;
    
    var el = content.querySelector('#movieCard');
    document.body.appendChild(el.cloneNode(true));

	let card = document.querySelectorAll("#movieCard")[0];
	let mainSection = document.getElementsByClassName('movies_list')[idx];
	for(let [index,movie] of movies.results.entries()){
		if (index < 4){
			let rating = starRating(movie.vote_average);
			let genres = genreNames(movie.genre_ids, idx, index);
			let clone = document.importNode(card.content, true);

			let cardTitle = clone.querySelectorAll(".card__title span")[0];
			cardTitle.textContent  = movie.original_title;
			
			let cardImage = clone.querySelectorAll(".card__image")[0];
			cardImage.src  = constants.image_base_url + movie.backdrop_path;
			cardImage.addEventListener("click", function(){
				getDetailAPI(movie.id);
			});
			
			let cardDesc = clone.querySelectorAll(".card__desc")[0];
			cardDesc.textContent  = genres;
			
			let cardRating = clone.querySelectorAll(".card__rating span")[0];
			cardRating.innerHTML = rating;
			
			mainSection.appendChild(clone);

		}
	}
}


