export class UserInfo {
  constructor(userElement, jobElement) {
    this._userElement = userElement;
    this._jobElement = jobElement;
  }

  setUserInfo(res) {
    this._user = res.name;
    this._info = res.about;
  }

  updateUserInfo() {
    this._userElement.textContent = this._user;
    this._jobElement.textContent = this._info;
  
  }
}
