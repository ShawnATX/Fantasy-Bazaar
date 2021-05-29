import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

const Splash = (props) => {
  return (
    <Container fluid={true} className="text-center">
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
      {/* Old Layout */}
      {/* <Row className="mt-5 px-5">
        <Col>
          <Link to="/newplayer" alt="Join a game" className="text-center">
            <button className="splashBtn">Join a Bazaar</button>
          </Link>
        </Col>
      </Row>
      <Row className="mt-5 px-5">
        <Col>
          <Link to="/gmhome">
            <button className="splashBtn">Curate a new Bazaar</button>
          </Link>
        </Col>
      </Row>
      <Row className="pb-5 mt-5">
        <Col>
          <Link to="/login">
            <button>Login Here</button>
          </Link>
        </Col>
      </Row> */}
    </Container>
  );
};

export default Splash;
