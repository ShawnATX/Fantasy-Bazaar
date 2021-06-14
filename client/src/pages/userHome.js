import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../utils/userContext";
import { Container, Col, Row, Button } from "reactstrap";
import { useAlert } from "react-alert";
import API from "../utils/API";
import Inventory from "../components/inventory";
import StoreFront from "../components/storeFront";
import PlayerMain from "../components/playerMain";
import CharacterHome from "./characterHome";

function UserHome() {
  const { authenticationState } = useContext(UserContext);
  const [userObject, setUserObject] = useState({});
  const [pageState, setPageState] = useState("Home");
  const history = useHistory();

  useEffect(() => {
    if (!authenticationState.isAuthenticated) {
      history.push("/login");
    }
    setUserObject(authenticationState.user);
  }, [authenticationState]);

  const handleLogout = () => {
    API.logoutUser().then((res) => {
      if (res.status === 200) {
        authenticationState.userHasAuthenticated({
          isAuthenticated: false,
          user: {},
        });
        history.push("/");
      } else {
        alert.show("Weird logout error happening...");
      }
    });
  };

  return (
    <Container>
      <Row>User Home</Row>

      <Row className="sticky-footer mt-3">
        <Col className="text-center">
          <button
            className="text-center btn-small"
            onClick={() => handleLogout()}
          >
            Logout
          </button>
        </Col>
      </Row>
    </Container>
  );
}

export default UserHome;
