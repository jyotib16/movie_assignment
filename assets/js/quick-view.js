import * as constants from "./constants.js";
import { Utility } from "./app-utility.js";

export class QuickView{
    constructor(){
        console.log("Inside Quick View Constructor!!");
    }
    quickView = (data) => {
        //debugger;
        var genres = data.genres.length;
        var genreNames = [];
        for(let i = 0 ; i < genres ; i++){
            genreNames.push(data.genres[i].name);
        }
    
        var casts = data.credits.cast.length;
        var castNames = [];
        for(let i = 0 ; i < casts ; i++){
            castNames.push(data.credits.cast[i].name);
        }
    
        var crewLength = data.credits.crew.length;
        var director = '';
        for(let i = 0 ; i < crewLength ; i++){
            if(data.credits.crew[i].job == 'Director'){
                director = data.credits.crew[i].name;
            }
        }
    
        var modal = document.getElementById("quick_view");
        
        modal.querySelectorAll(".modal__heading")[0].textContent = data.original_title;
    
        var modalClose = modal.querySelectorAll(".modal__close")[0];
        var modalCloseBtn = modal.querySelectorAll(".modal__footer button")[0];
        modalClose.addEventListener("click", function(){
            closeModal();
        });
        modalCloseBtn.addEventListener("click", function(){
            closeModal();
        });
    
        var modalImg = modal.querySelectorAll(".modal__body img")[0];
        modalImg.src = constants.IMAGE_BASE_URL + data.backdrop_path;
    
        modal.querySelectorAll("figcaption")[0].textContent = data.overview;
        modal.querySelectorAll(".genre-names")[0].textContent = genreNames;
        modal.querySelectorAll(".rating")[0].innerHTML = utility.movieRating(data.vote_average);
        modal.querySelectorAll(".cast")[0].innerHTML = castNames;
        modal.querySelectorAll(".director")[0].innerHTML = director;
    
        modal.style.display = 'block';
    }
}

const closeModal = () => {	
	var modalView = document.getElementById('quick_view');
	modalView.style.display = 'none';
};


var utility = new Utility();