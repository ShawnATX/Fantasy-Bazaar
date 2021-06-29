import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Offcanvas from "react-bootstrap/Offcanvas";
import API from "../utils/API";
import CharacterDetails from "../components/Bazaar/CharacterDetails";

const BazaarHome = (props) => {
  const { setPageState, bazaar } = props;

  const [showOffCanvas, setShowOffcanvas] = useState(false);
  const handleCloseOffcanvas = () => setShowOffcanvas(false);
  const handleShowOffcanvas = () => setShowOffcanvas(true);
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
              <div>
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
          <Offcanvas
            show={showOffCanvas}
            onHide={handleCloseOffcanvas}
            placement="bottom"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title className="mx-auto">
                {canvasCharacter.characterName} - {canvasCharacter.wallet} gold
              </Offcanvas.Title>
              {canvasCharacter.pendingApproval && (
                <Button
                  variant="secondary"
                  onClick={() => approvePendingChanges(canvasCharacter)}
                >
                  Approve Pending Character Changes
                </Button>
              )}
            </Offcanvas.Header>
            <Offcanvas.Body>
              <CharacterDetails
                character={canvasCharacter}
                approvePendingChanges={approvePendingChanges}
              />
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      ) : (
        <p>No Characters Yet</p>
      )}
      <Button
        className="text-center btn-small"
        variant="secondary"
        onClick={() => userHome()}
      >
        Back To User Home
      </Button>
    </Container>
  );
};

export default BazaarHome;
