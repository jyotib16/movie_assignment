import * as constants from "./constants.js";
import { starRating } from "./rating.js";

export const quickView = (data) => {
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
	var modalView = document.getElementById('quick_view');
	modalView.style.display = 'none';
};
