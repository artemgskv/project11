import {Popup} from './Popup.js'
export class ImagePopup extends Popup {
    constructor(container, popupCloseButton, background) {
      super(container, popupCloseButton)
      this._background = background;
    }

    openImage(img) {
      this._background.src = img;
      this.open();
    }
  }
