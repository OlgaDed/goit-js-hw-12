import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '52420757-6c873b078c0d8d7d71d7f24d9';

export function getImagesByQuery(query) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
  };

  return axios
    .get(BASE_URL, { params })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error('Error fetching images:', error);
      throw error;
    });
}
