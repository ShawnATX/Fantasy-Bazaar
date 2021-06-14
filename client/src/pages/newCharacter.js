import React, { useState, useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import UserContext from "../utils/userContext";
import { Container } from "reactstrap";
import API from "../utils/API";
import NewCharacterMain from "../components/NewCharacter/newCharacterMain";
import NewCharacterEquipment from "../components/NewCharacter/newCharacterEquipment";

function NewCharacter(props) {
  const { authenticationState } = useContext(UserContext);
  const [characterObject, setCharacterObject] = useState({
    wallet: 0,
    characterName: "",
  });
  const [bazaarObject, setBazaarObject] = useState({});
  const history = useHistory();
  const [pageState, setPageState] = useState("Main");
  const bazaarCode = new URLSearchParams(useLocation().search).get("bazaar");

  useEffect(() => {
    getBazaarDeets();
  }, []);

  const getBazaarDeets = () => {
    API.getBazaar(bazaarCode)
      .then((res) => {
        console.log("bazaar response", res.data);
        setBazaarObject({
          name: res.data.name,
          system: res.data.system,
          id: res.data.id,
        });
      })
      .catch((err) => console.log(err));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCharacterObject({ ...characterObject, [name]: value });
  };

  const renderPage = () => {
    if (pageState === "Main") {
      return (
        <NewCharacterMain
          setPageState={setPageState}
          handleInputChange={handleInputChange}
          bazaarName={bazaarObject.name}
          characterObject={characterObject}
        />
      );
    } else if (pageState === "Equipment") {
      return (
        <NewCharacterEquipment
          setPageState={setPageState}
          bazaarObject={bazaarObject}
          API={API}
          characterObject={characterObject}
          authenticationState={authenticationState}
        />
      );
    }
  };

  return <Container>{renderPage()}</Container>;
}

export default NewCharacter;
