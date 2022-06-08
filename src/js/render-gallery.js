export { renderGallery }
// import createGalleryCards from '../templates/gallery-cards.hbs';

const gallery = document.querySelector('.gallery')
const galleryEl = document.querySelector('.gallery .a')

function renderGallery(images) {
  const markup = images
    .map(image => {
      const { id, largeImageURL, webformatURL, tags, likes, views, comments, downloads } = image
      return `
      <a class="gallery__link" href="${largeImageURL}">
        <div class="gallery-item" id="${id}">
          <img class="gallery-item__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
          <div class="info">
            <p class="info-item"><b>Likes</b>${likes}</p>
            <p class="info-item"><b>Views</b>${views}</p>
            <p class="info-item"><b>Comments</b>${comments}</p>
            <p class="info-item"><b>Downloads</b>${downloads}</p>
          </div>
        </div>
      </a>
    `
    })
    .join('')

  gallery.insertAdjacentHTML('beforeend', markup)
}



// import { UnsplashApi } from './fetch-images.js';
// // import createGalleryCards from '../templates/gallery-card.hbs';

// const searchFormEl = document.querySelector('.js-search-form');
// const galleryListEl = document.querySelector('.js-gallery');
// const loadMoreBtnEl = document.querySelector('.js-load-more');

// const unsplashApi = new UnsplashApi();

// const mutationObserver = new MutationObserver(mutationRecord => {
//     mutationRecord.forEach(mutation => {
//         const galleryElements = [...mutation.addedNodes].filter(
//             galleryNodeItem => galleryNodeItem.nodeName !== '#text'
//         );

//         setTimeout(() => {
//             galleryElements.forEach(galleryElement => {
//                 galleryElement.classList.add('appear');
//             });
//         }, 0);
//     });
// });

// mutationObserver.observe(galleryListEl, {
//     childList: true,
// });

// const renderRandomPhotos = async () => {
//     try {
//         const { data } = await unsplashApi.fetchRandomPhotos();

//         galleryListEl.innerHTML = createGalleryCards(data);
//     } catch (err) {
//         console.log(err);
//     }
// };

// const onSearchFormSubmit = async event => {
//     event.preventDefault();

//     unsplashApi.query = event.currentTarget.elements['user-search-query'].value
//         .trim()
//         .toLowerCase();
//     unsplashApi.page = 1;

//     try {
//         const { data } = await unsplashApi.fetchPhotos();

//         if (!data.results.length) {
//             loadMoreBtnEl.classList.add('is-hidden');
//             galleryListEl.innerHTML = '';
//             return;
//         }

//         galleryListEl.innerHTML = createGalleryCards(data.results);

//         loadMoreBtnEl.classList.remove('is-hidden');
//     } catch (err) {
//         console.log(err);
//     }
// };

// const onLoadMoreBtnElClick = async event => {
//     unsplashApi.incrementPage();

//     try {
//         const { data } = await unsplashApi.fetchPhotos();

//         galleryListEl.insertAdjacentHTML(
//             'beforeend',
//             createGalleryCards(data.results)
//         );

//         if (unsplashApi.page === data.total_pages) {
//             event.target.classList.add('is-hidden');
//         }
//     } catch (err) {
//         console.log(err);
//     }
// };

// searchFormEl.addEventListener('submit', onSearchFormSubmit);
// loadMoreBtnEl.addEventListener('click', onLoadMoreBtnElClick);

// renderRandomPhotos();