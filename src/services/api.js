import axios from 'axios';
import config from '../config';
import * as _ from 'lodash';

class ApiService {
  constructor() {
    this.axios = axios;
  }

	apiUrl = config.apiUrl;

	users = {
		create: (options = {}) =>
      this.processApiCall(_.assign({ method: 'post', url: '/users' }, options)),
		authenticate: (options = {}) =>
			this.processApiCall(
				_.assign({ method: 'post', url: '/users/authenticate' }, options),
			),
  };

  players = {
		create: (options = {}) =>
      this.processApiCall(_.assign({ method: 'post', url: '/private/players' }, options)),
    get: (options = {}) =>
      this.processApiCall(_.assign({ method: 'get', url: '/private/players/:id' }, options)),
    update: (options = {}) =>
      this.processApiCall(_.assign({ method: 'put', url: '/private/players/:id' }, options)),
    index: (options = {}) =>
      this.processApiCall(_.assign({ method: 'get', url: '/private/players/search' }, options)),
  };

  teams = {
		create: (options = {}) =>
      this.processApiCall(_.assign({ method: 'post', url: '/private/teams' }, options)),
    get: (options = {}) =>
      this.processApiCall(_.assign({ method: 'get', url: '/private/teams/:id' }, options)),
    update: (options = {}) =>
      this.processApiCall(_.assign({ method: 'put', url: '/private/teams/:id' }, options)),
    index: (options = {}) =>
      this.processApiCall(_.assign({ method: 'get', url: '/private/teams/search' }, options)),
  };

  fixtures = {
		create: (options = {}) =>
      this.processApiCall(_.assign({ method: 'post', url: '/private/fixtures' }, options)),
    index: (options = {}) =>
      this.processApiCall(_.assign({ method: 'get', url: '/private/fixtures/search' }, options)),
  };
  
	processApiCall(options) {
		const body = options.body || options.formData;

		if (
			!body &&
			(options.method === 'post' || options.method === 'put')
		) {
			throw new Error(
				`Missing body on ${options.method} call to ${options.url}`,
			);
		}

		if (
			body &&
			_.isEmpty(body) &&
			(options.method === 'post' || options.method === 'put')
		) {
			throw new Error(`Empty body on ${options.method} call to ${options.url}`);
		}

		let url = options.url;

		if (options.params) {
			url = this.setUrlParams(url, options.params);
		}

		if (options.query) {
			url = this.setUrlQuery(url, options.query);
		}

    const headers = this.setDefaultHeaders();

		return this.axios[options.method](
			`${this.apiUrl + url}`,
			options.body ? options.body : { headers: headers },
			options.body ? { headers: headers } : undefined,
		);
	}

	setUrlParams(url, params) {
		for (const key of Object.keys(params)) {
			if (!url.includes(`:${key}`)) {
				throw new Error(`Unrecognised query parameter ${key} in url: ${url}`);
			}
			const replacementRegexp = new RegExp(`:${key}`, 'g');
			url = url.replace(replacementRegexp, params[key]);
		}

		return url;
	}

	setUrlQuery(url, queryParamss) {
		let index = 0;
		for (const key of Object.keys(queryParamss)) {
			const prefix = index === 0 ? '?' : '&';
			url += `${prefix}${key}=${queryParamss[key]}`;
			index += 1;
		}

		return url;
  }
  
  setDefaultHeaders() {
    const accessToken = localStorage.getItem('token');
    
    if (accessToken) {
      return {'x-access-token': accessToken};
    }
  }
}

export default new ApiService();