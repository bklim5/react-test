import React, { PropTypes } from 'react';
import SignUpForm from '../components/SignUpForm.jsx';

class SignUpPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            user: {
                email: '',
                password: '',
                name: ''
            }
        }

        this.processForm = this.processForm.bind(this);
        this.changeUser = this.changeUser.bind(this);
    }

    processForm(event) {
        event.preventDefault();
        fetch('/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.user.email,
                password: this.state.user.password,
                name: this.state.user.name
            })
        })
        .then(data => data.json())
        .then((data) => {
            if (Object.keys(data.errors).length != 0) {
                const errors = data.errors;
                errors.summary = data.message;
                this.setState({ errors })
            } else {
                this.setState({ errors: {} });
            }
        })
        .catch((err) => {
            this.setState({ errors: err });
        });
        
    }

    changeUser(event) {
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;

        this.setState({ user });
    }

    render() {
        return (
            <SignUpForm 
                onSubmit={this.processForm}
                onChange={this.changeUser}
                errors={this.state.errors}
                user={this.state.user}
            />
        );
    }
}

export default SignUpPage;