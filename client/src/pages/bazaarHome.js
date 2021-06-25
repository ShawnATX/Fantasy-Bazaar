import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../utils/userContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import API from "../utils/API";

const BazaarHome = (props) => {
  const { authenticationState } = useContext(UserContext);
  const { setPageState } = props;
  const [bazaarObject, setBazaarObject] = useState(props.bazaar);
  const [charactersObject, setCharactersObject] = useState([]);

  const history = useHistory();

  useEffect(() => {
    getCharactersDetails();
  });

  const getCharactersDetails = () => {
    if (bazaarObject.characters.length !== 0) {
      API.getCharacters(bazaarObject.characters).then((res) => {
        setCharactersObject(res.data);
      });
    }
  };

  const userHome = () => {
    history.push("/userhome");
    setPageState("user");
  };

  const goToCharacterDetails = (character) => {
    console.log(character);
  };

  return (
    <Container fluid={true}>
      <h2 className="display-3">{bazaarObject.bazaarName}</h2>
      <p>
        Player Join Code:{" "}
        <span className="display-5">{bazaarObject.joinCode}</span>
      </p>
      Characters
      {bazaarObject.characters.length > 0 ? (
        <ListGroup>
          {charactersObject.map((character) => (
            <ListGroup.Item
              tag="button"
              key={character._id}
              onClick={() => {
                goToCharacterDetails(character);
              }}
            >
              {character.characterName}
            </ListGroup.Item>
          ))}
        </ListGroup>
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
