//New player form which handles basic player creation. front-end validation ensures data is present before being sent to the server on required fields. useState React hook is being used to hold and handle form data as it is entered.
import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { useAlert } from 'react-alert'
import UserContext from "../utils/userContext";
import { Container, FormGroup, Form, Label, Input, Button } from 'reactstrap';
import API from "../utils/API";
import ImageChoices from "../components/imageChoices";

function NewPlayer() {
    const { authenticationState } = useContext(UserContext);
    const [formObject, setFormObject] = useState({});
    const history = useHistory();
    const alert = useAlert()

    function handleInputChange(event) {
        const { name, value } = event.target;
        console.log(name, value)
        setFormObject({ ...formObject, [name]: value })
    };

    function handleFormSubmit(event) {
        event.preventDefault();
        //check on form input, @@TODO add further validation
        if (formObject.characterName && formObject.playerName && formObject.password && formObject.bazaarId && formObject.characterImage) {
            //check if bazaar code exists, if so return Id to the page
            API.getBazaar(formObject.bazaarId)
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
                        characterImage: formObject.characterImage,
                        items: [],
                        bazaars: [bazaarId]
                    }
                    API.saveUser(newUser)
                        .then((res) => {
                            console.log(res);
                            if (res.status === 200) {
                                API.loginUser({
                                    userName: newUser.userName,
                                    password: newUser.password
                                }).then((res) => {
                                    //set authentication on successful login, and set user info on the global state object
                                    console.log(res);
                                    authenticationState.userHasAuthenticated(true, { userName: res.data.userName, characterName: res.data.characterName, characterImage: res.data.characterImage, type: res.data.type, wallet: res.data.wallet, items: res.data.items, bazaars: res.data.bazaars });
                                })
                                    .then(
                                        history.push("/playerhome")
                                    )
                                    .catch(err => res.json(err));
                            }
                            else {
                                console.log(res);
                                history.push("/login")
                            }
                        })
                        //save user error @@TODO handle creation error
                        .catch(err => {
                            alert.show("Unable to create a user with the provided username, please try a different one.")
                            console.log(err)
                        });
                })
                //check if bazaar exists error @@TODO handle check error
                .catch(err => {
                    alert.show("Bazaar with the provided Join Code not found.")
                    console.log(err)
                }
                );
        }
    };

    function goHome(event) {
        event.preventDefault();
        history.push('/');
    }

    return (
        <Container >
            <Form onSubmit={handleFormSubmit} className="text-center">
                <FormGroup row className="mt-4">
                    <Label className="text-center" for="characterName">Character Name</Label>
                    <Input
                        name="characterName"
                        id="characterName"
                        placeholder="Lester Ressoration"
                        onChange={handleInputChange} />
                </FormGroup>
                <FormGroup row>
                    <Label for="characterName">Fantasy Bazaar Username</Label>
                    <Input
                        name="playerName"
                        id="playerName"
                        placeholder="Username"
                        onChange={handleInputChange} />
                </FormGroup>
                <FormGroup row>
                    <Label for="password">Password</Label>
                    <Input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        onChange={handleInputChange} />
                </FormGroup>

                <ImageChoices handleInputChange={handleInputChange} />

                <FormGroup>
                    <Label for="startingGold">Starting Wealth</Label>
                    <Input
                        name="wallet"
                        id="startingGold"
                        placeholder="Enter your starting gold"
                        onChange={handleInputChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="bazaarId">Bazaar Code</Label>
                    <Input
                        name="bazaarId"
                        id="bazaarId"
                        placeholder="Bazaar ID Here"
                        onChange={handleInputChange} />
                </FormGroup>
                <button className="btn-small mr-3">Submit</button>
                <button className="btn-small ml-3" onClick={goHome}>Back Home</button>
            </Form>
        </Container>
    );
};

export default NewPlayer;
