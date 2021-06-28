import React, { Component } from "react";
import Container from "react-bootstrap/Container";

const CharacterDetails = (props) => {
  return <Container>props.character.characterName</Container>;
};

export default CharacterDetails;
