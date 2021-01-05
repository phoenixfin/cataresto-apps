import {createFavoriteButtonPresenterWithRestaurant}
  from './helpers/test-factories';
import FavoriteResto from '../src/scripts/models/favorite';

describe('Restaurant Liker', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  });

  it('should show the like button ' +
     'when the restaurant has not been liked before', async () => {
    await createFavoriteButtonPresenterWithRestaurant({id: 1});

    expect(document.querySelector('[aria-label="like this restaurant"]'))
        .toBeTruthy();
  });

  it('should not show the unlike button ' +
     'when the restaurant has not been liked before', async () => {
    await createFavoriteButtonPresenterWithRestaurant({id: 1});

    expect(document.querySelector('[aria-label="unlike this restaurant"]'))
        .toBeFalsy();
  });

  it('should be able to like the restaurant', async () => {
    await createFavoriteButtonPresenterWithRestaurant({id: 1});

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    const restaurant = await FavoriteResto.getResto(1);
    expect(restaurant).toEqual({id: 1});

    FavoriteResto.deleteResto(1);
  });

  it('should not add a restaurant again when its already liked', async () => {
    await createFavoriteButtonPresenterWithRestaurant({id: 1});
    await FavoriteResto.putResto({id: 1});
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    expect(await FavoriteResto.getAllRestos()).toEqual([{id: 1}]);

    FavoriteResto.deleteResto(1);
  });

  it('should not add a restaurant when it has no id', async () => {
    await createFavoriteButtonPresenterWithRestaurant({});

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    expect(await FavoriteResto.getAllRestos()).toEqual([]);
  });
});
