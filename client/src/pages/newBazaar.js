import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
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
  const [pageState, setPageState] = useState("Main");

  function goHome(event) {
    event.preventDefault();
    history.push("/");
  }

  function saveNewBazaar(bazaarData) {
    let newBazaar = {
      ...bazaarData,
      creator: authenticationState.user.id,
    };
    API.saveBazaar(newBazaar)
      .then((res) => {
        console.log(res);
        var joinCode = res.data.joinCode;
        history.push("/userhome/bazaar/" + joinCode);
      })
      .catch((err) => {
        console.log(err);
      });
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
