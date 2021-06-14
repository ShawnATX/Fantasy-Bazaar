import React, { useState, useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useAlert } from "react-alert";
import UserContext from "../utils/userContext";
import { Container, FormGroup, Form, Label, Input, Button } from "reactstrap";
import API from "../utils/API";

function NewUserCreds(props) {
  const { authenticationState } = useContext(UserContext);
  const [formObject, setFormObject] = useState({
    email: "",
    password: "",
  });
  const [formReady, setFormReady] = useState(false);
  const history = useHistory();
  const alert = useAlert();
  const { type } = props;
  const params = new URLSearchParams(useLocation().search);

  useEffect(() => {
    if (authenticationState.isAuthenticated) {
      history.push("/userhome");
    }
  }, []);

  function handleInputChange(event) {
    let { name, value } = event.target;
    if (name === "email") {
      value = value.trim();
    }
    setFormObject({ ...formObject, [name]: value });
  }

  function goHome(event) {
    event.preventDefault();
    history.push("/");
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.email && formObject.password) {
      saveNewUser(formObject);
    }
  }

  function saveNewUser(userCreds) {
    API.saveUser(userCreds)
      .then((res) => {
        if (res.status === 200) {
          let userContext = {
            email: res.data.email,
            bazaars: res.data.bazaars,
            characters: res.data.characters,
            id: res.data._id,
          };
          loginNewUser(userCreds, userContext);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function loginNewUser(userCreds, userContext) {
    API.loginUser(userCreds)
      .then((res) => {
        if (res.status === 200) {
          authenticationState.userHasAuthenticated(true, {
            ...userContext,
          });
          console.log("Login done");
          if (type === "player") {
            let code = params.get("bazaar");
            history.push("/newCharacter?bazaar=" + code);
          } else {
            history.push("/newBazaar");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function checkEmailUniqueness() {
    //@@TODO update email length and add regex
    if (formObject.email.length > 2) {
      API.checkEmail({ email: formObject.email })
        .then((res) => {
          if (res.data === null) {
            setFormReady(true);
            console.log("no conflict");
          } else {
            setFormReady(false);
            console.log("email conflict");
          }
        })
        .catch((err) => {
          console.log(err);
        });
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
            onBlur={checkEmailUniqueness}
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
        {formReady && formObject.password.length >= 7 ? (
          <Button className="btn-small ml-3">Submit</Button>
        ) : (
          <Button className="btn-small ml-3" disabled>
            Submit
          </Button>
        )}
        <Button className="btn-small ml-3" onClick={goHome}>
          Back Home
        </Button>
      </Form>
    </Container>
  );
}

export default NewUserCreds;
