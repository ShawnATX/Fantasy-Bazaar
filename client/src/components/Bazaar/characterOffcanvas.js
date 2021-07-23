import React, { useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CoinIcon from "../../images/Coins.svg";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import CharacterDetails from "./CharacterDetails";

const CharacterOffcanvas = (props) => {
  const { character, approvePendingChanges } = props;
  const [editGold, setEditGold] = useState(false);
  const [formObject, setFormObject] = useState({});
  const [goldModifier, setGoldModifier] = useState("+");
  const [validated, setValidated] = useState(false);

  useEffect(() => {}, [character]);

  const handleCloseOffcanvas = () => {
    setFormObject({});
    props.setShowOffcanvas(false);
  };

  const handleEditGold = () => {
    setEditGold(!editGold);
  };

  const adjustGoldModifier = () => {
    if (goldModifier === "+") {
      setGoldModifier("-");
    } else {
      setGoldModifier("+");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  };

  const handleFormSubmit = (event) => {
    let form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(false);
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      setValidated(true);
      let walletChange = Math.abs(formObject.gold);
      if (goldModifier === "-") {
        walletChange = walletChange * -1;
      }
      props.API.updateGold(character._id, { wallet: walletChange })
        .then((res) => {
          if (res.status === 200) {
            props.setCanvasCharacter({
              ...character,
              wallet: res.data,
            });
            handleEditGold();
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Offcanvas
      show={props.showOffCanvas}
      onHide={handleCloseOffcanvas}
      placement='bottom'
    >
      <Offcanvas.Header closeButton className='bg-grey'>
        {editGold ? (
          <Row className='bg-grey mx-auto'>
            <Col sm={6} className='bg-grey align-middle my-auto px-0'>
              <h3 className='bg-grey' onClick={handleEditGold}>
                {character.characterName} - {character.wallet}
                <img
                  className='img-fluid'
                  src={CoinIcon}
                  alt='gold coins'
                  style={{
                    marginLeft: "0.8rem",
                    backgroundColor: "transparent",
                  }}
                />
              </h3>
            </Col>
            <Col sm={6} className='bg-grey align-middle my-auto'>
              <Form
                validated={validated}
                className='bg-dark-grey'
                onSubmit={handleFormSubmit}
              >
                <InputGroup hasValidation className='bg-dark-grey'>
                  <InputGroup.Text onClick={adjustGoldModifier}>
                    {goldModifier}
                  </InputGroup.Text>
                  <Form.Control
                    type='number'
                    name='gold'
                    placeholder='Add or Subtract gold'
                    onChange={handleInputChange}
                  />
                  <Button
                    variant='secondary'
                    type='submit'
                    className='bg-dark-grey'
                  >
                    <i
                      className='bi bi-check-lg bg-dark-grey'
                      style={{ fontSize: "1rem" }}
                    />
                  </Button>
                </InputGroup>
              </Form>
            </Col>
          </Row>
        ) : (
          <Row className='bg-grey mx-auto'>
            <Col sm={10} className='bg-grey align-middle my-auto px-auto'>
              <h3 className='bg-grey text-nowrap' onClick={handleEditGold}>
                {character.characterName} - {character.wallet}
                <img
                  className='img-fluid'
                  src={CoinIcon}
                  alt='gold coins'
                  style={{
                    marginLeft: "0.8rem",
                    backgroundColor: "transparent",
                  }}
                />
                <i
                  onClick={handleEditGold}
                  className='bi bi-pencil-square bg-grey'
                  style={{
                    fontSize: "0.8em",
                  }}
                ></i>
              </h3>
            </Col>
          </Row>
        )}
        {character.pendingApproval && (
          <Button
            variant='secondary bg-dark-grey'
            onClick={() => approvePendingChanges(character)}
          >
            Approve Pending Character Changes
          </Button>
        )}
      </Offcanvas.Header>
      <Offcanvas.Body className='bg-dark-grey'>
        <CharacterDetails
          character={character}
          approvePendingChanges={approvePendingChanges}
        />
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CharacterOffcanvas;
