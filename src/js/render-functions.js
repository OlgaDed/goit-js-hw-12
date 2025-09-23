import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const galleryEl = document.querySelector('.gallery');
  if (!galleryEl) return;

  const markup = images
    .map(
      img => `
      <li class="gallery__item">
        <a class="gallery__link" href="${img.largeImageURL}">
          <div class="photo-card">
            <img 
              class="photo-card__image" 
              src="${img.webformatURL}" 
              alt="${img.tags}" 
              loading="lazy" 
            />
            <div class="info">
              <p class="info-item">
                <b>Likes</b>
                <span>${img.likes}</span>
              </p>
              <p class="info-item">
                <b>Views</b>
                <span>${img.views}</span>
              </p>
              <p class="info-item">
                <b>Comments</b>
                <span>${img.comments}</span>
              </p>
              <p class="info-item">
                <b>Downloads</b>
                <span>${img.downloads}</span>
              </p>
            </div>
          </div>
        </a>
      </li>
    `
    )
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();
}

export function clearGallery() {
  const galleryEl = document.querySelector('.gallery');
  if (galleryEl) {
    galleryEl.innerHTML = '';
  }
}

export function showLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.classList.add('is-active');
    loader.setAttribute('aria-hidden', 'false');
  }
}

export function hideLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.classList.remove('is-active');
    loader.setAttribute('aria-hidden', 'true');
  }
}
