import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../utils/userContext";
import { Container, Col, Row } from "reactstrap";
import { useAlert } from "react-alert";
import API from "../utils/API";
import Inventory from "../components/inventory";
import StoreFront from "../components/storeFront";
import PlayerMain from "../components/playerMain";
import CharacterHome from "./characterHome";

function UserHome() {
  return <Container>Player Home</Container>;
}

export default UserHome;
