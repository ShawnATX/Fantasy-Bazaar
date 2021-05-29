import React, { useState, useContext, useEffect } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { useAlert } from "react-alert";
import UserContext from "../utils/userContext";
import { Container, FormGroup, Form, Label, Input } from "reactstrap";
import API from "../utils/API";

function NewUserCreds(props) {
  const { authenticationState } = useContext(UserContext);
  const [formObject, setFormObject] = useState({});
  const history = useHistory();
  const alert = useAlert();
  const location = useLocation();
  const params = useParams();
  const type = props.type; //is this a player or gm user?

  useEffect(() => {
    if (authenticationState.isAuthenticated) {
      history.push("/playerhome");
    }
  }, [authenticationState]);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  function goHome(event) {
    event.preventDefault();
    history.push("/");
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.email && formObject.password) {
      API.saveUser(formObject).then((res) => {
        if (res.status === 200) {
          API.loginUser({
            email: res.data.email,
            password: formObject.password,
          }).then((res) => {
            console.log("login response: " + res);
          });
        }
      });
    }
  }

  function validateEmail() {
    console.log(formObject.email);
    API.checkEmail({ email: formObject.email })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Container>
      <Form onSubmit={handleFormSubmit} className="text-center">
        <FormGroup row className="mt-4">
          <Label className="text-center" for="email">
            Email Address
          </Label>
          <Input
            name="email"
            id="email"
            placeholder="myemailaddress@interwebs.com"
            onChange={handleInputChange}
            onBlur={validateEmail}
          />
        </FormGroup>
        <FormGroup row>
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={handleInputChange}
          />
        </FormGroup>
        <button className="btn-small mr-3">Submit</button>
        <button className="btn-small ml-3" onClick={goHome}>
          Back Home
        </button>
      </Form>
    </Container>
  );
}

export default NewUserCreds;
