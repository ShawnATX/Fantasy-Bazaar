import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { useAlert } from "react-alert";
import { navigate } from "hookrouter";
import API from "../utils/API";
import Inventory from "../components/Character/inventory";
import StoreFront from "../components/Character/storeFront";
import CharacterMain from "../components/Character/characterMain";
import CharacterHeader from "../components/Character/characterHeader";

const CharacterHome = (props) => {
  const [bazaarObject, setBazaarObject] = useState({});
  const [viewState, setViewState] = useState("Home");
  const [waitingResponse, setWaitingResponse] = useState(false);
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
      trx: bazaarObject.requireSaleApproval,
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
        trx: bazaarObject.requirePurchaseApproval,
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

  const updateCharacterGold = (character, walletChange) => {
    API.updateGold(character._id, {
      wallet: walletChange,
      trx: bazaarObject.requireWalletChangeApproval,
    })
      .then((res) => {
        if (res.status === 200) {
          props.setCharacter({
            ...props.character,
            wallet: res.data,
          });
        }
      })
      .catch((err) => console.log(err));
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
        requireWalletChangeApproval: res.data.requireWalletChangeApproval,
        id: res.data._id,
      });
    });
  };

  const userHome = () => {
    navigate("/userhome");
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
        bazaaar={bazaarObject}
        updateCharacterGold={updateCharacterGold}
      />
      {renderPage()}
    </Container>
  );
};

export default CharacterHome;
