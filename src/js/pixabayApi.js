import axios from 'axios';

export class PixabayApi {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '27922641-8aa18af1ebcd572ad57d8e8c8';
  #page = 0;

  constructor() {}

  getPictures(query) {
    this.#increasePage();

    return axios.get(`${this.#BASE_URL}`, {
      params: {
        key: this.#API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: this.#page,
        per_page: 40,
      },
    });
  }

  getPageNumber() {
    return this.#page;
  }

  resetPageNumber() {
    this.#page = 0;
  }

  #increasePage() {
    this.#page += 1;
  }
}
