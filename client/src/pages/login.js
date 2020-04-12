import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom';

import { Container, Form, FormGroup, Input, Label, Button } from 'reactstrap';

import UserContext from "../utils/userContext";
import API from "../utils/api";


const Login = () => {

    const { authenticationState } = useContext(UserContext);
    const [formObject, setFormObject] = useState({});
    const history = useHistory();

    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
    };

    function handleFormSubmit(event) {
        event.preventDefault();
        if (formObject.characterName && formObject.password) {
            const userLogin = {
                username: formObject.characterName.trim(),
                password: formObject.password
            }
            API.loginUser(userLogin)
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    console.log(res.body);
                }
            })
            .catch(err => console.log(err));
        }
        else {
            //@@TODO display alert about username/password missing
        }
    };


    return(
        <Container>
            <Form onSubmit={handleFormSubmit}>
                <FormGroup row>
                    <Input
                        name="characterName"
                        id="characterName"
                        placeholder="Character Name"
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

                <Button>Submit</Button>
            </Form>
        </Container>
    );
}


export default Login;