import React, { useContext, useEffect } from "react";
import API from "../utils/API";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Card from "react-bootstrap/Card";
import UserContext from "../utils/userContext";
import { A, navigate } from "hookrouter";

const Landing = () => {
  const { authenticationState } = useContext(UserContext);

  useEffect(() => {
    try {
      getSessionUser();
    } catch (error) {
      //no session exixts, do nothing
    }
  });

  const getSessionUser = () => {
    API.getSessionUser()
      .then((res) => {
        if (res.status === 200) {
          authenticationState.userHasAuthenticated(true, {
            email: res.data.email,
            bazaars: res.data.bazaars,
            characters: res.data.characters,
            id: res.data.id,
          });
          navigate("/userhome");
        } else {
          return;
        }
      })
      .catch((err) => {});
  };

  return (
    <Container fluid={true} className='text-center'>
      <h1 className='display-2 mt-3'>Fantasy Bazaar</h1>
      <Row className='mt-4 px-5'>
        <Col>
          <ButtonGroup aria-label='Landing Page Actions'>
            <A href='/newusertype' alt='Get Started' className='text-center'>
              <Button className='btn-small ml-3' variant='secondary'>
                Get Started
              </Button>
            </A>
            <A href='/login'>
              <Button className='btn-small ml-3' variant='secondary'>
                Login Here
              </Button>
            </A>
          </ButtonGroup>
        </Col>
      </Row>
      <Row className='align-items-end mt-4'>
        <Col className='align-self-end'>
          <A href='/about' alt='About Fantasy Bazaar'>
            <Button variant='secondary'>About</Button>
          </A>
        </Col>
      </Row>
      <Row className='mt-4'>
        <Col xs={6} md={{span: 4, offset: 2}} className="mb-2">
          <A href='/pf1example' alt='Example Pathfinder Bazaar'>
            <Card className='text-white text-center'>
              <Card.Img
                src='https://lorempixel.com/g/100/100/abstract'
                alt='Card image'
              />
              <Card.ImgOverlay>
                <Card.Title>
                  Sample Pathfinder Bazaar
                </Card.Title>
                <Card.Text></Card.Text>
              </Card.ImgOverlay>
            </Card>
          </A>
        </Col>
        <Col xs={6}  md={{span: 4, offset: 0}} >
          <A href='/dndexample' alt='Example Dungeons and Dragons Bazaar'>
            <Card className='text-white text-center'>
              <Card.Img
                src='https://lorempixel.com/g/100/100/abstract'
                alt='Card image'
              />
              <Card.ImgOverlay>
                <Card.Title>Sample Dungeons and Dragons Bazaar</Card.Title>
                <Card.Text></Card.Text>
              </Card.ImgOverlay>
            </Card>
          </A>
        </Col>
      </Row>
    </Container>
  );
};

export default Landing;
