import React, { Component } from 'react';
import axios from 'axios';
import FormErrors from './FormErrors';
import { Jumbotron, Grid, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            formErrors: {email: '', password: ''},
            emailValid: false,
            passwordValid: false,
            formValid: false
        }
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUserInput(e) {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value }, () => {this.validateField(name, value)});
        console.log(this.state.email);
        console.log(this.state.password);
    }

    validateField(fieldName, value) {
        let errors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;

        switch(fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                errors.email = emailValid ? '' : ' is invalid';
                break;
            case 'password':
                passwordValid = value.length >= 6;
                errors.password = passwordValid ? '': ' is too short';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: errors,
            emailValid: emailValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid});
    }

    handleSubmit(e) {
        e.preventDefault();
        let user = {
            email: this.state.email,
            password: this.state.password
        }
        console.log(user);
        axios.post('/signup', user)
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log("ERROR in handleSubmit of Signup Component."))
    }

    render() {
        return (
          <form className="demo">
          <Grid>
            <Jumbotron>
              <p>Registration</p>
              <FormGroup>
                <ControlLabel>Email</ControlLabel>
                <FormControl
                  type="email"
                  className="validate"
                  value={this.state.email}
                  placeholder="Enter Email Address"
                  name="email" value={this.state.email}
                  onChange={this.handleUserInput}
                />
                <ControlLabel>Password</ControlLabel>
                <FormControl
                  type="password"
                  className="validate"
                  value={this.state.password}
                  placeholder="Enter Password"
                  name="password" value={this.state.password}
                  onChange={this.handleUserInput}
                />
                <button onClick={this.handleSubmit} className="btn btn-primary"
                    disabled={!this.state.formValid}>Sign up</button>
                </FormGroup>
              </Jumbotron>
            </Grid>
                <FormErrors formErrors={this.state.formErrors} />
          </form>
        )
    }
}

export default Signup;
