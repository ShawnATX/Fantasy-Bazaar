import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../utils/userContext";
import { Container, Row, Col } from "reactstrap";
import API from "../utils/API";

const BazaarHome = (props) => {
  const { authenticationState } = useContext(UserContext);
  const { setPageState } = props;
  const [bazaarObject, setBazaarObject] = useState(props.bazaar);

  const history = useHistory();

  useEffect(() => {
    console.log(bazaarObject);
  }, []);

  const userHome = () => {
    history.push("/userhome");
    setPageState("user");
  };

  return (
    <Container>
      <Row>Bazaar Home</Row>
      <button className="text-center btn-small" onClick={() => userHome()}>
        Back To User Home
      </button>
    </Container>
  );
};

export default BazaarHome;
