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
        if (formObject.userName && formObject.password) {
            const userLogin = {
                userName: formObject.userName.trim(),
                password: formObject.password
            }
            API.loginUser(userLogin)
            .then((res) => {
                if (res.status === 200) {
                    //set authentication on successful login, and set user info on the global state object
                    authenticationState.userHasAuthenticated(true, { userName : res.data.userName, characterName : res.data.characterName, type : res.data.type, wallet : res.data.wallet, items : res.data.items, bazaars: res.data.bazaars }); 
                    history.push("/playerhome");
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
            <Form onSubmit={handleFormSubmit} className="mt-4">
                <FormGroup row>
                    <Input
                        name="userName"
                        id="userName"
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