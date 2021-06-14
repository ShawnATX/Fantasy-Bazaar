import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../utils/userContext";
import { Container, Col, Row } from "reactstrap";
import { useAlert } from "react-alert";
import API from "../utils/API";
import Inventory from "../components/inventory";
import StoreFront from "../components/storeFront";
import CharacterMain from "../components/characterMain";
import CharacterHeader from "../components/characterHeader";

const CharacterHome = () => {
  const { authenticationState } = useContext(UserContext);
  const [characterObject, setCharacterObject] = useState({});
  const [pageState, setPageState] = useState("Home");
  const history = useHistory();
  const alert = useAlert();

  useEffect(() => {
    if (!authenticationState.isAuthenticated) {
      history.push("/login");
    }
    setCharacterObject(authenticationState.user);
  }, [authenticationState]);

  function sellItem(item) {
    console.log(item._id, characterObject);
    let newItems = authenticationState.user.items;
    let newWallet = authenticationState.user.wallet;
    for (var i = 0; i < authenticationState.user.items.length; i++) {
      if (authenticationState.user.items[i] === item._id) {
        newItems.splice(i, 1);
        newWallet = newWallet + item.value;
        i = authenticationState.user.items.length;
      }
    }
    console.log(newItems);
    API.userSale({ items: newItems, wallet: newWallet }).then((res) => {
      setCharacterObject({
        userName: res.data.userName,
        characterName: res.data.characterName,
        characterImage: res.data.characterImage,
        wallet: res.data.wallet,
        items: res.data.items,
        bazaars: res.data.bazaars,
      });
      authenticationState.userHasAuthenticated(true, {
        userName: res.data.userName,
        characterName: res.data.characterName,
        characterImage: res.data.characterImage,
        wallet: res.data.wallet,
        items: res.data.items,
        bazaars: res.data.bazaars,
      });
    });
  }

  function purchaseItem(item) {
    if (item.value > characterObject.wallet) {
      alert.show("Looks like that is a bit too expensive...");
    } else {
      API.userPurchase({
        wallet: characterObject.wallet - item.value,
        items: [item._id],
      })
        .then((res) => {
          setCharacterObject({
            userName: res.data.userName,
            characterName: res.data.characterName,
            characterImage: res.data.characterImage,
            wallet: res.data.wallet,
            items: res.data.items,
            bazaars: res.data.bazaars,
          });
          authenticationState.userHasAuthenticated(true, {
            userName: res.data.userName,
            characterName: res.data.characterName,
            characterImage: res.data.characterImage,
            wallet: res.data.wallet,
            items: res.data.items,
            bazaars: res.data.bazaars,
          });
        })
        .catch((err) => console.log(err));
    }
  }

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

  function renderPage() {
    if (pageState === "Home") {
      return <CharacterMain setPageState={setPageState} />;
    } else if (pageState === "Inventory") {
      return (
        <Inventory
          setPageState={setPageState}
          items={characterObject.items}
          sell={sellItem}
        />
      );
    } else if (pageState === "Store") {
      return <StoreFront setPageState={setPageState} purchase={purchaseItem} />;
    } else {
      return <CharacterMain setPageState={"Home"} />;
    }
  }

  return (
    <Container>
      <CharacterHeader user={characterObject} />

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
};

export default CharacterHome;
