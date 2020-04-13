import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import UserContext from "../utils/userContext";
import { Container, FormGroup, Form, Label, Input, Button, Col, Row } from 'reactstrap';
import API from "../utils/api";

const PlayerHome = (props) => {
    const { authenticationState } = useContext(UserContext);
    const [userObject, setUserObject] = useState({});
    const history = useHistory();
    
    useEffect(() => {
        console.log(authenticationState);
        if (!authenticationState.isAuthenticated) { 
            history.push("/newplayer");
        };
        setUserObject(authenticationState.user);
        console.log(userObject);
    }, []);

    return (
        <Container>
            <Row className="border">
                <Col>
                    {userObject.characterName}
                </Col>
                <Col>
                    {userObject.wallet}
                </Col>
            </Row>
            <Row>
                <p>
                    {userObject.userName}
                </p>
            </Row>
            <Row>
                <p>
                    {userObject.wallet}
                </p>
            </Row>
        </Container>
    );
}

export default PlayerHome;
