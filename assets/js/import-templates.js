
window.onload = function () {
	/* Import Header */
	const headerLink = document.querySelector('#headerTemplate');
	const headerContent = headerLink.import;

	const headerSel = headerContent.querySelector('header');
	const selector = document.getElementById('header');
	selector.appendChild(headerSel.cloneNode(true));

	/* Import Card Template */
	const cardLink = document.querySelector('#cardTemplate');
	const cardContent = cardLink.import;

	const cardSel = cardContent.querySelector('#movieCard');
	document.body.appendChild(cardSel.cloneNode(true));

	/* Import Quick View Template */
	const viewLink = document.querySelector('#viewTemplate');
	const viewContent = viewLink.import;

	const viewSel = viewContent.querySelector('#quick_view');
	document.body.appendChild(viewSel.cloneNode(true));
};


