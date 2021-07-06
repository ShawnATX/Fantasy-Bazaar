import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";

function CharacterFooter(props) {
  let links = [];
  const renderLinks = () => {
    let text = "";
    for (const link in props) {
      if (link === "userHome") {
        text = "User Home";
      } else if (link === "characterHome") {
        text = "Character Home";
      }
      links.push(
        <Button
          key={link}
          onClick={props[link]}
          variant='secondary'
          className='mx-2'
        >
          {text}
        </Button>
      );
    }
    return links;
  };

  return (
    <Navbar
      fixed='bottom'
      className='pt-1 py-2 mx-1 text-center sticky-bottom navbar-footer d-flex justify-content-center'
    >
      {renderLinks()}
    </Navbar>
  );
}

export default CharacterFooter;
