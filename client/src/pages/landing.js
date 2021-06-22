import React, { useContext, useEffect } from "react";
import API from "../utils/API";
import { Container, Row, Col } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../utils/userContext";

const Landing = () => {
  const { authenticationState } = useContext(UserContext);

  const history = useHistory();
  useEffect(() => {
    if (authenticationState.isAuthenticated) {
      history.push("/userhome");
    } else {
      try {
        getSessionUser();
      } catch (error) {
        //no session exixts, do nothing
      }
    }
  });

  const getSessionUser = () => {
    API.getSessionUser()
      .then((res) => {
        if (res.status === 200) {
          authenticationState
            .userHasAuthenticated(true, {
              email: res.data.email,
              bazaars: res.data.bazaars,
              characters: res.data.characters,
              id: res.data.id,
            })
            .then(() => {
              history.push("/userhome");
            });
        } else {
          return;
        }
      })
      .catch((err) => {});
  };

  return (
    <Container fluid={true} className="text-center">
      <h1 className="display-2">Fantasy Bazaar</h1>
      <Row className="mt-5 px-5">
        <Col>
          <Link to="/newusertype" alt="Get Started" className="text-center">
            <button className="splashBtn">Get Started</button>
          </Link>
        </Col>
      </Row>
      <Row className="mt-5 px-5">
        <Col>
          <Link to="/login">
            <button>Login Here</button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Landing;
