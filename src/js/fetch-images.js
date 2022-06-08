// // mport axios from 'axios';


import axios from 'axios'
export { fetchImages }

axios.defaults.baseURL = 'https://pixabay.com/api/'
const KEY = '27922641-8aa18af1ebcd572ad57d8e8c8';

async function fetchImages(query, page, perPage) {
    const response = await axios.get(
        `?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`,
    )
    return response
}


// export class UnsplashApi {
//     #BASE_URL = 'https://pixabay.com/api/';
//     #API_KEY = '27922641-8aa18af1ebcd572ad57d8e8c8';

//     constructor() {
//         this.query = null;
//         this.page = 1;
//     }

//     fetchPhotos() {
//         return axios.get('/search/photos', {
//             baseURL: this.#BASE_URL,
//             params: {
//                 query: this.query,
//                 page: this.page,
//                 per_page: 12,
//                 orientation: 'portrait',
//                 client_id: this.#API_KEY,
//             },
//         });
//     }

//     fetchRandomPhotos() {
//         return axios.get(`${this.#BASE_URL}/photos/random`, {
//             params: {
//                 count: 12,
//                 orientation: 'portrait',
//                 client_id: this.#API_KEY,
//             },
//         });
//     }

//     incrementPage() {
//         this.page += 1;
//     }
// }


