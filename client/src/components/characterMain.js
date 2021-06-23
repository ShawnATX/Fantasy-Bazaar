import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const CharacterMain = (props) => {
  return (
    <div>
      <Row className="mt-5 px-5 mb-3">
        <Col className="text-center">
          <Button
            variant="secondary"
            alt="Manage Inventory"
            className="text-center"
            onClick={() => props.setViewState("Inventory")}
          >
            Manage {props.characterObject.characterName}'s Inventory
          </Button>
        </Col>

        <Col className="text-center">
          <Button
            variant="secondary"
            alt="Visit The Bazaar"
            className="text-center"
            onClick={() => props.setViewState("Store")}
          >
            Go Shopping
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default CharacterMain;
