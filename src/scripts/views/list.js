import {createRestoContainer, createRestoItem} from './template';
import RestaurantDbSource from '../models/restaurant';
import FavoriteResto from '../models/favorite';

function implementData(restaurants) {
  const restoDiv = document.querySelector('#restaurants');
  restoDiv.innerHTML = '';
  restaurants.forEach((resto) => {
    const imageUrl = RestaurantDbSource.getImageUrl('small', resto.pictureId);
    restoDiv.innerHTML += createRestoItem(resto, imageUrl);
  });
}

const RestoAllList = {
  async render() {
    return await createRestoContainer('Explore Restaurant');
  },

  async afterRender() {
    const restaurants = await RestaurantDbSource.listAllRestaurants();
    implementData(restaurants);
  },
};

const FavoriteList = {
  async render() {
    return createRestoContainer('Favorite Restaurant');
  },

  async afterRender() {
    const restaurants = await FavoriteResto.getAllRestos();
    if (restaurants.length) {
      implementData(restaurants);
    } else {
      const restoDiv = document.querySelector('#restaurants');
      restoDiv.innerHTML = `
        <div class="resto__empty">
            No restaurant listed
        </div>
      `;
    }
  },
};


export {
  FavoriteList,
  RestoAllList,
};
