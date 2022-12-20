import { PixabayApi } from './pixabayApi';
import Notiflix from 'notiflix';
import createMarkup from '../templates/gallery-card.hbs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const btnLoadMoreEl = document.querySelector('.load-more');

btnLoadMoreEl.style.display = 'none';

const pixabayApi = new PixabayApi();
let query = '';
let lightbox = null;

const onSearch = async e => {
  e.preventDefault();

  galleryEl.innerHTML = '';
  btnLoadMoreEl.style.display = 'none';

  query = e.target.elements.searchQuery.value.trim();

  pixabayApi.resetPageNumber();

  if (!query) {
    return;
  }

  try {
    const {
      data: { hits, totalHits },
    } = await pixabayApi.getPictures(query);

    if (!hits.length) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);

    const markup = createMarkup(hits);

    galleryEl.innerHTML = '';
    galleryEl.insertAdjacentHTML('beforeend', markup);
    btnLoadMoreEl.style.display = 'block';

    lightbox = new SimpleLightbox('.gallery a');

    if (pixabayApi.getPageNumber() * 40 > totalHits) {
      btnLoadMoreEl.style.display = 'none';
      Notiflix.Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );

      pixabayApi.resetPageNumber();
    }
  } catch (err) {
    console.log(err);
  }
};

const onLoadMore = async e => {
  try {
    const {
      data: { hits, totalHits },
    } = await pixabayApi.getPictures(query);

    if (!hits.length) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    const markup = createMarkup(hits);

    galleryEl.insertAdjacentHTML('beforeend', markup);
    btnLoadMoreEl.style.display = 'block';

    lightbox.refresh();

    if (pixabayApi.getPageNumber() * 40 > totalHits) {
      btnLoadMoreEl.style.display = 'none';
      Notiflix.Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );

      pixabayApi.resetPageNumber();
    }
  } catch (err) {
    console.log(err);
  }
};

formEl.addEventListener('submit', onSearch);

btnLoadMoreEl.addEventListener('click', onLoadMore);
