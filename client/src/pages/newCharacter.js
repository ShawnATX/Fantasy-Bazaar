import React, { useState, useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useAlert } from "react-alert";
import UserContext from "../utils/userContext";
import { Container, FormGroup, Form, Label, Input, Button } from "reactstrap";
import API from "../utils/API";
import NewCharacterMain from "../components/NewCharacter/newCharacterMain";
import NewCharacterEquipment from "../components/NewCharacter/newCharacterEquipment";

function NewCharacter(props) {
  const { authenticationState } = useContext(UserContext);
  const [characterObject, setCharacterObject] = useState({});
  const [bazaarObject, setBazaarObject] = useState({
    name: "",
    system: "",
  });
  const history = useHistory();
  const [pageState, setPageState] = useState("Main");
  const bazaarCode = new URLSearchParams(useLocation().search).get("bazaar");

  useEffect(() => {
    getBazaarDeets();
  }, []);

  const getBazaarDeets = () => {
    API.getBazaar(bazaarCode)
      .then((res) => {
        setBazaarObject({
          name: res.data.name,
          system: res.data.system,
        });
      })
      .catch((err) => console.log(err));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCharacterObject({ ...characterObject, [name]: value });
  };

  function handleFormSubmit() {
    return;
  }

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
          bazaarName={bazaarObject.name}
          bazaarSystem={bazaarObject.system}
          API={API}
          characterObject={characterObject}
        />
      );
    }
  };

  return <Container>{renderPage()}</Container>;
}

export default NewCharacter;
