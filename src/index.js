import './sass/main.scss';
import Notiflix from 'notiflix';
import cardTmt from './templates/cardTmt.hbs';
import axios from 'axios';
import ApiService from './api';
import SimpleLightbox from 'simplelightbox';

const refs = {
    searchForm: document.querySelector('#search-form'),
    galleryForm: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
};
const lightbox = new SimpleLightbox('.photo-card a');

// Создаю экземпляр класса
const Api = new ApiService();

// При нажатии на кнопку поиска
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

//Функция создания разметки
function createMarkup(data) {  
    refs.galleryForm.insertAdjacentHTML('beforeend', cardTmt(data.hits));
    lightbox.refresh();
}

// При нажатии на кнопку "Загрузить еще"
function onLoadMoreBtnClick() {
    Api.fetchPictures().then(data => {
        createMarkup(data);
        lightbox.refresh();
        smoothScroll();
        return data
    }).then(data => {
        if(data.hits.length < 40){
           Notiflix.Notify.info(`We're sorry, but you've reached the end of search results`);
           refs.loadMoreBtn.classList.remove('is-visible');
       }
    });


}

refs.searchForm.addEventListener('submit', onSearchInput)
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick)

// Функция очистки галереи
function resetSearchWord() {
    refs.galleryForm.innerHTML = '';
}

function smoothScroll() {
const { height: cardHeight } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();
   window.scrollBy({
   top: cardHeight * 1.5,
   behavior: 'smooth',
   });
}