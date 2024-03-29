import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { A } from "hookrouter";

const About = () => {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  });
  return (
    <Container>
      <h1 className='display-2 mt-3 text-center'>Fantasy Bazaar</h1>
      <Row className='align-items-center'>
        <Col className='align-items-center'>
          <Card className='my-5'>
            <Card.Body className='bg-black'>
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
        <Col
          xs={{ span: 4, offset: 4 }}
          className='d-flex justify-content-center'
        >
          <A href='/' alt='Back Home'>
            <Button className='btn-small' variant='secondary'>
              Back Home
            </Button>
          </A>
          <A href='/privacypolicy' alt='Privacy Policy'>
            <Button className='btn-small' variant='secondary'>
              Privacy Policy
            </Button>
          </A>
        </Col>
      </Row>
      <Row>
        <ins
          className='adsbygoogle'
          style={{ display: "block" }}
          data-ad-client='ca-pub-4956647583327789'
          data-ad-slot='9176994471'
          data-ad-format='auto'
          data-full-width-responsive='true'
        />
      </Row>
    </Container>
  );
};

export default About;
