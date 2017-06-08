import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import { Container, Input, Button, Form } from 'semantic-ui-react';

import { observer } from 'mobx-react';
import { extendObservable } from 'mobx';

import '../scss/register-page.css'

import {
    //   UPDATE_FIELD_AUTH,
    REGISTER
    //   REGISTER_PAGE_UNLOADED
} from '../constants/actionTypes';

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
            showValidationErrors: false
        });
    }


    // actions should be created in seperate files...
    // keep going for now
    // goal get it finished
    submitForm = (ev) => {
        ev.preventDefault();

        console.log(this.username);

        // const payload = agent.requests.post('/')
    }



    //   constructor() {
    //     super();
    //     this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
    //     this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    //     this.changeUsername = ev => this.props.onChangeUsername(ev.target.value);
    //     this.submitForm = (username, email, password) => ev => {
    //       ev.preventDefault();
    //       if(!this.isValidForm()){
    //         return;
    //       }
    //       this.props.onSubmit(username, email, password);
    //     }
    //   }


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
                <Form onSubmit={this.submitForm} size="large">

                    <Form.Field>
                        <Input
                            value={this.username}
                            onChange={e => this.username = e.target.value}
                            fluid icon='user' iconPosition='left' placeholder='Username' />
                    </Form.Field>
                    <Form.Field>
                        <Input
                            value={this.email}
                            onChange={e => this.email = e.target.value}
                            fluid icon='mail' iconPosition='left' placeholder='E-mail address' />
                    </Form.Field>
                    <Form.Field>
                        <Input
                            value={this.password1}
                            onChange={e => this.password1 = e.target.value}
                            fluid icon='lock' iconPosition='left' placeholder='Password' type="password" />
                    </Form.Field>
                    <Form.Field>
                        <Input
                            value={this.password2}
                            onChange={e => this.password2 = e.target.value}
                            fluid icon='lock' iconPosition='left' placeholder='Re-enter Password' type="password" />
                    </Form.Field>
                    <Button
                        disabled={!this.isValidForm()}
                        fluid color="teal" size="large">Register</Button>

                </Form>
            </Container>
        );

        /*const email = this.props.email;
        const password = this.props.password;
        const username = this.props.username;
    
        return (
            <Container text>
                <h1>Register</h1>
                <Form onSubmit={this.submitForm(username, email, password)}>
                    <Form.Input label='Username' placeholder='Username'
                        value={this.props.username}
                        onChange={this.changeUsername} />
                    <Form.Input label='Email' placeholder='Email'
                        value={this.props.email}
                        onChange={this.changeEmail}
                        type="email" />
                    <Form.Input label='Password' placeholder='Password'
                        type="password"
                        value={this.props.password}
                        onChange={this.changePassword} />
                    <Form.Button
                        disabled={!this.isValidForm()}
                    >Submit</Form.Button>
                </Form>
            </Container>
        );*/
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(observer(Register));
