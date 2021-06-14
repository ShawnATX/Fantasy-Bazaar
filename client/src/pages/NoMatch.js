import { Button, Container } from "reactstrap";
import React from "react";
import { Link } from "react-router-dom";

const NoMatch = () => {
  return (
    <Container>
      <div>Sorry, page not found! :(</div>
      <Link to="/">
        <Button>Head back Home</Button>
      </Link>
    </Container>
  );
};

export default NoMatch;
