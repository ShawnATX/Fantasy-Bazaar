import React from "react";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const About = () => {
  return (
    <Container>
      <h1 className="display-2 mt-3 text-center">Fantasy Bazaar</h1>
      <Row className="align-items-center">
        <Col className="align-items-center">
          <Card className="my-5">
            <Card.Body>
              <Card.Text style={{ fontSize: "1.2rem" }}>
                Fantasy Bazaar is a table-top game companion app built to help
                players and Game Masters manage inventory and wealth details
                outside of oh-so-precious game time. Game Masters can create a
                'bazaar' to be the interface where their players can buy and
                sell items. Game Masters can also set their bazaar to require
                approval for certain character actions, as well as setting
                available inventory and stock limits.
              </Card.Text>
              <Card.Text style={{ fontSize: "1.2rem" }}>
                Fantasy Bazaar is currently configured for use with Dungeons and
                Dragons 5th Edition and Pathfinder 1st Edition
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 4, offset: 4 }}>
          <Link to="/" alt="Back Home" className="text-center">
            <Button className="btn-small" variant="secondary">
              Back Home
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
