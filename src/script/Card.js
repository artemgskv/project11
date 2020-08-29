export class Card {
    constructor(name, link, imagePopupCreate, template) {
      this._name = name;
      this._link = link;
      this._imagePopupCreate = imagePopupCreate;
      this._template = template;
      this._like = this._like.bind(this);
      this._remove = this._remove.bind(this);
    }

    _like() {
      this.likeIcon.classList.toggle('place-card__like-icon_liked');
    }

    _remove() {
      this.removeEventListeners();
      this._view.remove();
    }

    create() {
      this._view = this._template.cloneNode(true);
      this._view.querySelector('.place-card__name').textContent = this._name;
      this._view.querySelector('.place-card__image').style.backgroundImage = `url(${this._link})`;
      this._view.querySelector('.place-card__image').dataset.url = this._link;
      this.likeIcon = this._view.querySelector('.place-card__like-icon');
      this.deleteIcon = this._view.querySelector('.place-card__delete-icon');
      this.cardImage = this._view.querySelector('.place-card__image');
      this.setEventListeners();

      return this._view
    }

    zoomImg = () => {
      this._imagePopupCreate(this._link);
    }

    setEventListeners() {
        this.likeIcon.addEventListener('click', this._like);
        this.deleteIcon.addEventListener('click', this._remove);
        this.cardImage.addEventListener('click', this.zoomImg);
      }

    removeEventListeners() {
        this.likeIcon.removeEventListener('click', this._like);
        this.deleteIcon.removeEventListener('click', this._remove);
        this.cardImage.removeEventListener('click', this.zoomImg);
    }
  }

