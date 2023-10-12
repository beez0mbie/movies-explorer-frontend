export class Api {
  constructor(options) {
    this.options = options;
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
    this.credentials = options.credentials;
  }

  _getJsonPromise = (result) =>
    result.ok ? result.json() : Promise.reject(`Impossible to get result.json(): ${result.status}`);

  _request = (endpoint, options) =>
    fetch(`${this.baseUrl}/${endpoint}`, { ...options, credentials: this.credentials })
      .then(this._getJsonPromise)
      .catch((err) => {
        console.log('root APi error');
        console.error(err);
      });
}
