import {createFavoriteButtonPresenterWithRestaurant}
  from './helpers/test-factories';
import FavoriteResto from '../src/scripts/models/favorite';

describe('Unliking A Restaurant', () => {
  beforeEach(async () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
    await FavoriteResto.putResto({id: 1});
  });

  afterEach(async () => {
    await FavoriteResto.deleteResto(1);
  });

  it('should display unlike widget ' +
     'when the restaurant has been liked', async () => {
    await createFavoriteButtonPresenterWithRestaurant({id: 1});

    expect(document.querySelector('[aria-label="unlike this restaurant"]'))
        .toBeTruthy();
  });

  it('should not display like widget ' +
     'when the restaurant has been liked', async () => {
    await createFavoriteButtonPresenterWithRestaurant({id: 1});

    expect(document.querySelector('[aria-label="like this restaurant"]'))
        .toBeFalsy();
  });

  it('should be able to remove liked restaurant from the list', async () => {
    await createFavoriteButtonPresenterWithRestaurant({id: 1});

    document.querySelector('[aria-label="unlike this restaurant"]')
        .dispatchEvent(new Event('click'));

    expect(await FavoriteResto.getAllRestos()).toEqual([]);
  });

  it('should not throw error ' +
     'if the unliked restaurant is not in the list', async () => {
    await createFavoriteButtonPresenterWithRestaurant({id: 1});
    await FavoriteResto.deleteResto(1);
    document.querySelector('[aria-label="unlike this restaurant"]')
        .dispatchEvent(new Event('click'));
    expect(await FavoriteResto.getAllRestos()).toEqual([]);
  });
});
