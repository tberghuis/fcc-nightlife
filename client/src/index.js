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

// in console run _state()
window._state = store.getState;


ReactDOM.render(
  (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Main} />
          <Route path="/club/:yelpId" component={SingleClub} />
          <Route path="register" component={Register} />
          <Route path="login" component={Login} />
          {/*<Route path="login" component={Login} />

          <Route path="createpoll" component={CreatePoll} onEnter={requireAuth} />
          <Route path="mypolls" component={MyPolls} onEnter={requireAuth} />
          <Route path="/poll/:id" component={Poll} />
          <Route path="/poll/:id/result" component={PollResult} />*/}
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('root')
);

registerServiceWorker();
