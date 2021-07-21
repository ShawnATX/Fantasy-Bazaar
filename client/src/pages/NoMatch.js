import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import React from "react";
import { A } from "hookrouter";

const NoMatch = () => {
  return (
    <Container fluid={true} className='text-center'>
      <div>Sorry, page not found! :(</div>
      <A href='/'>
        <Button className='btn-small ml-3' variant='secondary'>
          Head back Home
        </Button>
      </A>
    </Container>
  );
};

export default NoMatch;
