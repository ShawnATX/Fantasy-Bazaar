import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Container, FormGroup, Form, Label, Input, FormText, Button, Col, Row } from 'reactstrap';


const newPlayer = (props) => {
    const [formObject, setFormObject] = useState({});



    return(
        <div>
            <Form>
                <FormGroup row>
                    <Input name="characterName" id="characterName" placeholder="Character Name" />
                </FormGroup>
                <FormGroup row>
                    <Input name="playerName" id="playerName" placeholder="Player Name" />
                </FormGroup>
                

            </Form>
        </div>
    );    
};

export default newPlayer;
