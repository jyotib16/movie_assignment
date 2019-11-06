
export const API_KEY = '289d5cc6f906a05d0910f4114c41bf6b';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500/';

/* Import Header */
let headerLink = document.querySelector('#headerTemplate');
let headerContent = headerLink.import;

let headerSel = headerContent.querySelector('header');
let selector = document.getElementById('header');
selector.appendChild(headerSel.cloneNode(true));

/* Import Card Template */
let cardLink = document.querySelector('#cardTemplate');
let cardContent = cardLink.import;

let cardSel = cardContent.querySelector('#movieCard');
document.body.appendChild(cardSel.cloneNode(true));

/* Import Quick View Template */
let viewLink = document.querySelector('#viewTemplate');
let viewContent = viewLink.import;

let viewSel = viewContent.querySelector('#quick_view');
document.body.appendChild(viewSel.cloneNode(true));
