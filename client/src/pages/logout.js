import React, { useContext, useEffect } from "react";
import UserContext from "../utils/userContext";
import API from "../utils/API";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import { navigate } from "hookrouter";

const Logout = () => {
  const { authenticationState } = useContext(UserContext);

  useEffect(() => {
    authenticationState.userHasAuthenticated({
      isAuthenticated: false,
      user: {},
    });
    API.logoutUser().then((res) => {
      navigate("/");
    });
  }, []);

  return (
    <Container className='text-center'>
      <legend>Logout working</legend>
      <Spinner variant='light' role='status'>
        <span className='sr-only'> </span>
      </Spinner>
    </Container>
  );
};

export default Logout;
