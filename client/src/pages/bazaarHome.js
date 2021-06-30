import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import API from "../utils/API";
import CharacterOffcanvas from "../components/Bazaar/characterOffcanvas";
import CustomItem from "../components/customItem";

const BazaarHome = (props) => {
  const { setPageState, bazaar } = props;

  const [showOffCanvas, setShowOffcanvas] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleCloseOffcanvas = () => setShowOffcanvas(false);
  const handleShowOffcanvas = () => setShowOffcanvas(true);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [canvasCharacter, setCanvasCharacter] = useState({});
  const [charactersObject, setCharactersObject] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getCharactersDetails();
  }, []);

  const getCharactersDetails = () => {
    if (bazaar.characters.length !== 0) {
      API.getCharacters(bazaar.characters).then((res) => {
        setCharactersObject(res.data);
      });
    }
  };

  const approvePendingChanges = (character) => {
    API.updateCharacter(character._id, { pendingApproval: false });
  };

  const userHome = () => {
    history.push("/userhome");
    setPageState("user");
  };

  const goToCharacterDetails = (character) => {
    setCanvasCharacter(character);
    handleShowOffcanvas();
  };

  const saveCustomItem = () => {};

  return (
    <Container fluid={true}>
      <h2 className="display-3">{bazaar.bazaarName}</h2>
      <p>
        Player Join Code: <span className="display-5">{bazaar.joinCode}</span>
      </p>
      {bazaar.characters.length > 0 ? (
        <div>
          <Row xs={1} sm={2} md={3} lg={4}>
            {charactersObject.map((character) => (
              <div key={character._id}>
                {character.pendingApproval ? (
                  <Col key={character._id}>
                    <Card onClick={() => goToCharacterDetails(character)}>
                      <Card.Img variant="top" src={character.characterImage} />
                      <Card.Title className="mb-0 py-2">
                        {character.characterName}
                        <i
                          className="bi bi-exclamation-diamond-fill"
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
                      <Card.Img variant="top" src={character.characterImage} />
                      <Card.Title className="mb-0 py-2">
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
            showOffCanvas={showOffCanvas}
            setShowOffcanvas={setShowOffcanvas}
            approvePendingChanges={approvePendingChanges}
          />
        </div>
      ) : (
        <p>No Characters Yet</p>
      )}
      <Row className="my-3">
        <Col>
          <Button
            className="text-center btn-small float-end"
            variant="secondary"
            onClick={handleShowModal}
          >
            Add Custom Item
          </Button>
        </Col>
        <Col>
          <Button
            className="text-center btn-small float-start"
            variant="secondary"
            onClick={() => userHome()}
          >
            Back To User Home
          </Button>
        </Col>
      </Row>
      <Modal
        fullscreen="sm-down"
        size="lg"
        show={showModal}
        onHide={handleCloseModal}
        dialogClassName="bg-dark-grey"
      >
        <Modal.Header className="bg-dark-grey">
          <Modal.Title className="bg-dark-grey">New Item</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark-grey">
          <CustomItem
            bazaarSystem={bazaar.system}
            bazaarId={bazaar._id}
            handleCloseModal={handleCloseModal}
          />
        </Modal.Body>
        {/* <Modal.Footer className="bg-dark-grey">
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="secondary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
    </Container>
  );
};

export default BazaarHome;
