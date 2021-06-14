import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../utils/userContext";
import { Container, Row, Col } from "reactstrap";
import API from "../utils/API";

const BazaarHome = (props) => {
  const { authenticationState } = useContext(UserContext);

  const history = useHistory();

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
      <Row>Bazaar Home</Row>
      <button className="text-center btn-small" onClick={() => handleLogout()}>
        Logout
      </button>
    </Container>
  );
};

export default BazaarHome;
