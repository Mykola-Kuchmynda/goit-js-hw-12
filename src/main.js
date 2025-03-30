import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more'); 

let query = '';
let page = 1;
let totalHits = 0;
let loadedImages = 0;

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  query = event.target.elements.query.value.trim(); 
  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query!',
    });
    return;
  }

  page = 1;
  loadedImages = 0;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    totalHits = data.totalHits;
    loadedImages += data.hits.length;

    if (totalHits === 0) {
      iziToast.info({
        title: 'Info',
        message: 'No images found. Try a different search!',
      });
      return;
    }

    createGallery(data.hits);
    
    if (loadedImages < totalHits) {
      showLoadMoreButton();
    }

  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Try again later!',
    });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    loadedImages += data.hits.length;
    createGallery(data.hits);

    
    const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    if (loadedImages >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Try again later!',
    });
  } finally {
    hideLoader();
  }
});