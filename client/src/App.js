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

    console.log(this.props.loggedIn);
    //if ! loggedIn 
    if (!this.props.loggedIn) {
      axios.get('/api/auth/login')
        .then((res) => {
          console.log(res);
          // dispatch AUTO LOGIN
          this.props.dispatch({ type: LOGIN_AUTO, username: res.data.email, email: res.data.username });
        });
    }
    // axios get auth/login
  }


  render() {
    return (
      <div>
        <div>
          <Header />
        </div>
        {/*<div className="ui middle aligned center aligned grid">*/}
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

