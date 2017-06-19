import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';

import App from './App';
import Main from './components/Main';
import SingleClub from './components/SingleClub';
import Register from './components/Register';
import Login from './components/Login';
import registerServiceWorker from './registerServiceWorker';
import store from './store';
import './scss/index.css';

ReactDOM.render(
  (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Main} />
          <Route path="/club/:yelpId" component={SingleClub} />
          <Route path="register" component={Register} />
          <Route path="login" component={Login} />
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('root')
);

registerServiceWorker();
