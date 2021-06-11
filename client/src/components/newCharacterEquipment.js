import React from "react";
import { FormGroup, Form, Label, Input, Button } from "reactstrap";

function NewCharacterEquipment(props) {
  const { setPageState, handleInputChange, bazaarName } = props;

  return (
    <Form className="text-center">
      <Button className="btn-small mr-3">Visit {bazaarName}</Button>
    </Form>
  );
}

export default NewCharacterEquipment;
