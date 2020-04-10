//New player form with handles basic player creation. front-end validation ensures data is present before being sent to the server on required fields. useState React hook is being used to hold and handle form data as it is entered.


import React, { useState, useEffect } from 'react';
import { Container, FormGroup, Form, Label, Input, FormText, Button, Col, Row } from 'reactstrap';
import API from "../utils/api";


function NewPlayer() {
    const [formObject, setFormObject] = useState({})

    useEffect(() => {
        getUsers()
    }, [])

    function getUsers() {
        API.getUsers().then((res) => console.log(res));
    }

    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
    };

    function handleFormSubmit(event) {
        event.preventDefault();
        console.log(formObject);
        if (formObject.characterName && formObject.playerName && formObject.password) {
            API.saveUser( {
                characterName : formObject.characterName,
                userName: formObject.playerName,
                type: "Player",
                wallet: formObject.wallet,
                password: formObject.password
            })
            .then(res => console.log(res))
            .catch(err => console.log(err));
        }
    };

    return (
        <Container fluid={true}>

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
