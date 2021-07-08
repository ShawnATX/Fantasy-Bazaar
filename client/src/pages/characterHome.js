import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { useAlert } from "react-alert";
import API from "../utils/API";
import Inventory from "../components/Character/inventory";
import StoreFront from "../components/Character/storeFront";
import CharacterMain from "../components/Character/characterMain";
import CharacterHeader from "../components/Character/characterHeader";

const CharacterHome = (props) => {
  //props = character, setCharacter, setPageState
  const [bazaarObject, setBazaarObject] = useState({});
  const [viewState, setViewState] = useState("Home");
  const [waitingResponse, setWaitingResponse] = useState(false);
  const history = useHistory();
  const alert = useAlert();

  useEffect(() => {
    getBazaarSetting();
  }, [props.character]);

  const sellItem = (item) => {
    let newItems = props.character.items;
    for (var i = 0; i < props.character.items.length; i++) {
      if (props.character.items[i] === item._id) {
        newItems.splice(i, 1);
        i = props.character.items.length;
      }
    }
    API.characterSale({
      soldItem: item._id,
      items: newItems,
      character: props.character._id,
    }).then((res) => {
      props.setCharacter({
        ...props.character,
        items: res.data.items,
        wallet: res.data.wallet,
      });
    });
  };

  const purchaseItem = (item) => {
    if (item.value > props.character.wallet) {
      alert.show("Looks like that is a bit too expensive...");
    } else {
      setWaitingResponse(true);
      API.characterPurchase({
        items: [item._id],
        character: props.character._id,
      })
        .then((res) => {
          setWaitingResponse(false);
          props.setCharacter({
            ...props.character,
            items: res.data.items,
            wallet: res.data.wallet,
          });
        })
        .catch((err) => console.log(err));
    }
  };

  const getBazaarSetting = () => {
    API.getBazaarId(props.character.bazaar).then((res) => {
      setBazaarObject({
        bazaarName: res.data.bazaarName,
        system: res.data.system,
        limitedInventory: res.data.limitedInventory,
        requireCustomItemApproval: res.data.requireCustomItemApproval,
        requirePurchaseApproval: res.data.requirePurchaseApproval,
        requireSaleApproval: res.data.requireSaleApproval,
        requireWalletAdditionApproval: res.data.requireWalletAdditionApproval,
        requireWalletChangeApproval: res.data.requireWalletChangeApproval,
        id: res.data._id,
      });
    });
  };

  const userHome = () => {
    history.push("/userhome");
    props.setPageState("user");
  };

  const renderPage = () => {
    if (viewState === "Home") {
      return (
        <CharacterMain
          setViewState={setViewState}
          characterObject={props.character}
          userHome={userHome}
        />
      );
    } else if (viewState === "Inventory") {
      return (
        <Inventory
          setViewState={setViewState}
          items={props.character.items}
          sell={sellItem}
          waitingResponse={waitingResponse}
          userHome={userHome}
        />
      );
    } else if (viewState === "Store") {
      return (
        <StoreFront
          setViewState={setViewState}
          waitingResponse={waitingResponse}
          purchase={purchaseItem}
          bazaarSettings={bazaarObject}
          userHome={userHome}
        />
      );
    } else {
      return <CharacterMain setViewState={"Home"} />;
    }
  };

  return (
    <Container>
      <CharacterHeader
        characterInfo={props.character}
        setCharacterObject={props.setCharacter}
        viewState={viewState}
      />
      {renderPage()}
    </Container>
  );
};

export default CharacterHome;
