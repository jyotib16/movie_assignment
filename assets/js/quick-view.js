import { starRating } from "./rating.js";
const image_base_url = 'https://image.tmdb.org/t/p/w500/';

export const quickView = (data) => {
	let genres = data.genres.length;
	let genreNames = [];
	for(let i = 0 ; i < genres ; i++){
		genreNames.push(data.genres[i].name);
	}
	let rating = starRating(data.vote_average);
	let template = `
				<div class="modal__dialog">
					<header class="modal__header">
						<h2 class="modal__heading">
							${data.original_title}
						</h2>
						<button type="button" class="modal__close" onclick='closeModal()'>
							<i class="fa fa-remove"></i>
						</button>
					</header>
					<section class="modal__body">
						<figure>
							<img src="${image_base_url + data.backdrop_path}">
							<figcaption>
								${data.overview}
							</figcaption>
						</figure>
						<table class="table">
							<tbody>
								<tr>
									<td width="20%">
										<strong>Genre</strong>
									</td>
									<td>
										${genreNames}
									</td>
								</tr>
								<tr>
									<td>
										<strong>Cast</strong>
									</td>
									<td>
										${data.id}
									</td>
								</tr>
								<tr>
									<td>
										<strong>Director</strong>
									</td>
									<td>
										S.S. Rajamouli
									</td>
								</tr>
								<tr>
									<td>
										<strong>Movie Rating</strong>
									</td>
									<td>
										${rating}
									</td>
								</tr>
							</tbody>
						</table>
					</section>
					<footer class="modal__footer">
						<button type="button" class="btn btn-default pull-right" onclick='closeModal()'>
							Close
						</button>
						<div class="clearfix"></div>
					</footer>
				</div>
				`;
	var modalView = document.getElementById('quick_view');
	modalView.innerHTML = template;
	modalView.style.display = 'block';
}

const closeModal = () => {	
	var modalView = document.getElementById('quick_view');
	modalView.style.display = 'none';
};
