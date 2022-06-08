import axios from "axios";
// axios.get('/users')
//     .then(res => {
//         console.log(res.data);
//     });
import Notiflix from 'notiflix';
// import card from './templates/gallery-card.hbs';
import { fetchImages } from './js/fetch-images'
import { renderGallery } from './js/render-gallery'
// import { onSearchFormSubmit} from './js/galleryInfiniteScroll'
import SimpleLightbox from 'simplelightbox'
import 'simplelightbox/dist/simple-lightbox.min.css'

const searchForm = document.querySelector('#search-form')
const gallery = document.querySelector('.gallery')
const loadMoreBtn = document.querySelector('.btn-load-more')
let query = ''
let page = 1
let simpleLightBox
const perPage = 40

searchForm.addEventListener('submit', onSearchForm)
loadMoreBtn.addEventListener('click', onLoadMoreBtn)


function onSearchForm(event) {
    event.preventDefault()
    window.scrollTo({ top: 0 })
    page = 1
    query = event.currentTarget.searchQuery.value.trim()
    gallery.innerHTML = ''
    loadMoreBtn.classList.add('is-hidden')

    if (query === '') {
        alertNoEmptySearch()
        return
    }

    fetchImages(query, page, perPage)
        .then(({ data }) => {
            if (data.totalHits === 0) {
                alertNoImagesFound()
            } else {
                renderGallery(data.hits)
                simpleLightBox = new SimpleLightbox('.gallery a').refresh()
                alertImagesFound(data)

                if (data.totalHits > perPage) {
                    loadMoreBtn.classList.remove('is-hidden')
                }
            }
        })
        .catch(error => console.log(error))
}

function onLoadMoreBtn() {
    page += 1
    simpleLightBox.destroy()

    fetchImages(query, page, perPage)
        .then(({ data }) => {
            renderGallery(data.hits)
            simpleLightBox = new SimpleLightbox('.gallery a').refresh()

            const totalPages = Math.ceil(data.totalHits / perPage)

            if (page > totalPages) {
                loadMoreBtn.classList.add('is-hidden')
                alertEndOfSearch()
            }
        })
        .catch(error => console.log(error))
}

const toTopBtn = document.querySelector('.btn-to-top')

window.addEventListener('scroll', onScroll)
toTopBtn.addEventListener('click', onToTopBtn)

function onScroll() {
    const scrolled = window.pageYOffset
    const coords = document.documentElement.clientHeight

    if (scrolled > coords) {
        toTopBtn.classList.add('btn-to-top--visible')
    }
    if (scrolled < coords) {
        toTopBtn.classList.remove('btn-to-top--visible')
    }
}

function onToTopBtn() {
    if (window.pageYOffset > 0) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
}



function alertImagesFound(data) {
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`)
}

function alertNoEmptySearch() {
    Notiflix.Notify.failure('The search string cannot be empty. Please specify your search query.')
}

function alertNoImagesFound() {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
}

function alertEndOfSearch() {
    Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
}