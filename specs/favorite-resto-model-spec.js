import {itActsAsFavoriteRestoModel} from './contract/favorite-resto-contract';
import FavoriteResto from '../src/scripts/models/favorite';

describe('Favorite Resto Contract Test Implementation', () => {
  afterEach(async () => {
    (await FavoriteResto.getAllRestos()).forEach(async (resto) => {
      await FavoriteResto.deleteResto(resto.id);
    });
  });

  itActsAsFavoriteRestoModel(FavoriteResto);
});
