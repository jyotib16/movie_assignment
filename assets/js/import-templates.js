
$(document).ready(function () {	
	/* Import Header */
	$("#header").load("includes/header.html",function(){
		if(window.location.href.indexOf("index.html") != -1){
			$(".navbar__item:eq(1)").removeClass("navbar__item--active");
			$(".navbar__item:eq(0)").addClass("navbar__item--active");
		}
		if(window.location.href.indexOf("search-movies.html") != -1){
			$(".navbar__item:eq(0)").removeClass("navbar__item--active");
			$(".navbar__item:eq(1)").addClass("navbar__item--active");
		}
	});	
});

export class Import{

	/* Import Card Template */	
	cardTemplate = () =>{	
		const cardLink = document.querySelector('#cardTemplate');
		if(cardLink){
			const cardContent = cardLink.import;
			const cardSel = cardContent.querySelector('#movieCard');
			document.body.appendChild(cardSel.cloneNode(true));
		}
	}
	/* Import Quick View Template */
	quickViewTemplate = () =>{	
		const viewLink = document.querySelector('#viewTemplate');
		if(viewLink){
			const viewContent = viewLink.import;
			const viewSel = viewContent.querySelector('#quick_view');
			document.body.appendChild(viewSel.cloneNode(true));
		}
	}
}