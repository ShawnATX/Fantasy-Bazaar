import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useAlert } from "react-alert";
import NewCharacterImage from "./newCharacterImage";

function NewCharacterMain(props) {
  const alert = useAlert();
  const { setPageState, handleInputChange, bazaarName, characterObject } =
    props;
  const [walletValid, setWalletValid] = useState(
    !isNaN(characterObject.wallet)
  );
  const [nameValid, setNameValid] = useState(null);

  const validateNumberInput = (event) => {
    if (isNaN(event.target.value)) {
      console.log(event.target.value);
      setWalletValid(false);
    } else {
      handleInputChange(event);
      setWalletValid(true);
    }
  };

  const nextPage = () => {
    if (
      characterObject.characterName &&
      walletValid &&
      characterObject.characterImage
    ) {
      setPageState("Equipment");
    } else {
      alert.show("Please finish filling out the form");
    }
  };

  return (
    <Col md={{ span: 8, offset: 2 }}>
      <Form className="text-center">
        {characterObject.characterName.length === 0 ? (
          <Form.Group row className="mt-4">
            <Form.Label className="text-center">Character Name</Form.Label>
            <Form.Control
              invalid
              name="characterName"
              id="characterName"
              placeholder="Awesome Character Name"
              onChange={handleInputChange}
            />
            <Form.Control.Feedback>
              Every character needs a name...
            </Form.Control.Feedback>
          </Form.Group>
        ) : (
          <Form.Group row className="mt-4">
            <Form.Label className="text-center">Character Name</Form.Label>
            <Form.Control
              valid
              name="characterName"
              id="characterName"
              placeholder="Awesome Character Name"
              onChange={handleInputChange}
            />
          </Form.Group>
        )}
        <NewCharacterImage
          handleInputChange={handleInputChange}
          characterObject={characterObject}
        />

        {walletValid ? (
          <Form.Group>
            <Form.Label>Starting Gold</Form.Label>
            <Form.Control
              valid
              name="wallet"
              id="startingGold"
              onChange={validateNumberInput}
            />
          </Form.Group>
        ) : (
          <Form.Group>
            <Form.Label>Starting Gold</Form.Label>
            <Form.Control
              invalid
              name="wallet"
              id="startingGold"
              placeholder="Enter your starting gold"
              onChange={validateNumberInput}
            />
            <Form.Control.Feedback>
              Oh noes! You need a number in here
            </Form.Control.Feedback>
          </Form.Group>
        )}

        <Button
          variant="secondary"
          onClick={nextPage}
          className="btn-small ml-3"
        >
          Add Starting Equipment
        </Button>
      </Form>
    </Col>
  );
}

export default NewCharacterMain;
