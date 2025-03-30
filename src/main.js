import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');

let searchQuery = '';
let currentPage = 1;

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    searchQuery = event.currentTarget.query.value.trim();
    if (!searchQuery) {
        iziToast.warning({ title: 'Warning', message: 'Please enter a search query' });
        return;
    }

    currentPage = 1;
    clearGallery();
    hideLoadMoreButton();
    showLoader();

    try {
        const { hits, totalHits } = await getImagesByQuery(searchQuery, currentPage);

        if (hits.length === 0) {
            iziToast.error({ title: 'Error', message: 'No images found. Try another search term.' });
            return;
        }

        createGallery(hits);

        if (totalHits > hits.length) {
            showLoadMoreButton();
        }
    } catch (error) {
        iziToast.error({ title: 'Error', message: 'Failed to fetch images. Please try again.' });
    } finally {
        hideLoader();
    }
});

loadMoreBtn.addEventListener('click', async () => {
    currentPage++;
    hideLoadMoreButton();
    showLoader();

    try {
        const { hits, totalHits } = await getImagesByQuery(searchQuery, currentPage);
        
        if (hits.length === 0) {
            iziToast.info({ title: 'Info', message: 'No more images to load.' });
            return;
        }

        createGallery(hits);

        const totalLoadedImages = document.querySelectorAll('.gallery-item').length;
        if (totalLoadedImages >= totalHits) {
            iziToast.info({ title: 'Info', message: 'You have reached the end of search results.' });
            hideLoadMoreButton();
        } else {
            showLoadMoreButton();
        }

        // Прокручування сторінки
        const gallery = document.querySelector('.gallery');
        const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
        window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });

    } catch (error) {
        iziToast.error({ title: 'Error', message: 'Failed to fetch more images.' });
    } finally {
        hideLoader();
    }
});