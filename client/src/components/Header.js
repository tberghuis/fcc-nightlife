import React from 'react';
import { Link } from 'react-router';
import { Menu } from 'semantic-ui-react';
import axios from 'axios';
import { connect } from 'react-redux';
import {
    LOGOUT
} from '../constants/actionTypes';
const mapStateToProps = state => ({
    loggedIn: state.auth.loggedIn
});

const mapDispatchToProps = dispatch => ({
    dispatch
});



class Header extends React.Component {


    onClickLogout = () => {
        console.log('logout');
        axios.get('/api/auth/logout')
            .then((res) => {
                this.props.dispatch({ type: LOGOUT });
            });
    }


    render() {
        let loggedIn = this.props.loggedIn;
        // let loggedIn = false;
        return (
            <Menu>
                <Menu.Item as={Link} to="/">

                    <img
                        style={{ height: '21px', width: 'auto' }}
                        src="/favicon/favicon-32x32.png" alt="" />
                </Menu.Item>
                <Menu.Item as="a" target="_blank" href="https://github.com/tberghuis/fcc-nightlife">
                    <i className="ion-social-github"></i>
                </Menu.Item>

                <Menu.Menu position='right'>
                    {!loggedIn &&
                        <Menu.Item as={Link} to="/login">
                            Login
                        </Menu.Item>
                    }
                    {!loggedIn &&
                        <Menu.Item as={Link} to="/register">
                            Register
                        </Menu.Item>
                    }
                    {loggedIn &&
                        <Menu.Item onClick={this.onClickLogout}>
                            Logout
                        </Menu.Item>
                    }
                </Menu.Menu>
            </Menu>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

