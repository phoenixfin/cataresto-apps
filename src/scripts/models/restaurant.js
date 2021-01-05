import CONFIG from '../helper/config';

const API_ENDPOINT = {
  all: () => `${CONFIG.BASE_URL}list`,
  detail: (id) => `${CONFIG.BASE_URL}detail/${id}`,
  image: (size, pictureId) => `${CONFIG.BASE_URL}images/${size}/${pictureId}`,
};

class RestaurantDbSource {
  static async listAllRestaurants() {
    const response = await fetch(API_ENDPOINT.all());
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async detailRestaurant(id) {
    const response = await fetch(API_ENDPOINT.detail(id));
    const responseJson = await response.json();
    return responseJson.restaurant;
  }

  static getImageUrl(size, pictureId) {
    return API_ENDPOINT.image(size, pictureId);
  }
}

export default RestaurantDbSource;

