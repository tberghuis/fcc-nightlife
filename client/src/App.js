import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Header from './components/Header';

import {
  LOGIN_AUTO,
} from './constants/actionTypes';

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn
});

const mapDispatchToProps = dispatch => ({
  dispatch
});

class App extends Component {

  componentWillMount() {
    if (!this.props.loggedIn) {
      axios.get('/api/auth/login')
        .then((res) => {
          this.props.dispatch({ type: LOGIN_AUTO, username: res.data.email, email: res.data.username });
        }).catch((err) => {
          console.log(err);
        });
    }
  }

  render() {
    return (
      <div>
        <div>
          <Header />
        </div>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
