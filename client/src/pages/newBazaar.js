import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import UserContext from "../utils/userContext";
import { Container, Row, Col } from "reactstrap";
import API from "../utils/API";
import NewBazaarMain from "../components/newBazaarMain";
import NewBazaarSettings from "../components/newBazaarSettings";

const NewBazaar = (props) => {
  const { authenticationState } = useContext(UserContext);
  const [formObject, setFormObject] = useState({
    requireCustomItemApproval: false,
    requireWalletAdditionApproval: false,
    requireWalletChangeApproval: false,
    requireSaleApproval: false,
    requirePurchaseApproval: false,
    limitedInventory: false,
  });
  const history = useHistory();
  const alert = useAlert();
  const [pageState, setPageState] = useState("Main");

  function goHome(event) {
    event.preventDefault();
    history.push("/");
  }

  function saveNewBazaar(bazaarData) {
    console.log(bazaarData);
    console.log(authenticationState);
    // API.saveBazaar(bazaarData);
  }

  function renderPage() {
    if (pageState === "Main") {
      return (
        <NewBazaarMain
          setPageState={setPageState}
          formObject={formObject}
          setFormObject={setFormObject}
        />
      );
    } else if (pageState === "Settings") {
      return (
        <NewBazaarSettings
          setPageState={setPageState}
          formObject={formObject}
          setFormObject={setFormObject}
          saveNewBazaar={saveNewBazaar}
        />
      );
    }
  }

  return (
    <Container>
      <Row className="my-2">
        <Col className="text-center">
          Make A New Bazaar!
          {renderPage()}
        </Col>
      </Row>
    </Container>
  );
};

export default NewBazaar;
