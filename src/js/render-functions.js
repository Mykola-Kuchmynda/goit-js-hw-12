import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const loader = document.querySelector('.loader');

let lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 });

export function createGallery(images) {
    const markup = images.map(({ webformatURL, largeImageURL, tags }) => `
        <li class="gallery-item"> <a href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" loading="lazy">
            </a>
        </li>
    `).join('');

    gallery.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
}

export function clearGallery() {
    gallery.innerHTML = '';
}

export function showLoader() {
    loader.classList.remove('hidden');
}

export function hideLoader() {
    loader.classList.add('hidden');
}

export function showLoadMoreButton() {
    loadMoreBtn.classList.remove('hidden');
    document.querySelector('.load-more').style.display = 'block';
}

export function hideLoadMoreButton() {
    loadMoreBtn.classList.add('hidden');
    document.querySelector('.load-more').style.display = 'none';
}


