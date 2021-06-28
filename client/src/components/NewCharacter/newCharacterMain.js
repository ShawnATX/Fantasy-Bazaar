//@TODO - fix custom validation and feedback
import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import NewCharacterImage from "./newCharacterImage";

function NewCharacterMain(props) {
  const { setPageState, handleInputChange, bazaarName, characterObject } =
    props;
  const [validated, setValidated] = useState(false);

  const handleFormSubmit = (event) => {
    let form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      setPageState("Equipment");
    }
  };

  return (
    <Form
      validated={validated}
      onSubmit={handleFormSubmit}
      className="text-center"
    >
      <Row>
        <Col md="6">
          <Form.Group className="my-4" controlId="characterNameValidation">
            <Form.Label className="text-center">Character Name</Form.Label>
            <Form.Control
              required
              type="text"
              name="characterName"
              placeholder="Awesome Character Name"
              onChange={handleInputChange}
            />
            <Form.Control.Feedback type="invalid">
              Every character needs a name...
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md="6">
          <Form.Group className="my-4" controlId="walletValidation">
            <Form.Label>Starting Gold</Form.Label>
            <Form.Control
              required
              type="number"
              name="wallet"
              placeholder="Enter your starting gold"
              onChange={handleInputChange}
            />
            <Form.Control.Feedback type="invalid">
              Oh noes! You need a number in here
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <NewCharacterImage
        handleInputChange={handleInputChange}
        characterObject={characterObject}
      />

      <Button type="submit" variant="secondary" className="btn-small ml-3">
        Add Starting Equipment
      </Button>
    </Form>
  );
}

export default NewCharacterMain;
