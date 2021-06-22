import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../utils/userContext";
import API from "../utils/API";
import { Container, Spinner } from "reactstrap";

const Logout = () => {
  const { authenticationState } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    API.logoutUser().then((res) => {
      console.log("logged out");
      authenticationState.userHasAuthenticated({
        isAuthenticated: false,
        user: {},
      });
      history.push("/");
    });
  });

  return (
    <Container className="text-center">
      <legend>Logout working</legend>
      <Spinner color="light" role="status">
        <span className="sr-only"> </span>
      </Spinner>
    </Container>
  );
};

export default Logout;
