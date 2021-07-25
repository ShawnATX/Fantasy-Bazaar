import React, { useState, useEffect, useContext } from "react";
import UserContext from "../utils/userContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import SweetAlert from "react-bootstrap-sweetalert";
import API from "../utils/API";
import { navigate } from "hookrouter";

const PasswordReset = (props) => {
  const { authenticationState } = useContext(UserContext);
  const [formObject, setFormObject] = useState({ email: "" });
  const [userObject, setUserObject] = useState({
    email: "",
    id: "",
  });
  const [validToken, setValidToken] = useState(false);
  const [sweetAlertContent, setSweetAlertContent] = useState({
    title: "",
  });
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    validateToken();
  }, []);

  const confirmAlert = () => {
    setShowAlert(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (formObject.password1 === formObject.password2 && validToken) {
      //push new password to the server to be hashed
      API.saveResetPassword({
        id: userObject.id,
        password: formObject.password1,
        ...props.token,
      })
        .then((res) => {
          loginUser();
          console.log(res.data);
        })
        .catch((err) => {
          setSweetAlertContent({
            title: "Error Saving password",
            value: err,
          });
          setShowAlert(true);
        });
    }
  };

  const forgotPasswordScreen = () => {
    navigate("/forgotpassword");
  };

  const goToUserHome = () => {
    navigate("/userhome");
  };

  const validateToken = () => {
    API.getTokenUser(props.token)
      .then((res) => {
        setUserObject(res.data);
        setValidToken(true);
      })
      .catch((err) => {
        setSweetAlertContent({
          title: "Invalid Token",
          value:
            "The reset token is either expired or invalid. Please use a new token to reset the account password",
        });
        setShowAlert(true);
      });
  };

  const loginUser = () => {
    const userLogin = {
      email: userObject.email,
      password: formObject.password1,
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
        setSweetAlertContent({
          title: "Error logging in with new password",
          value:
            "There was an error logging in with the new password. Please visit the login page to complete your login.\n\n" +
            "https://fantasybazaar.app/login",
        });
        setShowAlert(true);
      });
  };

  return (
    <>
      {showAlert && (
        <SweetAlert
          custom
          customIcon={
            <i className='bi bi-check-lg' style={{ fontSize: "3rem" }} />
          }
          style={{ backgroundColor: "#6c757d" }}
          confirmBtnBsStyle={"secondary"}
          title={sweetAlertContent.title}
          onConfirm={forgotPasswordScreen}
          onCancel={confirmAlert}
        >
          <p>{sweetAlertContent.value} </p>
        </SweetAlert>
      )}
      <h1 className='display-2 mt-3 pb-5 text-center'> Fantasy Bazaar</h1>
      <h4 className='display-4 mt-0 pb-1 text-center'>Choose a new password</h4>
      <Form className='mt-0' onSubmit={handleFormSubmit}>
        <Row className='text-center mb-5'>
          <Col
            sm={{ span: 8, offset: 2 }}
            md={{ span: 8, offset: 2 }}
            lg={{ span: 6, offset: 3 }}
          >
            <Form.Group className='mb-4'>
              <Form.Control
                readOnly
                type='email'
                name='email'
                id='email'
                placeholder={userObject.email}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col
            sm={{ span: 8, offset: 2 }}
            md={{ span: 8, offset: 2 }}
            lg={{ span: 6, offset: 3 }}
          >
            <Form.Group className='mb-1'>
              <Form.Control
                type='password'
                name='password1'
                id='password1'
                placeholder='New Password'
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col
            sm={{ span: 8, offset: 2 }}
            md={{ span: 8, offset: 2 }}
            lg={{ span: 6, offset: 3 }}
          >
            <Form.Group className='mb-3'>
              <Form.Control
                type='password'
                name='password2'
                id='password2'
                placeholder='Confirm Password'
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className='d-flex justify-content-center'>
            <Button
              className='btn-small d-flex justify-content-center'
              variant='secondary'
              type='submit'
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default PasswordReset;
