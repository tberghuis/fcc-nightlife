import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = process.env.REACT_APP_API_BASE_URL;

const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
}

const requests = {
  del: url =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: url => {
    // console.log(`${API_ROOT}${url}`);
    return superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody)
  },

  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url, body) => {
    // console.log('post');
    // This stumped me for a while... but i learnt
    // i wasn't returning the promise object so middleware wasn't working
    return superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
  }

};

// TODO remove
const Yelp = {
  search: searchText =>
    requests.post('/yelp', { searchText })
};

export default {
  // dont clutter this file, move code into components and seperate files
  requests,
  Yelp,
  setToken: _token => { token = _token; }
};


