import React from 'react';


import { Field, reduxForm } from 'redux-form';



// import agent from '../agent';
// import { connect } from 'react-redux';
// import { Container, Input, Button, Form } from 'semantic-ui-react';

// import isEmail from 'validator/lib/isEmail';

class Login extends React.Component {


    // bad naming
    xhrPostLogin = () => {
        console.log('test');

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
