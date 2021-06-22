import React, { useState, useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import UserContext from "../utils/userContext";
import { Container, Col, Row, ListGroup, ListGroupItem } from "reactstrap";
import API from "../utils/API";
import CharacterHome from "./characterHome";
import BazaarHome from "./bazaarHome";
import NavbarComponent from "../components/navbar";

function UserHome() {
  const { authenticationState } = useContext(UserContext);
  const params = new URLSearchParams(useLocation().search);
  const [characters, setCharacters] = useState([]);
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
  }, [authenticationState]);

  const getSessionUser = () => {
    API.getSessionUser()
      .then((res) => {
        authenticationState.userHasAuthenticated(true, {
          email: res.data.email,
          bazaars: res.data.bazaars,
          characters: res.data.characters,
          id: res.data.id,
        });
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
    if (params.get("bazaar")) {
      console.log("bazaar");
      console.log(bazaars);
    } else if (params.get("character")) {
      console.log("character");
    }
  };

  const getCharacters = () => {
    if (
      authenticationState.user &&
      authenticationState.user.characters.length > 0
    ) {
      API.getCharacters(authenticationState.user.characters)
        .then((res) => {
          setCharacters(res.data);
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
    API.logoutUser().then((res) => {
      if (res.status === 200) {
        authenticationState.userHasAuthenticated({
          isAuthenticated: false,
          user: {},
        });
        history.push("/");
      } else {
        alert.show("Weird logout error happening...");
      }
    });
  };

  const renderPage = () => {
    if (pageState === "user") {
      return (
        <div>
          <NavbarComponent />
          <h1 className="display-3">User Home</h1>
          <Row>
            <Col xs={{ size: 8, offset: 2 }} sm={{ size: 6, offset: 0 }}>
              Characters
              <ListGroup>
                {characters.map((character) => (
                  <ListGroupItem
                    tag="button"
                    key={character._id}
                    onClick={() => {
                      goToCharacterHome(character);
                    }}
                  >
                    {character.characterName}
                  </ListGroupItem>
                ))}
                <ListGroupItem tag="button" onClick={newCharacter}>
                  + New Character
                </ListGroupItem>
              </ListGroup>
            </Col>

            <Col xs={{ size: 8, offset: 2 }} sm={{ size: 6, offset: 0 }}>
              Bazaars
              <ListGroup>
                {bazaars.map((bazaar) => (
                  <ListGroupItem
                    tag="button"
                    key={bazaar._id}
                    onClick={() => {
                      goToBazaarHome(bazaar);
                    }}
                  >
                    {bazaar.bazaarName}
                  </ListGroupItem>
                ))}
                <ListGroupItem tag="button" onClick={newBazaar}>
                  + New Bazaar
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </div>
      );
    } else if (pageState === "character") {
      return (
        <CharacterHome character={chosenEntity} setPageState={setPageState} />
      );
    } else if (pageState === "bazaar") {
      return <BazaarHome bazaar={chosenEntity} setPageState={setPageState} />;
    }
  };

  return (
    <Container className="text-center">
      {renderPage()}
      <Row className="sticky-footer mt-3">
        <Col className="text-center">
          <button
            className="text-center btn-small"
            onClick={() => handleLogout()}
          >
            Logout
          </button>
        </Col>
      </Row>
    </Container>
  );
}

export default UserHome;
