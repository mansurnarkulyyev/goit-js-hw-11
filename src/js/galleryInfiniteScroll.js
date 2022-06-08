
// // console.log('hello');
// import { UnsplashApi } from './fetch-images.js';
// import createGalleryCards from '../templates/gallery-cards.hbs';

// const searchFormEl = document.querySelector('.js-search-form');
// const galleryListEl = document.querySelector('.js-gallery');

// const unsplashApi = new UnsplashApi();

// const intersectionObserverOptions = {
//     root: null,
//     rootMargin: '0px 0px 200px 0px',
//     threshold: 1.0,
// };

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

// const intersectionObserver = new IntersectionObserver((entries, observe) => {
//     entries.forEach(async entry => {
//         if (!entry.isIntersecting) {
//             return;
//         }

//         unsplashApi.incrementPage();

//         try {
//             const { data } = await unsplashApi.fetchPhotos();

//             galleryListEl.insertAdjacentHTML(
//                 'beforeend',
//                 createGalleryCards(data.results)
//             );

//             if (unsplashApi.page === data.total_pages) {
//                 intersectionObserver.unobserve(
//                     document.querySelector('.target-element')
//                 );
//             }
//         } catch (err) {
//             console.log(err);
//         }
//     });
// }, intersectionObserverOptions);

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

//export default const onSearchFormSubmit = async event => {
//     event.preventDefault();

//     unsplashApi.query = event.currentTarget.elements['user-search-query'].value
//         .trim()
//         .toLowerCase();
//     unsplashApi.page = 1;

//     try {
//         const { data } = await unsplashApi.fetchPhotos();

//         if (!data.results.length) {
//             galleryListEl.innerHTML = '';
//             return;
//         }

//         galleryListEl.innerHTML = createGalleryCards(data.results);

//         intersectionObserver.observe(document.querySelector('.target-element'));
//     } catch (err) {
//         console.log(err);
//     }
// };

// // const onLoadMoreBtnElClick = async event => {
// //   unsplashApi.incrementPage();

// //   try {
// //     const { data } = await unsplashApi.fetchPhotos();

// //     galleryListEl.insertAdjacentHTML(
// //       'beforeend',
// //       createGalleryCards(data.results)
// //     );

// //     if (unsplashApi.page === data.total_pages) {
// //       event.target.classList.add('is-hidden');
// //     }
// //   } catch (err) {
// //     console.log(err);
// //   }
// // };

// searchFormEl.addEventListener('submit', onSearchFormSubmit);

// renderRandomPhotos();