import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import UserContext from "../utils/userContext";
import { Container, FormGroup, Form, Label, Input } from "reactstrap";
import API from "../utils/API";

function NewUserCreds() {
  const { authenticationState } = useContext(UserContext);
  const [formObject, setFormObject] = useState({});
  const history = useHistory();
  const alert = useAlert();

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
    }
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
