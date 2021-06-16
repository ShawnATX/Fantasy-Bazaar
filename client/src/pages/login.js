import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { Container, Form, FormGroup, Input, Row, Col } from "reactstrap";
import { useAlert } from "react-alert";
import UserContext from "../utils/userContext";
import API from "../utils/API";

const Login = () => {
  const { authenticationState } = useContext(UserContext);
  const [formObject, setFormObject] = useState({});
  const history = useHistory();
  const alert = useAlert();

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  function goToUserHome() {
    history.push("/userhome");
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.email && formObject.password) {
      const userLogin = {
        email: formObject.email.trim(),
        password: formObject.password,
      };
      API.loginUser(userLogin)
        .then((res) => {
          if (res.status === 200) {
            //set authentication on successful login, and set user info on the global state object
            authenticationState.userHasAuthenticated(true, {
              email: res.data.email,
              bazaars: res.data.bazaars,
              characters: res.data.characters,
              id: res.data.id,
            });
          }
        })
        .then(() => {
          setTimeout(() => {
            goToUserHome();
          }, 500);
        })
        .catch((err) => {
          alert.show("No user found with those credentials");
        });
    }
    //alert form fields are not completed
    else {
      alert.show("Please enter an email and password");
    }
  }

  return (
    <Container>
      <Form onSubmit={handleFormSubmit} className="mt-5">
        <FormGroup row className="mb-4">
          <Input
            name="email"
            id="email"
            placeholder="Email Address"
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup row className="mb-4">
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={handleInputChange}
          />
        </FormGroup>
        <Row>
          <Col className="text-center mt-3">
            <button>Submit</button>
          </Col>
        </Row>
      </Form>
      <Col className="text-center mt-3">
        <Link to="/">
          <button>Go Back</button>
        </Link>
      </Col>
    </Container>
  );
};

export default Login;
