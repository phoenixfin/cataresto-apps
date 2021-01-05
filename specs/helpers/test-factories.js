import FavButtonPresenter from '../../src/scripts/views/favorite-button';
import FavoriteResto from '../../src/scripts/models/favorite';

const createFavoriteButtonPresenterWithRestaurant = async (restaurant) => {
  await FavButtonPresenter.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'),
    favoriteResto: FavoriteResto,
    resto: restaurant,
  });
};

export {createFavoriteButtonPresenterWithRestaurant};
