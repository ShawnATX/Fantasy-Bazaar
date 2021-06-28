import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../utils/userContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import API from "../utils/API";
import NewBazaarMain from "../components/NewBazaar/newBazaarMain";
import NewBazaarSettings from "../components/NewBazaar/newBazaarSettings";

const NewBazaar = () => {
  const { authenticationState } = useContext(UserContext);
  const [formObject, setFormObject] = useState({
    requireNewCharacterApproval: true,
    requireCustomItemApproval: false,
    requireWalletAdditionApproval: false,
    requireWalletChangeApproval: false,
    requireSaleApproval: false,
    requirePurchaseApproval: false,
    limitedInventory: false,
  });
  const [pageState, setPageState] = useState("Main");
  const history = useHistory();

  useEffect(() => {
    if (!authenticationState.isAuthenticated) {
      getSessionUser();
    }
  }, []);

  function goHome(event) {
    event.preventDefault();
    history.push("/");
  }
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
          history.push("/login");
        }
      })
      .catch((err) => {});
  };

  function saveNewBazaar(bazaarData) {
    let newBazaar = {
      ...bazaarData,
      creator: authenticationState.user.id,
    };
    API.saveBazaar(newBazaar)
      .then((res) => {
        console.log(res);
        let bazaars = authenticationState.user.bazaars;
        bazaars.push(res.data._id);
        authenticationState.userHasAuthenticated(true, {
          email: authenticationState.user.email,
          id: authenticationState.user.id,
          characters: authenticationState.user.characters,
          bazaars: bazaars,
        });
        var joinCode = res.data.joinCode;
        history.push("/userhome?bazaar=" + joinCode);
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
          <h2 className="display-3">Make A New Bazaar!</h2>

          {renderPage()}
        </Col>
      </Row>
    </Container>
  );
};

export default NewBazaar;
