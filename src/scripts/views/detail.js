import RestaurantDbSource from '../models/restaurant';
import {UrlParser} from '../helper/router';
import {createDetailedResto} from './template';
import FavButtonPresenter from './favorite-button';
import FavoriteResto from '../models/favorite';

const Detail = {
  async render() {
    return `
      <div class="resto-detail"></div>
      <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    // lazy load font awesome
    let scriptElement = document.querySelector('script[src="https://use.fontawesome.com/b070c8f1df.js"]');

    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.src = 'https://use.fontawesome.com/b070c8f1df.js';
      document.body.appendChild(scriptElement);
    }

    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const resto = await RestaurantDbSource.detailRestaurant(url.id);
    const restoContainer = document.querySelector('.resto-detail');
    const imageUrl = RestaurantDbSource.getImageUrl('large', resto.pictureId);
    restoContainer.innerHTML = createDetailedResto(resto, imageUrl);

    FavButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteResto: FavoriteResto,
      resto: {
        id: resto.id,
        name: resto.name,
        city: resto.city,
        description: resto.description,
        pictureId: resto.pictureId,
        rating: resto.rating,
      },
    });
  },
};

export default Detail;
