import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../utils/userContext";
import Container from "react-bootstrap/Container";
import { useAlert } from "react-alert";
import API from "../utils/API";
import Inventory from "../components/Character/inventory";
import StoreFront from "../components/Character/storeFront";
import CharacterMain from "../components/Character/characterMain";
import CharacterHeader from "../components/Character/characterHeader";

const CharacterHome = (props) => {
  const { setPageState } = props;
  const { authenticationState } = useContext(UserContext);
  const [characterObject, setCharacterObject] = useState(props.character);
  const [bazaarObject, setBazaarObject] = useState({});
  const [viewState, setViewState] = useState("Home");
  const [waitingResponse, setWaitingResponse] = useState(false);
  const history = useHistory();
  const alert = useAlert();

  useEffect(() => {
    if (!authenticationState.isAuthenticated) {
      history.push("/login");
    }
    getBazaarSetting();
  }, [authenticationState]);

  const sellItem = (item) => {
    let newItems = characterObject.items;
    // let newWallet = characterObject.wallet;
    for (var i = 0; i < characterObject.items.length; i++) {
      if (characterObject.items[i] === item._id) {
        newItems.splice(i, 1);
        console.log(newItems);
        // newWallet = newWallet + item.value;
        i = characterObject.items.length;
      }
    }
    API.characterSale({
      soldItem: item._id,
      items: newItems,
      // wallet: newWallet,
      character: characterObject._id,
    }).then((res) => {
      setCharacterObject({
        ...characterObject,
        items: res.data.items,
        wallet: res.data.wallet,
      });
    });
  };

  function purchaseItem(item) {
    if (item.value > characterObject.wallet) {
      alert.show("Looks like that is a bit too expensive...");
    } else {
      setWaitingResponse(true);
      API.characterPurchase({
        items: [item._id],
        character: characterObject._id,
      })
        .then((res) => {
          setWaitingResponse(false);
          setCharacterObject({
            ...characterObject,
            items: res.data.items,
            wallet: res.data.wallet,
          });
        })
        .catch((err) => console.log(err));
    }
  }

  const getBazaarSetting = () => {
    API.getBazaarId(characterObject.bazaar).then((res) => {
      setBazaarObject({
        bazaarName: res.data.bazaarName,
        system: res.data.system,
        limitedInventory: res.data.limitedInventory,
        requireCustomItemApproval: res.data.requireCustomItemApproval,
        requirePurchaseApproval: res.data.requirePurchaseApproval,
        requireSaleApproval: res.data.requireSaleApproval,
        requireWalletAdditionApproval: res.data.requireWalletAdditionApproval,
        requireWalletChangeApproval: res.data.requireWalletChangeApproval,
      });
    });
  };

  const userHome = () => {
    history.push("/userhome");
    setPageState("user");
  };

  const renderPage = () => {
    if (viewState === "Home") {
      return (
        <CharacterMain
          setViewState={setViewState}
          characterObject={characterObject}
        />
      );
    } else if (viewState === "Inventory") {
      return (
        <Inventory
          setViewState={setViewState}
          items={characterObject.items}
          sell={sellItem}
          waitingResponse={waitingResponse}
        />
      );
    } else if (viewState === "Store") {
      return (
        <StoreFront
          setViewState={setViewState}
          waitingResponse={waitingResponse}
          purchase={purchaseItem}
          bazaarSettings={bazaarObject}
        />
      );
    } else {
      return <CharacterMain setViewState={"Home"} />;
    }
  };

  return (
    <Container>
      <CharacterHeader characterInfo={characterObject} />

      {renderPage()}
      <button className="text-center btn-small" onClick={() => userHome()}>
        Back To User Home
      </button>
    </Container>
  );
};

export default CharacterHome;
