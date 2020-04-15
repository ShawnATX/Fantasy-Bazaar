//New player form with handles basic player creation. front-end validation ensures data is present before being sent to the server on required fields. useState React hook is being used to hold and handle form data as it is entered.

import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import UserContext from "../utils/userContext";
import { Container, FormGroup, Form, Label, Input, Button } from 'reactstrap';
import api from "../utils/api";



function NewPlayer() {
    const { authenticationState } = useContext(UserContext);
    const [formObject, setFormObject] = useState({});
    const history = useHistory();

    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
    };

    function handleFormSubmit(event) {
        event.preventDefault();
        //check on form input, @@TODO add further validation
        if (formObject.characterName && formObject.playerName && formObject.password && formObject.bazaarId) {
            //check if bazaar code exists, if so return Id to the page
            api.getBazaar(formObject.bazaarId)
            //bazaar exists, attemtping to create user and tie to bazaar
            .then((res) => {
                console.log(res);
                const bazaarId = res.data._id;
                const newUser = {
                    userName: formObject.playerName,
                    characterName: formObject.characterName,
                    type: "Player",
                    wallet: formObject.wallet,
                    password: formObject.password,
                    items: [],
                    bazaars: [ bazaarId]
                }
                api.saveUser(newUser)
                    .then((res) => {
                        console.log(res);
                        if (res.status === 200) {
                            api.loginUser({
                                userName: newUser.userName,
                                password: newUser.password
                            }).then((res) => {
                                //set authentication on successful login, and set user info on the global state object
                                console.log(res);
                                authenticationState.userHasAuthenticated(true, { userName : res.data.userName, characterName : res.data.characterName, type : res.data.type, wallet : res.data.wallet, items : res.data.items, bazaars: res.data.bazaars });
                            })
                            .then(                                
                                history.push("/playerhome")
                            )
                            .catch(err => res.json(err));
                        }
                        else{
                            console.log(res);
                            history.push("/login")
                        }
                    })
                    //save user error @@TODO handle creation error
                    .catch(err => console.log(err));
            })
            //check if bazaar exists error @@TODO handle check error
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
