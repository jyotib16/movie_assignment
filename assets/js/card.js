import * as constants from "./constants.js";
import { starRating } from "./rating.js";
import { genreNames } from "./get-genres.js";

/* Generate Card View of Movie */
export const movieCard = (movies, idx) => {
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
			cardImage.src  = constants.IMAGE_BASE_URL + movie.backdrop_path;
			cardImage.addEventListener("click", function(){
				getDetailAPI(movie.id);
			});
			
 			let cardDesc = clone.querySelectorAll(".card__desc")[0];
			cardDesc.textContent  = genres;
			
			let cardRating = clone.querySelectorAll(".card__rating span")[0];
			cardRating.innerHTML = rating;

			let cardLink = clone.querySelectorAll(".card__rating a")[0];
			cardLink.href = 'movie-details.html?id=' + movie.id;
			
			mainSection.appendChild(clone);

		}
	}
}

/* Get Movie Detail API and show Quick View */
const getDetailAPI = (id) => {	
	const API = `https://api.themoviedb.org/3/movie/${id}?api_key=${constants.API_KEY}&language=en-US&append_to_response=credits`;
	fetch(API)
	.then((movies) => {
		return movies.json();
	}).then((data) => {
		quickView(data);
	});	
}

/* Generate Quick View of Movie */
const quickView = (data) => {
	//debugger;
	let genres = data.genres.length;
	let genreNames = [];
	for(let i = 0 ; i < genres ; i++){
		genreNames.push(data.genres[i].name);
	}
	
	let rating = starRating(data.vote_average);

	let casts = data.credits.cast.length;
	let castNames = [];
	for(let i = 0 ; i < casts ; i++){
		castNames.push(data.credits.cast[i].name);
	}

	let crew = data.credits.crew.length;
	let director = '';
	for(let i = 0 ; i < crew ; i++){
		if(data.credits.crew[i].job == 'Director'){
			director = data.credits.crew[i].name;
		}
	}

	let modal = document.getElementById("quick_view");
	let modalHeading = modal.querySelectorAll(".modal__heading")[0];
	modalHeading.textContent = data.original_title;

	let modalClose = modal.querySelectorAll(".modal__close")[0];
	let modalCloseBtn = modal.querySelectorAll(".modal__footer button")[0];
	modalClose.addEventListener("click", function(){
		closeModal();
	});
	modalCloseBtn.addEventListener("click", function(){
		closeModal();
	});

	let modalImg = modal.querySelectorAll(".modal__body img")[0];
	modalImg.src = constants.IMAGE_BASE_URL + data.backdrop_path;

	let modalSummary = modal.querySelectorAll("figcaption")[0];
	modalSummary.textContent = data.overview;

	let movieGenres = modal.querySelectorAll(".genre-names")[0];
	movieGenres.textContent = genreNames;

	let movieRating = modal.querySelectorAll(".rating")[0];
	movieRating.innerHTML = rating;

	let movieCast = modal.querySelectorAll(".cast")[0];
	movieCast.innerHTML = castNames;

	let movieDirector = modal.querySelectorAll(".director")[0];
	movieDirector.innerHTML = director;

	modal.style.display = 'block';
}

const closeModal = () => {	
	let modalView = document.getElementById('quick_view');
	modalView.style.display = 'none';
};

