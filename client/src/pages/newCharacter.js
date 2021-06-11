import React, { useState, useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useAlert } from "react-alert";
import UserContext from "../utils/userContext";
import { Container, FormGroup, Form, Label, Input, Button } from "reactstrap";
import API from "../utils/API";
import NewCharacterMain from "../components/newCharacterMain";
import NewCharacterEquipment from "../components/newCharacterEquipment";

function NewCharacter(props) {
  const { authenticationState } = useContext(UserContext);
  const [formObject, setFormObject] = useState({});
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
        setBazaarObject({
          name: res.data.name,
          system: res.data.system,
        });
      })
      .catch((err) => console.log(err));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
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
          formObject={formObject}
        />
      );
    } else if (pageState === "Equipment") {
      return (
        <NewCharacterEquipment
          setPageState={setPageState}
          bazaarName={bazaarObject.name}
        />
      );
    }
  };

  return <Container>{renderPage()}</Container>;
}

export default NewCharacter;
