import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../utils/userContext";
import { Container, Row, Col } from "reactstrap";
import API from "../utils/API";

const BazaarHome = (props) => {
  const { authenticationState } = useContext(UserContext);

  const history = useHistory();

  return (
    <Container>
      <Row>Bazaar Home</Row>
    </Container>
  );
};

export default BazaarHome;
