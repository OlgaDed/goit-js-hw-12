import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const searchInput = form.querySelector('input[name="search-text"]');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
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

  clearGallery();

  showLoader();

  console.log('Starting search for:', query);
  getImagesByQuery(query)
    .then(data => {
      console.log('Search completed, data received:', data);

      hideLoader();

      if (data.hits.length === 0) {
        console.log('No images found');
        iziToast.info({
          title: 'No results',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
          timeout: 4000,
        });
        return;
      }

      console.log('Creating gallery with', data.hits.length, 'images');

      createGallery(data.hits);

      iziToast.success({
        title: 'Success',
        message: `Found ${data.hits.length} images!`,
        position: 'topRight',
        timeout: 2000,
      });
    })
    .catch(error => {
      hideLoader();

      console.error('Error:', error);

      iziToast.error({
        title: 'Error',
        message: 'Something went wrong! Please try again later.',
        position: 'topRight',
        timeout: 4000,
      });
    });

  searchInput.value = '';
}
