// 统一接口，包装成一个api输出
// https://wanago.io/2019/12/09/javascript-design-patterns-facade-react-hooks/

class API {
    constructor(authToken) {
      this.authToken = authToken;
    }
    constructHeaders() {
      const headers = new Headers();
      headers.set('Authorization', this.authToken);
      return headers;
    }
    handleResponse(response) {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject({
          status: response.status,
          statusText: response.statusText
        });
      }
    }
    get(url, options) {
      return fetch(url, {
        headers: this.constructHeaders(),
        ...options,
      })
        .then(this.handleResponse);
    }
    post(url, options) {
      return fetch(url, {
        method: 'POST',
        headers: this.constructHeaders(),
        ...options,
      })
        .then(this.handleResponse);
    }
    put(url, options) {
      return fetch(url, {
        method: 'PUT',
        headers: this.constructHeaders(),
        ...options,
      })
        .then(this.handleResponse);
    }
    delete(url, options) {
      return fetch(url, {
        method: 'DELETE',
        headers: this.constructHeaders(),
        ...options,
      })
        .then(this.handleResponse);
    }
  }


const api = new API('my-auth-token');
 
api.get('https://jsonplaceholder.typicode.com/users/1')
  .then(data => {
    console.log('User data', data);
  })
  .catch(error => {
    console.error(error);
  });