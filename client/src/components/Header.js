import React from 'react';
import { Link } from 'react-router';
import { Menu } from 'semantic-ui-react';


class Header extends React.Component {





    render() {
        // let loggedIn = this.props.loggedIn;
        let loggedIn = false;
        return (
            <Menu>
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
                        <Menu.Item onClick={this.props.onClickLogout}>
                            Logout
                        </Menu.Item>
                    }
                </Menu.Menu>
            </Menu>
        );
    }
}

export default Header;

