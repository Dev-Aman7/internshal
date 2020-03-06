import React, { Component } from "react";
import { Card, CardTitle, Button, Input, Row, Col } from "reactstrap";

import axios from "axios";
import classes from "./Signup.module.scss";
// eslint-disable-next-line
const validEmailRegex = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
const validate = errors => {
  let valid = true;
  Object.values(errors).forEach(
    // if we have an error string set valid to false
    val => val.length > 0 && (valid = false)
  );
  return valid;
};

class SignUp extends Component {
  state = {
    username: "",
    password: "",
    email: "",
    phone: "",
    confirmPassword: "",
    instaID: "",
    fbID: "",
    errors: {
      username: "",
      password: "",
      email: "",
      phone: "",
      confirmPassword: "",
      instaID: "",
      fbID: ""
    }
  };
  onChangeHandler = event => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = { ...this.state.errors };

    switch (name) {
      case "username":
        errors.username =
          value.length < 5 ? "Username must be 5 characters long!" : "";
        break;
      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
        break;
      case "password":
        errors.password =
          value.length < 8 ? "Password must be 8 characters long!" : "";
        break;
      case "confirmPassword":
        errors.confirmPassword =
          value === this.state.password ? "Password is not same" : "";
        break;
      case "fbID":
        errors.fbID = value.length < 5 ? "Enter a valid facebook ID" : "";
        break;
      case "instaID":
        errors.fbID = value.length < 5 ? "Enter a valid instagram ID" : "";
        break;
      case "phone":
        errors.phone = value.length !== 10 ? "Enter a valid phone number" : "";
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
    if (validate(this.state.errors)) {
      axios
        .post("/signup", {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          phone: this.state.phone,
          instaID: this.state.instaID,
          fbID: this.state.fbID
        })
        .then(response => {
          if (response.success === "true") {
            this.props.history.push("/login");
          }
        })
        .catch(err => {
          console.log("error while sending signup request");
        });
      console.info("Valid Form");
    } else {
      console.error("Invalid Form");
    }
  };

  render() {
    const { errors } = this.state;
    return (
      <div className={classes.container}>
        <Card body className={["text-center", classes.main].join(" ")}>
          <CardTitle className={classes.text}>Create Account</CardTitle>

          <Input
            placeholder="Username"
            name="username"
            type="text"
            value={this.state.username}
            onChange={event => this.onChangeHandler(event)}
          />

          {errors.username.length > 0 && (
            <span className="error">{errors.username}</span>
          )}
          <Row>
            <Col md={6}>
              <Input
                placeholder="Email"
                name="email"
                type="text"
                className="mt-1"
                value={this.state.email}
                onChange={event => this.onChangeHandler(event)}
              />
              {errors.email.length > 0 && (
                <span className="error">{errors.email}</span>
              )}
            </Col>
            <Col md={6}>
              <Input
                placeholder="Phone number"
                name="phone"
                type="text"
                className="mt-1"
                value={this.state.phone}
                onChange={event => this.onChangeHandler(event)}
              />
              {errors.phone.length > 0 && (
                <span className="error">{errors.phone}</span>
              )}
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Input
                placeholder="Instagram ID"
                name="instaID"
                type="text"
                className="mt-1"
                value={this.state.instaID}
                onChange={event => this.onChangeHandler(event)}
              />
              {errors.instaID.length > 0 && (
                <span className="error">{errors.instaID}</span>
              )}
            </Col>
            <Col md={6}>
              <Input
                placeholder="Facebook ID"
                name="fbID"
                type="text"
                className="mt-1"
                value={this.state.fbID}
                onChange={event => this.onChangeHandler(event)}
              />
              {errors.fbID.length > 0 && (
                <span className="error">{errors.fbID}</span>
              )}
            </Col>
          </Row>
          <Input
            placeholder="Password"
            name="password"
            type="password"
            className="mt-1"
            value={this.state.password}
            onChange={event => this.onChangeHandler(event)}
          />
          {errors.password.length > 0 && (
            <span className="error">{errors.password}</span>
          )}
          <Input
            placeholder="Confirm Password"
            name="confirmPassword"
            type="password"
            className="mt-1"
            value={this.state.confirmPassword}
            onChange={event => this.onChangeHandler(event)}
          />
          {errors.confirmPassword.length > 0 && (
            <span className="error">{errors.confirmPassword}</span>
          )}
          <Row>
            <Col className={classes.linkText} md={8}>
              Already have an account?
            </Col>
            <Col md={4}>
              <Button
                color="secondary"
                className="mt-1"
                onClick={this.handleSubmit}>
                SignUp
              </Button>
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

export default SignUp;
