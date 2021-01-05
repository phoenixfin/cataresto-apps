import {openDB} from 'idb';
import CONFIG from '../helper/config';

const {DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME} = CONFIG;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, {keyPath: 'id'});
  },
});

const FavoriteResto = {
  async getResto(id) {
    if (id) {
      return (await dbPromise).get(OBJECT_STORE_NAME, id);
    }
  },
  async getAllRestos() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  },
  async putResto(resto) {
    if (resto.hasOwnProperty('id')) {
      return (await dbPromise).put(OBJECT_STORE_NAME, resto);
    }
  },
  async deleteResto(id) {
    return (await dbPromise).delete(OBJECT_STORE_NAME, id);
  },
};
export default FavoriteResto;
