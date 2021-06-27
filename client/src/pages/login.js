import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
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
            authenticationState.userHasAuthenticated(true, {
              email: res.data.email,
              bazaars: res.data.bazaars,
              characters: res.data.characters,
              id: res.data.id,
            });
          }
        })
        .then(() => {
          goToUserHome();
        })
        .catch((err) => {
          alert.show("No user found with those credentials");
        });
    } else {
      alert.show("Please enter an email and password");
    }
  }

  return (
    <Container className="text-center center">
      <Form onSubmit={handleFormSubmit}>
        <Row className="text-center ">
          <Col sm={12}>
            <Form.Group className="mb-4">
              <Form.Control
                type="email"
                name="email"
                id="email"
                placeholder="Email Address"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Control
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>

          <Col className="text-center mt-3">
            <button>Submit</button>
          </Col>
        </Row>
        <Row className="text-center ">
          <Col className="text-center mt-3">
            <Link to="/">
              <button>Go Back</button>
            </Link>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default Login;
