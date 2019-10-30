
export const genreNames = (ids, idx) => {
	const API = `https://api.themoviedb.org/3/genre/movie/list?api_key=289d5cc6f906a05d0910f4114c41bf6b&language=en-US`;
	fetch(API)
	.then((ids) => {
		return ids.json();
	}).then((data) => {
		insertValues(data.genres, ids);
	});	
}

function insertValues (data,ids){
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