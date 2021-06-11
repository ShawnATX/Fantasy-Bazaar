import React from "react";
import { FormGroup, Form, Label, Input, Button } from "reactstrap";
import ImageChoices from "../components/imageChoices";

function NewCharacterMain(props) {
  const { setPageState, handleInputChange, bazaarName, formObject } = props;

  const nextPage = () => {
    console.log(formObject);
    if (
      formObject.characterName &&
      formObject.wallet &&
      formObject.characterImage
    ) {
      setPageState("Equipment");
    }
  };

  return (
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
        <Label for="startingGold">Starting Wealth</Label>
        <Input
          name="wallet"
          id="startingGold"
          placeholder="Enter your starting gold"
          onChange={handleInputChange}
        />
      </FormGroup>
      <Button onClick={nextPage} className="btn-small ml-3">
        Add Starting Equipment
      </Button>
    </Form>
  );
}

export default NewCharacterMain;
