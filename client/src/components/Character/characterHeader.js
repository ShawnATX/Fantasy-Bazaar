import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import CoinIcon from "../../images/Coins.svg";

function CharacterHeader(props) {
  const { characterInfo, viewState } = props;
  const [goldEdit, setGoldEdit] = useState(false);
  const [formObject, setFormObject] = useState({});
  const [goldModifier, setGoldModifier] = useState("+");
  const [validated, setValidated] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    if (viewState) {
      if (viewState === "Inventory") {
        setGoldEdit(true);
      } else {
        setGoldEdit(false);
      }
    }
  }, [viewState]);

  const handleShowOverlay = () => {
    setShowOverlay(!showOverlay);
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
      let walletChange = formObject.gold;
      if (goldModifier === "-") {
        walletChange = walletChange * -1;
      }
      props.updateCharacterGold(characterInfo, walletChange);
      handleShowOverlay();
      // API.updateGold(characterInfo._id, { wallet: walletChange })
      //   .then((res) => {
      //     if (res.status === 200) {
      //       props.setCharacterObject({
      //         ...characterInfo,
      //         wallet: res.data,
      //       });
      //       handleShowOverlay();
      //     }
      //   })
      //   .catch((err) => console.log(err));
    }
  };

  const popover = (
    <Popover id='popover-wallet'>
      <Popover.Body className='bg-dark-grey'>
        <Form
          validated={validated}
          className='bg-dark-grey'
          onSubmit={handleFormSubmit}
        >
          <Form.Label className='bg-dark-grey'>Add or Subtract gold</Form.Label>
          <InputGroup hasValidation className='bg-dark-grey'>
            <InputGroup.Text onClick={adjustGoldModifier}>
              {goldModifier}
            </InputGroup.Text>
            <Form.Control
              required
              type='number'
              name='gold'
              onChange={handleInputChange}
            />
            <Button variant='secondary' type='submit'>
              <i
                className='bi bi-check-lg bg-grey'
                style={{ fontSize: "1rem" }}
              />
            </Button>
          </InputGroup>
        </Form>
      </Popover.Body>
    </Popover>
  );

  return (
    <Row className='border p-1 mb-3 text-center sticky-top'>
      <Col
        className='text-center p-0 mx-2 mh-50'
        xs={{ span: 5, offset: 4 }}
        sm={{ span: 6, offset: 3 }}
        md={{ span: 6, offset: 3 }}
        lg={{ span: 5, offset: 3 }}
      >
        <Row className='mx-0'>
          <Col
            xs={{ span: 8, offset: 2 }}
            sm={{ span: 6, offset: 3 }}
            md={{ span: 6, offset: 3 }}
            lg={{ span: 5, offset: 3 }}
          >
            <img
              src={characterInfo.characterImage}
              alt='Character Portrait'
              className='img-fluid mx-auto'
            />
          </Col>
        </Row>
        {characterInfo.characterName}
      </Col>
      <Col className='text-center p-0 mx-2 my-auto'>
        <Row className='mx-0 mt-2 my-auto'>
          <Col className='justify-center mt-1'>
            {goldEdit ? (
              <>
                <OverlayTrigger
                  trigger='click'
                  placement='bottom'
                  overlay={popover}
                  show={showOverlay}
                  onToggle={handleShowOverlay}
                >
                  <div>
                    {characterInfo.wallet}
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
                      className='bi bi-pencil-square'
                      style={{
                        fontSize: "1.6em",
                      }}
                    ></i>
                  </div>
                </OverlayTrigger>
              </>
            ) : (
              <>
                {characterInfo.wallet}
                <img
                  className='ml-1'
                  src={CoinIcon}
                  alt='gold coins'
                  style={{
                    marginLeft: "0.8rem",
                    backgroundColor: "transparent",
                  }}
                />
              </>
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default CharacterHeader;
