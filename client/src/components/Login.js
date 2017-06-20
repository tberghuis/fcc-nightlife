import React from 'react';
// import {
//     getFormSyncErrors,
//     getFormMeta
// } from 'redux-form';

import { Field, reduxForm } from 'redux-form';
import axios from 'axios';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import {
    LOGIN,
} from '../constants/actionTypes';

// using dispatch from reduxForm

// using className instead
// import { Container, Input, Button, Form } from 'semantic-ui-react';

// TODO
// import isEmail from 'validator/lib/isEmail';

const required = value => (value ? undefined : 'Required')

class Login extends React.Component {

    // bad naming
    xhrPostLogin = (values, dispatch) => {
        console.log(values);
        // return a promise
        // then redirect to /
        // catch dispatch LOGIN_ERROR
        return axios.post('/api/auth/login', {
            email: values.email,
            password: values.password
        }).then((res) => {
            dispatch({ type: LOGIN, payload: res.data });
            // browserHistory.push('/');
            browserHistory.goBack();
        }).catch((err) => {
            console.log(err);
            this.setState({errorMessage: 'TODO message from server'});
        });

    }

    renderFieldEmail = (field) => {
        console.log(field);
        return (
            <div className={"field " + (field.meta.touched && field.meta.error && !field.meta.active ? 'error' : '')}>
                <div className="ui left icon input">
                    <i className="user icon"></i>
                    <input {...field.input} type="email" placeholder="Email" />
                </div>
            </div>
        )
    }

    // i don't believe in DRY for everything
    renderFieldPassword = (field) => (
        <div className={"field " + (field.meta.touched && field.meta.error && !field.meta.active ? 'error' : '')}>
            <div className="ui left icon input">
                <i className="lock icon"></i>
                <input {...field.input} type="password" placeholder="Password" />
            </div>
        </div>
    )

    // this styling is really ad hoc and not consistent
    // sometimes using react components
    // sometimes using className
    // sometimes using inline styles

    render() {
        const { handleSubmit, pristine, submitting } = this.props;
        return (
            <div style={{ maxWidth: '450px', margin: '30px auto' }}>
                <form className="ui large form" onSubmit={handleSubmit(this.xhrPostLogin)}>
                    <Field name="email"
                        validate={[required]}
                        component={this.renderFieldEmail} />
                    <Field name="password"
                        validate={[required]}
                        component={this.renderFieldPassword} />
                    <button className="ui fluid large submit button" type="submit" disabled={pristine || submitting}>Submit</button>
                </form>
                {this.state && this.state.errorMessage && <div>{this.state.errorMessage}</div>}
            </div>
        );
    }
}

// Login = connect(
//     state => ({
//         syncErrors: getFormSyncErrors('login')(state),
//         fields: getFormMeta('login')(state)
//     })
// )(Login);

Login = reduxForm({
    form: 'login'
})(Login);

export default Login;
