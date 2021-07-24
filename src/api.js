export default class ApiService {
    constructor(text) {
        this.text = text;
    }

    async fetchPictures() {
        try {
            const result = await fetch(`${BASE_URL}${API_KEY}&q=${this.text}&${searchParams}&page=${page}`)
            // console.log(result);
            const picturesObj = await result.json();
            page += 1;
            const { totalHits } = picturesObj;
            Notiflix.Notify.success(`${totalHits}`);
            const pictures = picturesObj.hits;
            createMarkup(pictures);
            return page;
        } catch (error) {
            console.log(error);
        }
    }

    get text() {
        return this.text;
    }

    set text(newData) {
        this.text = newData;
    }
}