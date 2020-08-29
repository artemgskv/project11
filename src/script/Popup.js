export class Popup {
  constructor(popup, popupCloseButton) {
    this._popup = popup;
    this._popupCloseButton = popupCloseButton;
    this.close = this.close.bind(this);
  }

  _setEventListeners() {
    this._popupCloseButton.addEventListener('click', this.close);
  }

  _removeEventListeners() {
    this._popupCloseButton.removeEventListener('click', this.close);
  }

  open() {
    this._popup.classList.add('popup_is-opened');
    this._setEventListeners();
  }

  close() {
    this._popup.classList.remove('popup_is-opened');
    this._removeEventListeners();
  }
}
