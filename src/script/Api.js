export class Api {
    constructor(config) {
        this.url = config.url;
        this.headers = config.headers;
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }
//Получение информации о пользователе
    getUserData() {
        return fetch(`${this.url}/users/me`, {
            headers: this.headers
        })
            .then((res) => this._getResponseData(res));

    }
//Смена имени и профессии пользователя на сервере
    changeUserData(name, about) {
        return fetch(`${this.url}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: name,
                about: about,

            })
        })
            .then((res) => this._getResponseData(res));
    }
//Получение карточек с сервера
getData() {
  return fetch(`${this.url}/cards`, {
      headers: this.headers
  })
      .then((res) => this._getResponseData(res));
}
}
