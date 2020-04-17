import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import UserContext from "../utils/userContext";
import API from "../utils/API";
import { Container, Col, Row } from 'reactstrap';



const GmHome = (props) => {
    const [gmObject, setGmObject] = useState({});
    const { authenticationState } = useContext(UserContext);
    const history = useHistory();
    const alert = useAlert()
    useEffect(() => {
        if (!authenticationState.isAuthenticated) {
            history.push("/login");
        };
        setGmObject(authenticationState.user);
    }, [authenticationState]);

    return (
        <div>
            {gmObject.userName}
            {gmObject.userName}
            {gmObject.userName}
            GM Home
        </div>
    );
}

export default GmHome;