import { Button } from "reactstrap";
import React from "react";
import { Link } from "react-router-dom";

const NoMatch = () => {
  return (
    <div>
      <div>Sorry, page not found! :(</div>
      <Link to="/">
        <Button>Head back Home</Button>
      </Link>
    </div>
  );
};

export default NoMatch;
