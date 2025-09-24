import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const searchInput = form.querySelector('input[name="search-text"]');
const loadMoreBtn = document.querySelector('.load-more');

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;
const perPage = 15;

form.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onFormSubmit(event) {
  event.preventDefault();

  const query = searchInput.value.trim();

  if (query === '') {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term!',
      position: 'topRight',
      timeout: 3000,
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;
  clearGallery();
  hideLoadMoreButton();

  await searchImages();
  searchInput.value = '';
}

async function onLoadMore() {
  currentPage += 1;
  await searchImages();

  scrollPage();
}

async function searchImages() {
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    hideLoader();
    totalHits = data.totalHits;

    if (data.hits.length === 0 && currentPage === 1) {
      iziToast.info({
        title: 'No results',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        timeout: 4000,
      });
      return;
    }

    createGallery(data.hits);

    if (currentPage === 1) {
      iziToast.success({
        title: 'Success',
        message: `Found ${totalHits} images!`,
        position: 'topRight',
        timeout: 2000,
      });
    }

    const totalPages = Math.ceil(totalHits / perPage);

    if (currentPage < totalPages) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();

      if (currentPage > 1) {
        iziToast.info({
          title: 'End of results',
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
          timeout: 4000,
        });
      }
    }
  } catch (error) {
    hideLoader();
    console.error('Error:', error);
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong! Please try again later.',
      position: 'topRight',
      timeout: 4000,
    });
  }
}

function scrollPage() {
  const galleryItems = document.querySelectorAll('.gallery__item');

  if (galleryItems.length > 0) {
    const cardHeight = galleryItems[0].getBoundingClientRect().height;

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}
