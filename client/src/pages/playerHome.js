import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import UserContext from "../utils/userContext";
import { Container, FormGroup, Form, Label, Input, Button, Col, Row } from 'reactstrap';
import API from "../utils/api";
import Inventory from '../components/inventory';
import StoreFront from '../components/storeFront';
import PlayerMain from '../components/playerMain';

const PlayerHome = () => {
    const { authenticationState } = useContext(UserContext);
    const [userObject, setUserObject] = useState({});
    const [pageState, setPageState] = useState("Home");
    const history = useHistory();
    
    useEffect(() => {
        if (!authenticationState.isAuthenticated) { 
            history.push("/newplayer");
        };
        setUserObject(authenticationState.user);
    }, []);

    function renderPage () {
        if (pageState === "Home") {
          return <PlayerMain setPageState={setPageState}/>;
        } else if (pageState === "Inventory") {
          return <Inventory setPageState={setPageState}/>;
        } else if (pageState === "Store") {
          return <StoreFront setPageState={setPageState} purchase={purchaseItem}/>;
        } else {
          return <PlayerMain />;
        }
      };

    function purchaseItem(item) {
        console.log(item);
        if (item.value > userObject.wallet) {
            return ("You need more money");
        } 
        else {
            //    updateUser: function (id, userData) {
            API.userPurchase(({wallet: (userObject.wallet - item.value), items: [item._id]}))
        }

    };

    return (
        <Container>
            <Row className="border p-5  mb-3 text-center">
                <Col className="border py-3 mx-2">
                    {userObject.characterName}
                </Col>
                <Col>
                </Col>
                <Col className="border py-3 mx-2">
                    {userObject.wallet}
                </Col>
            </Row>
            {renderPage()}
        </Container>
    );
}

export default PlayerHome;
