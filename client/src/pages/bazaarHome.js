import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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
              <Col key={character._id}>
                <Card onClick={() => goToCharacterDetails(character)}>
                  <Card.Img variant="top" src={character.characterImage} />
                  <Card.Title className="mb-0">
                    {character.characterName}
                  </Card.Title>
                  <Card.Body></Card.Body>
                </Card>
              </Col>
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
            </Offcanvas.Header>
            <Offcanvas.Body>
              {" "}
              <CharacterDetails character={canvasCharacter} />
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      ) : (
        <p>No Characters Yet</p>
      )}
      <button className="text-center btn-small" onClick={() => userHome()}>
        Back To User Home
      </button>
    </Container>
  );
};

export default BazaarHome;
