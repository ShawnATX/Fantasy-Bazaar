import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import API from "../utils/API";
import CharacterOffcanvas from "../components/Bazaar/characterOffcanvas";
import CustomItemDnD from "../components/CustomItem/customItemDnD";
import CustomItemPF1e from "../components/CustomItem/customItemPF1e";
import { navigate } from "hookrouter";

const BazaarHome = (props) => {
  const { setPageState, bazaar } = props;

  const [showOffCanvas, setShowOffcanvas] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const handleCloseOffcanvas = () => setShowOffcanvas(false);
  const handleShowOffcanvas = () => setShowOffcanvas(true);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [canvasCharacter, setCanvasCharacter] = useState({});
  const [charactersObject, setCharactersObject] = useState([]);

  useEffect(() => {
    getCharactersDetails();
  }, [props.bazaar]);

  const getCharactersDetails = () => {
    if (bazaar.characters.length !== 0) {
      API.getCharacters(bazaar.characters)
        .then((res) => {
          setCharactersObject(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  const approvePendingChanges = (character) => {
    API.updateCharacter(character._id, { pendingApproval: false })
      .then((character) => {
        getCharactersDetails();
        setCanvasCharacter(character.data);
      })
      .catch((err) => console.log(err));
  };

  const userHome = () => {
    navigate("/userhome");
    setPageState("user");
  };

  const goToCharacterDetails = (character) => {
    setCanvasCharacter(character);
    handleShowOffcanvas();
  };

  const handleLinkCopy = () => {
    setLinkCopied(true);
    setTimeout(() => {
      setLinkCopied(false);
    }, 4000);
  };

  const popover = (
    <Popover id='popover-join'>
      <Popover.Body className='bg-dark-grey'>
        <p
          style={{
            fontSize: "1.3em",
          }}
          className='bg-dark-grey'
        >
          Player Join Code: <strong>{props.bazaar.joinCode}</strong>
        </p>
        <p
          className='bg-dark-grey'
          style={{
            fontSize: "1.5em",
          }}
          onClick={() => {
            navigator.clipboard.writeText(
              `https://fantasybazaar.app/newusercreds/player/${bazaar.joinCode}`
            );
            handleLinkCopy();
          }}
        >
          {linkCopied ? `Copied!` : `Click here to copy your direct join link!`}
        </p>
      </Popover.Body>
    </Popover>
  );

  return (
    <Container fluid='md'>
      <OverlayTrigger trigger='click' placement='bottom' overlay={popover}>
        <h2 className='display-3'>{bazaar.bazaarName}</h2>
      </OverlayTrigger>

      {bazaar.characters.length > 0 ? (
        <div>
          <Row xs={2} sm={2} md={3} lg={4}>
            {charactersObject.map((character) => (
              <div key={character._id}>
                {character.pendingApproval ? (
                  <Col key={character._id}>
                    <Card onClick={() => goToCharacterDetails(character)}>
                      <Card.Img variant='top' src={character.characterImage} />
                      <Card.Title className='mb-0 py-2'>
                        {character.characterName}
                        <i
                          className='bi bi-exclamation-diamond-fill'
                          style={{
                            fontSize: "1.1em",
                            color: "white",
                            position: "absolute",
                            zIndex: 2,
                            marginLeft: "3rem",
                          }}
                        ></i>
                      </Card.Title>
                    </Card>
                  </Col>
                ) : (
                  <Col key={character._id}>
                    <Card onClick={() => goToCharacterDetails(character)}>
                      <Card.Img variant='top' src={character.characterImage} />
                      <Card.Title className='mb-0 py-2'>
                        {character.characterName}
                      </Card.Title>
                    </Card>
                  </Col>
                )}
              </div>
            ))}
          </Row>
          <CharacterOffcanvas
            character={canvasCharacter}
            setCanvasCharacter={setCanvasCharacter}
            showOffCanvas={showOffCanvas}
            setShowOffcanvas={setShowOffcanvas}
            approvePendingChanges={approvePendingChanges}
            API={API}
          />
        </div>
      ) : (
        <p>No Characters Yet</p>
      )}
      <Row className='my-3'>
        <Col>
          <Button
            className='text-center btn-small float-end'
            variant='secondary'
            onClick={handleShowModal}
          >
            Add Custom Item
          </Button>
        </Col>
        <Col>
          <Button
            className='text-center btn-small float-start'
            variant='secondary'
            onClick={() => userHome()}
          >
            Back To User Home
          </Button>
        </Col>
      </Row>
      <Modal
        fullscreen='sm-down'
        size='lg'
        show={showModal}
        onHide={handleCloseModal}
        dialogClassName='bg-dark-grey'
      >
        <Modal.Header className='bg-dark-grey'>
          <Modal.Title className='bg-dark-grey'>New Item</Modal.Title>
        </Modal.Header>
        <Modal.Body className='bg-dark-grey'>
          {bazaar.system === "DnD" ? (
            <CustomItemDnD
              bazaarId={bazaar._id}
              handleCloseModal={handleCloseModal}
            />
          ) : (
            <CustomItemPF1e
              bazaarId={bazaar._id}
              handleCloseModal={handleCloseModal}
            />
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default BazaarHome;
