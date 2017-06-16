import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
// import { Container, Input, Form } from 'semantic-ui-react';
import { Container, Input, Button, Form } from 'semantic-ui-react';
import { browserHistory } from 'react-router';
import { observer } from 'mobx-react';
import { extendObservable } from 'mobx';
import isEmail from 'validator/lib/isEmail';

import {
    REGISTER
} from '../constants/actionTypes';

import '../scss/register-page.css'

// this was a test:
// import styled from 'styled-components';
// var Button = require('semantic-ui-react').Button;
// Button = styled(Button)`
// 	font-size: 1.5em;
// 	text-align: center;
// 	color: palevioletred !important;
// `;

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    dispatch: (action) => {
        dispatch(action);
    }
});

class Register extends React.Component {

    constructor() {
        super();
        extendObservable(this, {
            username: '',
            email: '',
            password1: '',
            password2: '',
            showValidationErrors: false,
            passwordsNotMatch: false,
            invalidEmail: false,
            errorResponse: null
        });

        //debugging
        // window._reg = this;
    }


    // actions should be created in seperate files...
    // keep going for now
    // goal get it finished
    submitForm = (ev) => {
        ev.preventDefault();

        // reset error state
        this.showValidationErrors = false;
        this.passwordsNotMatch = false;
        this.invalidEmail = false;

        if (this.password1 !== this.password2) {
            this.passwordsNotMatch = true;
            this.showValidationErrors = true;
        }

        // test email
        if (!isEmail(this.email)) {
            this.invalidEmail = true;
            this.showValidationErrors = true;
        }

        if (this.showValidationErrors) {
            return;
        }

        // post /register

        // const payload = agent.requests.post('/')




        axios.post('/api/auth/register', {
            username: this.username,
            email: this.email,
            password: this.password1
        }, { headers: { 'Accept': 'application/json' } })
            .then((response) => {
                // console.log('then', response);
                // dispatch LOGIN, save email and username in redux

                // stuff localstorage

                // console.log(this.props.dispatch);

                //return 
                this.props.dispatch({ type: REGISTER, payload: response.data });
                browserHistory.push('/');

            })
            .catch((error) => {

                console.log('catch', JSON.stringify(error));

                this.errorResponse = error.response.data.errors.message;
            });
    }




    isValidForm = () => {
        if (this.username.trim() === ''
            || this.email.trim() === ''
            || this.password1.trim() === ''
            || this.password2.trim() === ''
        ) {
            return false;
        }




        return true;
    }

    render() {

        return (
            <Container text className="register-page">

                {this.showValidationErrors &&
                    <div className="ui error message">
                        <ul className="list">

                            {this.passwordsNotMatch &&
                                <li>Passwords should match</li>
                            }
                            {this.invalidEmail &&
                                <li>Email not valid</li>
                            }
                        </ul>
                    </div>
                }



                <Form
                    onSubmit={this.submitForm} size="large">

                    <Form.Field>
                        <Input
                            value={this.username}
                            onChange={e => this.username = e.target.value}
                            fluid icon='user' iconPosition='left' placeholder='Username' />
                    </Form.Field>
                    <Form.Field
                        className={this.invalidEmail ? "error" : null}
                    >
                        <Input
                            value={this.email}
                            onChange={e => this.email = e.target.value}
                            fluid icon='mail' iconPosition='left' placeholder='E-mail address' />
                    </Form.Field>
                    <Form.Field
                        className={this.passwordsNotMatch ? "error" : null}
                    >
                        <Input
                            value={this.password1}
                            onChange={e => this.password1 = e.target.value}
                            fluid icon='lock' iconPosition='left' placeholder='Password' type="password" />
                    </Form.Field>
                    <Form.Field
                        className={this.passwordsNotMatch ? "error" : null}
                    >
                        <Input
                            value={this.password2}
                            onChange={e => this.password2 = e.target.value}
                            fluid icon='lock' iconPosition='left' placeholder='Re-enter Password' type="password" />
                    </Form.Field>
                    <Button
                        disabled={!this.isValidForm()}
                        fluid color="teal" size="large">Register</Button>

                </Form>
                {this.errorResponse && <div>{this.errorResponse}</div>}
            </Container>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(observer(Register));
//export default observer(connect(mapStateToProps, mapDispatchToProps)(Register));
