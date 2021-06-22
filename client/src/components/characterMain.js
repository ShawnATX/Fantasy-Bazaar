import React from "react";
import { Row, Col } from "reactstrap";

const CharacterMain = (props) => {
  return (
    <div>
      <Row className="mt-5 px-5 mb-3">
        <Col className="text-center">
          <button
            href="#Inventory"
            alt="Manage Inventory"
            className="text-center"
            onClick={() => props.setViewState("Inventory")}
          >
            Manage {props.characterObject.characterName}'s Inventory
          </button>
        </Col>

        <Col className="text-center">
          <button
            href="#Store"
            alt="Visit The Bazaar"
            className="text-center"
            onClick={() => props.setViewState("Store")}
          >
            Go Shopping
          </button>
        </Col>
      </Row>
    </div>
  );
};

export default CharacterMain;
