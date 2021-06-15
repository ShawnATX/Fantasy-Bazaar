import React from "react";
import { Row, Col } from "reactstrap";

const CharacterMain = (props) => {
  return (
    <div>
      <Row className="mt-5 px-5">
        <Col className="text-center">
          <button
            href="#Inventory"
            alt="Manage Inventory"
            className="text-center"
            onClick={() => props.setViewState("Inventory")}
          >
            Manage Inventory
          </button>
        </Col>
      </Row>
      <Row className="my-5 px-5">
        <Col className="text-center">
          <button
            href="#Store"
            alt="Visit The Bazaar"
            className="text-center"
            onClick={() => props.setViewState("Store")}
          >
            Visit The Bazaar
          </button>
        </Col>
      </Row>
    </div>
  );
};

export default CharacterMain;
