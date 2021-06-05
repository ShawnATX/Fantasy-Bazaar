import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import UserContext from "../utils/userContext";
import { Container, FormGroup, Form, Label, Input } from "reactstrap";
import API from "../utils/API";
import ImageChoices from "../components/imageChoices";

function NewCharacter(props) {
  const { authenticationState } = useContext(UserContext);
  const [formObject, setFormObject] = useState({});
  const history = useHistory();
  const alert = useAlert();
  const bazaarName = "Cool Bazaar";

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  function handleFormSubmit() {
    return;
  }

  return (
    <Container>
      <Form onSubmit={handleFormSubmit} className="text-center">
        <FormGroup row className="mt-4">
          <Label className="text-center" for="characterName">
            Character Name
          </Label>
          <Input
            name="characterName"
            id="characterName"
            placeholder="Lester Ressoration"
            onChange={handleInputChange}
          />
        </FormGroup>
        <ImageChoices handleInputChange={handleInputChange} />

        <FormGroup>
          <Label for="startingGold">Starting Wealth</Label>
          <Input
            name="wallet"
            id="startingGold"
            placeholder="Enter your starting gold"
            onChange={handleInputChange}
          />
        </FormGroup>
        <button className="btn-small ml-3">Add Starting Equipment</button>
        <button className="btn-small mr-3">Visit {bazaarName}</button>
      </Form>
    </Container>
  );
}

export default NewCharacter;
