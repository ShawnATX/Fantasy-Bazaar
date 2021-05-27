import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import UserContext from "../utils/userContext";
import { Container, FormGroup, Form, Label, Input } from "reactstrap";
import API from "../utils/API";

function NewUserType() {
  const { authenticationState } = useContext(UserContext);
  const [formObject, setFormObject] = useState({});
  const history = useHistory();
  const alert = useAlert();

  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.email && formObject.password) {
    }
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
    // if bazaarID == {join code length} => check bazaar code API to validate and then activate the 'join' button
  }

  return (
    <Container>
      <Row className="mt-5 px-5">
        <Col>
          <Link
            to="/newusercreds/gm"
            alt="Create a new Bazaar"
            className="text-center"
          >
            <button className="splashBtn">Create a new Bazaar</button>
          </Link>
        </Col>
      </Row>
      <Form onSubmit={handleFormSubmit} className="text-center">
        <Row className="mt-5 px-5">
          <Col>
            <Link to="/newnewusercreds/player?bazaarid=">
              <button>Join a bazaar</button>
            </Link>
            <FormGroup>
              <Label for="bazaarId">Bazaar Join Code</Label>
              <Input
                name="bazaarId"
                id="bazaarId"
                placeholder="Bazaar Code Here"
                onChange={handleInputChange}
              />
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default NewUserType;
