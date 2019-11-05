
export const starRating = (average) => {
	let rating = '';
	let filled_star = Math.floor(average / 2);
	let empty_star = 5 - filled_star;
	for(let i = 0 ; i < filled_star ; i++){
		rating += `<i class="fa fa-star"></i>\t`;
	}
	for(let j = 0 ; j < empty_star ; j++){
		rating += `<i class="fa fa-star-o"></i>\t`;
	}
	return rating;
};