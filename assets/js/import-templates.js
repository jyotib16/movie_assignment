
$(document).ready(function () {
	
	/* Import Header */
	$("#header").load("includes/header.html");

	/* Import Card Template */	
	const cardLink = document.querySelector('#cardTemplate');
	if(cardLink){
		const cardContent = cardLink.import;
		const cardSel = cardContent.querySelector('#movieCard');
		document.body.appendChild(cardSel.cloneNode(true));
	}

	/* Import Quick View Template */
	const viewLink = document.querySelector('#viewTemplate');
	if(viewLink){
		const viewContent = viewLink.import;
		const viewSel = viewContent.querySelector('#quick_view');
		document.body.appendChild(viewSel.cloneNode(true));
	}

});


