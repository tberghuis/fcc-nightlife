import React from 'react';


import { Field, reduxForm } from 'redux-form';
import agent from '../agent';

// using dispatch from reduxForm
// import { connect } from 'react-redux';
// import { Container, Input, Button, Form } from 'semantic-ui-react';

// import isEmail from 'validator/lib/isEmail';

class Login extends React.Component {


    // bad naming
    xhrPostLogin = (values, dispatch) => {
        console.log(values);
        // console.log(anythingelse);

        // dispatch({
        //     type: 'TEST',
        //     payload: 'test'
        // });

        // return a promise
        return agent.requests.post('/auth/login', {
            email: values.email,
            password: values.password
        });

    }

    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props;
        return (
            <form onSubmit={handleSubmit(this.xhrPostLogin)}>
                <div>
                    <label>Email</label>
                    <div>
                        <Field
                            name="email"
                            component="input"
                            type="email"
                            placeholder="Email"
                        />
                    </div>
                </div>
                <div>
                    <label>Password</label>
                    <div>
                        <Field
                            name="password"
                            component="input"
                            type="password"
                            placeholder="Password"
                        />
                    </div>
                </div>
                <div>
                    {/*<button type="submit" disabled={pristine || submitting}>Submit</button>*/}
                    <button type="submit">Submit</button>

                </div>
            </form>
        );
    }
}

// export default Login;

export default reduxForm({
    form: 'login'
})(Login)
