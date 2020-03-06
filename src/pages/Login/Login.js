import React, { Component } from "react";
import {
  InputGroupText,
  InputGroupAddon,
  InputGroup,
  Card,
  CardTitle,
  Button,
  Input
} from "reactstrap";
import classes from "./Login.module.scss";
import axios from "axios";
import Cookies from "js-cookie";

class Login extends Component {
  state = {
    username: "",
    password: "",
    errors: {
      username: "",
      password: ""
    }
  };
  onChangeHandler = event => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = { ...this.state.errors };

    switch (name) {
      case "username":
        errors.username = value.length === 0 ? "Enter Username" : "";
        break;
      case "password":
        errors.password = value.length === 0 ? "Enter your Password" : "";
        break;
      default:
        break;
    }
    this.setState({ errors, [name]: value }, () => {
      console.log(this.state);
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    if (this.state.username.length === 0 || this.state.password.length === 0) {
      console.log("fill up the fields");
    } else {
      axios
        .post("/login", {
          username: this.state.username,
          password: this.state.password
        })
        .then(response => {
          console.log("proceed too dashboard");
          console.log(response);
          Cookies.set("username", this.state.username);
          if (response.data.success === "true") {
            Cookies.set("username", this.state.username);
            this.props.history.push("/dashboard");
          }
        })
        .catch(err => {
          console.log("error while sending signup request");
        });
    }
  };
  render() {
    return (
      <div className={classes.container}>
        <Card
          body
          inverse
          color="primary"
          className={["text-center", classes.main].join(" ")}>
          <CardTitle className={classes.text}>Login</CardTitle>

          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>@</InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder="Username"
              name="username"
              type="text"
              onChange={event => this.onChangeHandler(event)}
            />
          </InputGroup>

          <Input
            placeholder="Password"
            name="password"
            type="password"
            className="mt-1"
            onChange={event => this.onChangeHandler(event)}
          />

          <Button
            className={["mt-1", classes.button]}
            onClick={this.handleSubmit}>
            Login
          </Button>
          <p
            className={classes.linkText}
            onClick={() => this.props.history.push("/signup")}>
            Create an account
          </p>
        </Card>
      </div>
    );
  }
}

export default Login;
