import {createFavoriteButton} from './template';

const FavButtonPresenter = {
  async init({likeButtonContainer, favoriteResto, resto}) {
    this._likeButtonContainer = likeButtonContainer;
    this._resto = resto;
    this._favoriteResto = favoriteResto;
    await this._renderButton();
  },

  async _renderButton() {
    const {id} = this._resto;
    const isFavorite = await this._isRestoFavorite(id);
    this._likeButtonContainer.innerHTML = createFavoriteButton(isFavorite);
    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      if (isFavorite) {
        await this._favoriteResto.deleteResto(this._resto.id);
      } else {
        await this._favoriteResto.putResto(this._resto);
      }
      this._renderButton();
    });
  },

  async _isRestoFavorite(id) {
    const resto = await this._favoriteResto.getResto(id);
    return !!resto;
  },
};

export default FavButtonPresenter;
