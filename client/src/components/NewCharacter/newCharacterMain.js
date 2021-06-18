import React, { useState } from "react";
import {
  FormGroup,
  Form,
  Label,
  Input,
  Button,
  FormFeedback,
  Row,
  Col,
} from "reactstrap";
import { useAlert } from "react-alert";
import ImageChoices from "../imageChoices";

function NewCharacterMain(props) {
  const alert = useAlert();
  const { setPageState, handleInputChange, bazaarName, characterObject } =
    props;
  const [walletValid, setWalletValid] = useState(
    !isNaN(characterObject.wallet)
  );

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
    <Col md={{ size: 8, offset: 2 }}>
      <Form className="text-center">
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
          <Label for="startingGold">Starting Gold</Label>

          {walletValid ? (
            <FormGroup>
              <Input
                valid
                name="wallet"
                id="startingGold"
                onChange={validateNumberInput}
              />
            </FormGroup>
          ) : (
            <FormGroup>
              <Input
                invalid
                name="wallet"
                id="startingGold"
                placeholder="Enter your starting gold"
                onChange={validateNumberInput}
              />
              <FormFeedback>Oh noes! You need a number in here</FormFeedback>
            </FormGroup>
          )}
        </FormGroup>
        <Button onClick={nextPage} className="btn-small ml-3">
          Add Starting Equipment
        </Button>
      </Form>
    </Col>
  );
}

export default NewCharacterMain;
