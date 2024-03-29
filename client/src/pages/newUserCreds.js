import React, { useState, useContext } from "react";
import UserContext from "../utils/userContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import API from "../utils/API";
import { A, navigate } from "hookrouter";

const NewUserCreds = (props) => {
  const { authenticationState } = useContext(UserContext);
  const [formObject, setFormObject] = useState({
    email: "",
    password: "",
  });
  const [uniqueEmail, setUniqueEmail] = useState(false);
  const [formReady, setFormReady] = useState(false);

  const handleInputChange = (event) => {
    let { name, value } = event.target;
    if (name === "email") {
      value = value.trim();
    }
    setFormObject({ ...formObject, [name]: value });
    if (name === "password") {
      if (value.length > 6 && uniqueEmail) {
        setFormReady(true);
      }
    } else {
      if (value.length > 6 && uniqueEmail) {
        setFormReady(true);
      }
    }
  };

  const handleFormSubmit = () => {
    if (formReady) {
      saveNewUser(formObject);
    }
  };

  const saveNewUser = (userCreds) => {
    API.saveUser(userCreds)
      .then((res) => {
        if (res.status === 201) {
          let userData = {
            email: res.data.email,
            bazaars: res.data.bazaars,
            characters: res.data.characters,
            id: res.data._id,
          };
          loginNewUser(userCreds, userData);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loginNewUser = (userCreds, userData) => {
    API.loginUser(userCreds)
      .then((res) => {
        if (res.status === 200) {
          authenticationState.userHasAuthenticated(true, {
            ...userData,
          });
          if (props.type === "player") {
            navigate("/newcharacter/" + props.bazaarCode);
          } else {
            navigate("/newBazaar");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function checkEmailUniqueness() {
    if (formObject.email.length > 4) {
      API.checkEmail({ email: formObject.email })
        .then((res) => {
          if (res.data === null) {
            setUniqueEmail(true);
          } else {
            setUniqueEmail(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <Container fluid>
      <h1 className='display-2 mt-3 pb-2 text-center'>Fantasy Bazaar</h1>
      <h2 className='display-4 mt-0 pb-3 text-center'>
        New User Account Details
      </h2>

      <Row>
        <Col md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
          <Form
            onSubmit={handleFormSubmit}
            className='text-center'
            validated={formReady}
            noValidate
          >
            <Form.Group className='mt-4'>
              <Form.Label className='text-center'>Email Address</Form.Label>
              <Form.Control
                required
                name='email'
                id='email'
                type='email'
                placeholder='myemailaddress@interwebs.com'
                onChange={handleInputChange}
                onBlur={checkEmailUniqueness}
              />
              <Form.Control.Feedback type='invalid'>
                Looks like thats not an email address, or it is already
                registered
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mb-4'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type='password'
                name='password'
                id='password'
                placeholder='Super Secure Password'
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type='invalid'>
                Password needs to be 7 characters or longer
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              className='btn-small ml-3'
              variant='secondary'
              onClick={() => handleFormSubmit()}
            >
              Submit
            </Button>
            <A href='/'>
              <Button className='btn-small ml-3' variant='secondary'>
                Back Home
              </Button>
            </A>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default NewUserCreds;
