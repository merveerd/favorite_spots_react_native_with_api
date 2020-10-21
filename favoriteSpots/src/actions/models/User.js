const APIService = require("../APIService");

class User extends APIService {
  constructor(props) {
    super();
    this.mainRoute = "users";
  }

  getList(requestParams, callbackFn) {
    return this.get(this.mainRoute, requestParams, callbackFn);
  }

  getUserById(requestParams, callbackFn) {
    return this.get(
      this.mainRoute + "/" + requestParams.id,
      requestParams,
      callbackFn,
    );
  }

  deleteUserById(requestParams, callbackFn) {
    return this.delete(
      this.mainRoute + "/" + requestParams.id,
      requestParams,
      callbackFn,
    );
  }

  postUser(requestParams, dispatch, start, success, failed, callbackFn) {
    return this.post(
      this.mainRoute + "/" + requestParams.id,
      requestParams,
      callbackFn,
    );
  }

  patchUser(requestParams, callbackFn) {
    return this.patch(
      this.mainRoute + "/" + requestParams.id,
      requestParams,
      callbackFn,
    );
  }
}

module.exports = User;
