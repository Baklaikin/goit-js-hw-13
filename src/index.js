import './sass/main.scss';
import Notiflix from 'notiflix';
// import Handlebars from 'handlebars';
import cardTmt from './templates/cardTmt.hbs';
import axios from 'axios';
import ApiService from './api';

const refs = {
    searchForm: document.querySelector('#search-form'),
    galleryForm: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
};

const Api = new ApiService();

function onSearchInput(e) {
    e.preventDefault();
    resetSearchWord();
    Api.word = e.currentTarget.elements.searchQuery.value;
    Api.resetPage();
    Api.fetchPictures().then(data => {
        createMarkup(data);
        return data;
    }).then(data => {
       if (data.totalHits === 0) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
    } else {
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
        refs.loadMoreBtn.classList.add('is-visible');
    }
    });
}

function createMarkup(data) {  
    refs.galleryForm.insertAdjacentHTML('beforeend', cardTmt(data.hits));
}
function onLoadMoreBtnClick() {
    Api.fetchPictures().then(data => {
        createMarkup(data);
        return data
    }).then(data => {
        if(data.hits.length < 40){
           Notiflix.Notify.success(`We're sorry, but you've reached the end of search results`);
           refs.loadMoreBtn.classList.remove('is-visible');
       }
    });   
}

refs.searchForm.addEventListener('submit', onSearchInput)
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick)


function resetSearchWord() {
    refs.galleryForm.innerHTML = '';
}