//New player form with handles basic player creation. front-end validation ensures data is present before being sent to the server on required fields. useState React hook is being used to hold and handle form data as it is entered.

import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import UserContext from "../utils/userContext";
import { Container, FormGroup, Form, Label, Input, Button, Col, Row } from 'reactstrap';
import API from "../utils/api";



function NewPlayer() {
    const { authenticationState } = useContext(UserContext);
    const [formObject, setFormObject] = useState({});
    const history = useHistory();


    function handleInputChange(event) {
        console.log(authenticationState);
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
    };

    function handleFormSubmit(event) {
        event.preventDefault();
        if (formObject.characterName && formObject.playerName && formObject.password) {
            const newUser = {
                userName: formObject.playerName,
                characterName : formObject.characterName,
                type: "Player",
                wallet: formObject.wallet,
                password: formObject.password,
                items: []
            }
            API.saveUser(newUser)
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    console.log(res.body);
                    //set authentication on successful login, and set user info on the global state object
                    authenticationState.userHasAuthenticated(true, { userName : newUser.userName, characterName : newUser.characterName, type : newUser.type, wallet : newUser.wallet, items : newUser.items }); 
                    history.push("/playerhome");
                }
            })
            .catch(err => console.log(err));
        }
    };

    return (
        <Container >
            <Form onSubmit={handleFormSubmit} className="text-center">
                <FormGroup row>
                    <Input
                        name="characterName"
                        id="characterName"
                        placeholder="Character Name"
                        onChange={handleInputChange} />
                </FormGroup>
                <FormGroup row>
                    <Input
                        name="playerName"
                        id="playerName"
                        placeholder="Player Name"
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
                <FormGroup>
                    <Label for="characterLogo">Select a character image</Label>
                    <Input type="select" name="select" id="characterLogo" onChange={handleInputChange}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="startingGold">Starting Wealth</Label>
                    <Input
                        name="wallet"
                        id="startingGold"
                        placeholder="Enter your starting gold"
                        onChange={handleInputChange} />
                </FormGroup>
                <FormGroup>
                    <Input
                        name="bazaarId"
                        id="bazaarId"
                        placeholder="Bazaar ID Here"
                        onChange={handleInputChange} />
                </FormGroup>
                <Button>Submit</Button>

            </Form>
        </Container>
    );
};

export default NewPlayer;
