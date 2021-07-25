import axios from 'axios';
import Notiflix from 'notiflix';
import cardTmt from './templates/cardTmt.hbs';


export default class ApiService {

    constructor() {
        this.text = '';
        this.page = 1;
    }
    
    async fetchPictures() {
    const BASE_URL = 'https://pixabay.com/api/?key=';
    const API_KEY = '22628996-cf4023f9c883b96dd8e407c0b';
    const searchParams = new URLSearchParams({
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    })
    try {
        return await axios.get(`${BASE_URL}${API_KEY}&q=${this.text}&${searchParams}&page=${this.page}`).then(r => {
            this.pageIncrement();
            return r.data;
        });   
    } catch(error){
         console.log(error);
    }
    }

    get word() {
        return this.text;
    }

    set word(newData) {
        this.text = newData;
    }

    resetPage() {
        this.page = 1;
    }

    pageIncrement() {
        this.page += 1;
    }
}