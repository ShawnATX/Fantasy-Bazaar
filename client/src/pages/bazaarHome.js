import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../utils/userContext";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import API from "../utils/API";

const BazaarHome = (props) => {
  const { authenticationState } = useContext(UserContext);
  const { setPageState } = props;
  const [bazaarObject, setBazaarObject] = useState(props.bazaar);
  const [charactersObject, setCharactersObject] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const getCharacterDetails = () => {
      if (bazaarObject.characters.length !== 0) {
        API.getCharacters(bazaarObject.characters).then((res) => {
          setCharactersObject(res.data);
        });
      }
    };
    getCharacterDetails();
  });

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
      <p>Player Join Code: {bazaarObject.joinCode}</p>
      Characters
      {bazaarObject.characters.length > 0 ? (
        <ListGroup>
          {charactersObject.map((character) => (
            <ListGroupItem
              tag="button"
              key={character._id}
              onClick={() => {
                goToCharacterDetails(character);
              }}
            >
              {character.characterName}
            </ListGroupItem>
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
