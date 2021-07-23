import React, { useState, useContext, useEffect } from "react";
import UserContext from "../utils/userContext";
import { navigate } from "hookrouter";
import API from "../utils/API";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import CharacterHome from "./characterHome";
import BazaarHome from "./bazaarHome";
import NavbarComponent from "../components/User/navbar";
import UserAd from "../components/User/userAdComponent";

const UserHome = (props) => {
  const { authenticationState } = useContext(UserContext);
  const [charactersDetails, setCharactersDetails] = useState([]);
  const [bazaars, setBazaars] = useState([]);
  const [chosenEntity, setChosenEntity] = useState({});
  const [pageState, setPageState] = useState("user");

  useEffect(() => {
    if (!authenticationState.isAuthenticated) {
      getSessionUser();
    } else {
      getEntities();
    }
  }, []);

  const getSessionUser = () => {
    API.getSessionUser()
      .then((res) => {
        if (res.status === 200) {
          authenticationState.userHasAuthenticated(true, {
            email: res.data.email,
            bazaars: res.data.bazaars,
            characters: res.data.characters,
            id: res.data.id,
          });
        } else {
          navigate("/");
        }
      })
      .then(() => {
        getEntities();
      })
      .catch((err) => {
        navigate("/");
      });
  };

  const checkParams = () => {
    if (props.bazaar) {
      let bazaar = getBazaarById();
      goToBazaarHome(bazaar);
    } else if (props.character) {
      let character = getCharacterById();
      goToCharacterHome(character);
    }
  };

  const getBazaarById = () => {
    for (const bazaar in bazaars) {
      if (bazaar.joinCode === props.bazaar) {
        return bazaar;
      }
    }
    return null;
  };

  const getCharacterById = () => {
    for (const character in charactersDetails) {
      if (props.character === character._id) {
        return character;
      }
    }
    return null;
  };
  const getCharacters = () => {
    if (
      authenticationState.user &&
      authenticationState.user.characters.length > 0
    ) {
      API.getCharacters(authenticationState.user.characters)
        .then((res) => {
          authenticationState.userHasAuthenticated(true, {
            ...authenticationState.user,
            characters: res.data,
          });
          setCharactersDetails(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  const getEntities = () => {
    if (
      authenticationState.user &&
      authenticationState.user.characters.length > 0
    ) {
      API.getCharacters(authenticationState.user.characters)
        .then((res) => {
          authenticationState.userHasAuthenticated(true, {
            ...authenticationState.user,
            characters: res.data,
          });
          setCharactersDetails(res.data);
          if (authenticationState.user.bazaars.length > 0) {
            API.getBazaars(authenticationState.user.bazaars)
              .then((res) => {
                authenticationState.userHasAuthenticated(true, {
                  ...authenticationState.user,
                  bazaars: res.data,
                });
                setBazaars(res.data);
              })
              .then(() => {
                checkParams();
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const characterList = () => {
    return charactersDetails.map((character) => (
      <ListGroup.Item
        tag='button'
        key={character._id}
        onClick={() => {
          goToCharacterHome(character);
        }}
      >
        {character.characterName}
      </ListGroup.Item>
    ));
  };

  const goToCharacterHome = (character) => {
    setChosenEntity(character);
    navigate("/userhome/character/" + character._id);
    setPageState("character");
  };

  const goToBazaarHome = (bazaar) => {
    setChosenEntity(bazaar);
    navigate("/userhome/bazaar/" + bazaar.joinCode);
    setPageState("bazaar");
  };

  const newCharacter = () => {
    navigate("/newcharacter");
  };

  const newBazaar = () => {
    navigate("/newbazaar");
  };

  const handleLogout = () => {
    navigate("/logout");
  };

  const renderPage = () => {
    if (pageState === "user") {
      return (
        <div>
          <h1 className='display-3'>User Home</h1>
          <Row>
            <Col xs={{ size: 8 }} sm={{ size: 6, offset: 0 }}>
              Characters
              <ListGroup>
                {characterList()}
                <ListGroup.Item tag='button' onClick={newCharacter}>
                  + New Character
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col xs={{ size: 8 }} sm={{ size: 6, offset: 0 }}>
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
          getCharacters={getCharacters}
        />
      );
    } else if (pageState === "bazaar") {
      return <BazaarHome bazaar={chosenEntity} setPageState={setPageState} />;
    }
  };

  return (
    <Container className='text-center' fluid='lg'>
      <NavbarComponent
        characters={charactersDetails}
        bazaars={bazaars}
        goToCharacterHome={goToCharacterHome}
        goToBazaarHome={goToBazaarHome}
        handleLogout={handleLogout}
        setPageState={setPageState}
      />
      {renderPage()}
      <UserAd />
    </Container>
  );
};

export default UserHome;
