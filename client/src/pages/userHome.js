import React, { useState, useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import UserContext from "../utils/userContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import API from "../utils/API";
import CharacterHome from "./characterHome";
import BazaarHome from "./bazaarHome";
import NavbarComponent from "../components/navbar";

function UserHome() {
  const { authenticationState } = useContext(UserContext);
  const params = new URLSearchParams(useLocation().search);
  const [charactersDetails, setCharactersDetails] = useState([]);
  const [bazaars, setBazaars] = useState([]);
  const [chosenEntity, setChosenEntity] = useState({});
  const [pageState, setPageState] = useState("user");
  const history = useHistory();

  useEffect(() => {
    if (!authenticationState.isAuthenticated) {
      getSessionUser();
    } else {
      getCharacters();
      getBazaars();
      checkParams();
    }
  }, [pageState]);

  const getSessionUser = () => {
    API.getSessionUser()
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          authenticationState.userHasAuthenticated(true, {
            email: res.data.email,
            bazaars: res.data.bazaars,
            characters: res.data.characters,
            id: res.data.id,
          });
        } else {
          history.push("/");
        }
      })
      .then(() => {
        getCharacters();
        getBazaars();
        checkParams();
      })
      .catch((err) => {
        history.push("/");
      });
  };

  const checkParams = () => {
    // if (params.get("bazaar")) {
    // } else if (params.get("character")) {
    //   let characterId = params.get("character");
    //   let userCharacters = authenticationState.user.characters;
    //   const character = userCharacters.filter((character) => {
    //     return character._id === characterId;
    //   });
    // }
  };

  const getCharacters = () => {
    if (
      authenticationState.user &&
      authenticationState.user.characters.length > 0
    ) {
      API.getCharacters(authenticationState.user.characters)
        .then((res) => {
          setCharactersDetails(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  const getBazaars = () => {
    if (
      authenticationState.user &&
      authenticationState.user.bazaars.length > 0
    ) {
      API.getBazaars(authenticationState.user.bazaars)
        .then((res) => {
          setBazaars(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  const goToCharacterHome = (character) => {
    setChosenEntity(character);
    history.push("/userhome?character=" + character._id);
    setPageState("character");
  };

  const goToBazaarHome = (bazaar) => {
    setChosenEntity(bazaar);
    history.push("/userhome?bazaar=" + bazaar.joinCode);
    setPageState("bazaar");
  };

  const newCharacter = () => {
    history.push("/newcharacter");
  };

  const newBazaar = () => {
    history.push("/newbazaar");
  };

  const handleLogout = () => {
    history.push("/logout");
  };

  const renderPage = () => {
    if (pageState === "user") {
      return (
        <div>
          <h1 className='display-3'>User Home</h1>
          <Row>
            <Col xs={{ size: 8, offset: 2 }} sm={{ size: 6, offset: 0 }}>
              Characters
              <ListGroup>
                {charactersDetails.map((character) => (
                  <ListGroup.Item
                    tag='button'
                    key={character._id}
                    onClick={() => {
                      goToCharacterHome(character);
                    }}
                  >
                    {character.characterName}
                  </ListGroup.Item>
                ))}
                <ListGroup.Item tag='button' onClick={newCharacter}>
                  + New Character
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col xs={{ size: 8, offset: 2 }} sm={{ size: 6, offset: 0 }}>
              Bazaars
              <ListGroup>
                {bazaars.map((bazaar) => (
                  <ListGroup.Item
                    tag='button'
                    key={bazaar._id}
                    onClick={() => {
                      goToBazaarHome(bazaar);
                    }}
                  >
                    {bazaar.bazaarName}
                  </ListGroup.Item>
                ))}
                <ListGroup.Item tag='button' onClick={newBazaar}>
                  + New Bazaar
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </div>
      );
    } else if (pageState === "character") {
      return (
        <CharacterHome
          character={chosenEntity}
          setCharacter={setChosenEntity}
          setPageState={setPageState}
        />
      );
    } else if (pageState === "bazaar") {
      return <BazaarHome bazaar={chosenEntity} setPageState={setPageState} />;
    }
  };

  return (
    <Container className='text-center'>
      <NavbarComponent
        characters={charactersDetails}
        bazaars={bazaars}
        goToCharacterHome={goToCharacterHome}
        goToBazaarHome={goToBazaarHome}
        handleLogout={handleLogout}
        setPageState={setPageState}
        history={history}
      />
      {renderPage()}
    </Container>
  );
}

export default UserHome;
