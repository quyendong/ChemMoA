import React, { Component } from 'react';
import axios from 'axios';
import {Jumbotron, Grid, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

export default class Login extends Component {
      constructor(props) {
          super(props);
          this.state = {
              email: '',
              password: '',
              loginValid: false
          }
          this.handleUserInput = this.handleUserInput.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
          this.handleValid = this.handleValid.bind(this);
      }

      handleUserInput(e) {
          e.preventDefault();
          const name = e.target.name;
          const value = e.target.value;
          this.setState({[name]: value });
          console.log(this.state.email);
          console.log(this.state.password);
      }

      handleValid() {
        this.setState({  valid: true  });
      }

      handleSubmit(e) {
          e.preventDefault();
          let user = {
              email: this.state.email,
              password: this.state.password
          }
          console.log(user);
          axios.post('/Login', user)
              .then(res => {
                  console.log(res);
                  this.handleValid();
              })
              .catch(err => console.log("Cannot Log In"))
      }

  render() {
    return (
      <Grid>
        <Jumbotron>
          <p>Login</p>
        <form className="demo">
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
                  >Login</button>
            </FormGroup>
          </form>
          </Jumbotron>
      </Grid>
    )
  }
}
