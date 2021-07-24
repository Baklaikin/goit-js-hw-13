import './sass/main.scss';
import Notiflix from 'notiflix';
import Handlebars from 'handlebars';
import cardTmt from './templates/cardTmt.hbs';
import axios from 'axios';


const BASE_URL = 'https://pixabay.com/api/?key=';
const API_KEY = '22628996-cf4023f9c883b96dd8e407c0b';
const searchParams = new URLSearchParams({
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    
})

const refs = {
    searchForm: document.querySelector('#search-form'),
    galleryForm: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
};

let page = 1;
let text = '';


function onSearchInput(e) {
    e.preventDefault();
    resetSearchWord()
    const form = e.currentTarget;
    text = form.elements.searchQuery.value;
    fetchPictures(text);
    return text;
}
async function fetchPictures(text) {
    try {
        const pictures = await axios.get(`${BASE_URL}${API_KEY}&q=${text}&${searchParams}&page=${page}`)
        const { totalHits, hits } = pictures.data;
        Notiflix.Notify.success(`${totalHits}`);
        createMarkup(hits);
        page += 1;
        return page, totalHits;
    } catch(error){
         console.log(error);
    }
}

const createMarkup = hits => {
    refs.galleryForm.insertAdjacentHTML('beforeend', cardTmt(hits));
}
function onLoadMoreBtnClick() {
    fetchPictures(text);    
}

refs.searchForm.addEventListener('submit', onSearchInput)
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick)


function resetSearchWord() {
    page = 1;
    text = '';
    refs.galleryForm.innerHTML = '';
}