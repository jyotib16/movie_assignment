import { starRating } from "./rating.js";
import { quickView } from "./quick-view.js";
const image_base_url = 'https://image.tmdb.org/t/p/w500/';

const getDetailAPI =(id) => {	
	const API = `https://api.themoviedb.org/3/movie/${id}?api_key=289d5cc6f906a05d0910f4114c41bf6b`;
	fetch(API)
	.then((movies) => {
		return movies.json();
	}).then((data) => {
		quickView(data);
	});	
}

export const movieCard = (movies) => {
	let template = '';	
	for(let [index,movie] of movies.results.entries()){
		if (index < 4){
			let rating = starRating(movie.vote_average);
			template += `<div class="card">
								<figure>
									<img class="card__image" onclick='getDetailAPI(${movie.id})' src="${image_base_url + movie.backdrop_path}">
									<figcaption class="card__caption">
										<h3 class="card__title mt-0">
											<span>
												${movie.original_title}
											</span>
											<i class="fa fa-heart text-danger pull-right"></i>
										</h3>
										<p class="card__desc">
											${movie.genre_ids}
										</p>
										<h4 class="card__rating mb-0">
											${rating}
											<a href="movie-details.html?id=${movie.id}" class="text-info pull-right">
												Show more
											</a>
										</h4>
									</figcaption>
								</figure>
							</div>`;
		}
	}
	return template;
}
