import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import CharacterFooter from "./characterFooter";

const CharacterMain = (props) => {
  const { userHome } = props;
  return (
    <div>
      <Row className='mt-5 px-5 mb-5 d-flex justify-content-center'>
        <Col className='mx-2'>
          <Button
            variant='secondary'
            alt='Manage Inventory'
            className='text-center btn-small mx-3 my-2'
            onClick={() => props.setViewState("Inventory")}
          >
            Manage {props.characterObject.characterName}'s Inventory
          </Button>
          <Button
            variant='secondary'
            alt='Visit The Bazaar'
            className='text-center btn-small mx-3 my-2'
            onClick={() => props.setViewState("Store")}
          >
            Go Shopping
          </Button>
        </Col>
      </Row>
      <CharacterFooter userHome={userHome} />
    </div>
  );
};

export default CharacterMain;
