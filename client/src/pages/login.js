import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom';

import { Container, Form, FormGroup, Input, Row, Col } from 'reactstrap';
import { useAlert } from 'react-alert'

import UserContext from "../utils/userContext";
import API from "../utils/API";


const Login = () => {

    const { authenticationState } = useContext(UserContext);
    const [formObject, setFormObject] = useState({});
    const history = useHistory();
    const alert = useAlert()


    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
    };

    function handleFormSubmit(event) {
        event.preventDefault();
        if (formObject.userName && formObject.password) {
            const userLogin = {
                userName: formObject.userName.trim(),
                password: formObject.password
            }
            API.loginUser(userLogin)
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data)
                    //set authentication on successful login, and set user info on the global state object
                    authenticationState.userHasAuthenticated(true, { userName : res.data.userName, characterName : res.data.characterName, characterImage: res.data.characterImage, type : res.data.type, wallet : res.data.wallet, items : res.data.items, bazaars: res.data.bazaars }); 
                    if (res.data.type === "GM") {
                        history.push("/gmhome");
                    }
                    else {
                        history.push("/playerhome");
                    }
                }
            })
            .catch(err => {
                alert.show("No user found with those credentials")
            });
        }
        //alert form fields are not completed
        else {
            //@@TODO display alert about username/password missing
            alert.show('Please enter a username and password')
        }
    };


    return(
        <Container>
            <Form onSubmit={handleFormSubmit} className="mt-4">
                <FormGroup row>
                    <Input
                        name="userName"
                        id="userName"
                        placeholder="User Name"
                        onChange={handleInputChange} />
                </FormGroup>
                <FormGroup row>
                    <Input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        onChange={handleInputChange} />
                </FormGroup>
                <Row>
                    <Col className="text-center mt-3">
                <button>Submit</button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}


export default Login;