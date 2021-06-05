//New player form which handles basic player creation. front-end validation ensures data is present before being sent to the server on required fields. useState React hook is being used to hold and handle form data as it is entered.
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import UserContext from "../utils/userContext";
import { Container, FormGroup, Form, Label, Input } from "reactstrap";
import API from "../utils/API";

function NewBazaar() {
  const { authenticationState } = useContext(UserContext);
  const [formObject, setFormObject] = useState({});
  const history = useHistory();
  const alert = useAlert();
  function handleInputChange(event) {
    const { name, value } = event.target;
    console.log(name, value);
    setFormObject({ ...formObject, [name]: value });
  }

  function goHome(event) {
    event.preventDefault();
    history.push("/");
  }

  return <Container>Make A New Bazaar!</Container>;
}

export default NewBazaar;
