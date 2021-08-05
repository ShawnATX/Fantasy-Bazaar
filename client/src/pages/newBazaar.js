import React, { useState, useContext, useEffect } from "react";
import UserContext from "../utils/userContext";
import { navigate } from "hookrouter";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import API from "../utils/API";
import NewBazaarMain from "../components/NewBazaar/newBazaarMain";
import NewBazaarSettings from "../components/NewBazaar/newBazaarSettings";
import NewBazaarStockPicker from "../components/NewBazaar/newBazaarStockPicker";

const NewBazaar = () => {
  const { authenticationState } = useContext(UserContext);
  const [formObject, setFormObject] = useState({
    requireNewCharacterApproval: true,
    requireCustomItemApproval: false,
    requireWalletChangeApproval: false,
    requireSaleApproval: false,
    requirePurchaseApproval: false,
    limitedInventoryItems: false,
    limitedInventoryQuantity: false,
    stockSoldItems: false,
  });
  const [pageState, setPageState] = useState(1);

  useEffect(() => {
    if (!authenticationState.isAuthenticated) {
      getSessionUser();
    }
  }, []);

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
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function saveNewBazaar(bazaarData) {
    let newBazaar = {
      ...bazaarData,
      creator: authenticationState.user.id,
    };
    API.saveBazaar(newBazaar)
      .then((res) => {
        let bazaars = authenticationState.user.bazaars;
        bazaars.push(res.data._id);
        authenticationState.userHasAuthenticated(true, {
          email: authenticationState.user.email,
          id: authenticationState.user.id,
          characters: authenticationState.user.characters,
          bazaars: bazaars,
        });
        navigate("/userhome");
      })
      .catch((err) => {});
  }

  function renderPage() {
    if (pageState === 1) {
      return (
        <NewBazaarMain
          setPageState={setPageState}
          formObject={formObject}
          setFormObject={setFormObject}
        />
      );
    } else if (pageState === 2) {
      return (
        <NewBazaarSettings
          setPageState={setPageState}
          formObject={formObject}
          setFormObject={setFormObject}
          saveNewBazaar={saveNewBazaar}
        />
      );
    } else if (pageState === 3) {
      return (
        <NewBazaarStockPicker
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
      <Row className='my-2'>
        <Col className='text-center'>
          <h2 className='display-3'>Make A New Bazaar!</h2>

          {renderPage()}
        </Col>
      </Row>
    </Container>
  );
};

export default NewBazaar;
