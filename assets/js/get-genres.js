import * as constants from "./constants.js";

export const genreNames = (ids, mainIndex, childIndex) => {
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

const insertValues = (data,ids) => {
	let names = [];
	for(let i=0;i<data.length;i++){
		for(let j=0;j<ids.length;j++){
			if(data[i].id == ids[j]){
				names.push(data[i].name);
			}
		}
	}
	return names;
}