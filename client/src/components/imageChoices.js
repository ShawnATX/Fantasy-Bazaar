import React, { useState, useEffect } from 'react'
import { Container, FormGroup, Form, Label, Input, Button } from 'reactstrap';


const ImageChoices = (props) => {
    const [imageState, setImageState] = useState({});

    return (
        <Input type="select" name="select" id="characterLogo" onChange={props.handleInputChange}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
        </Input>
    );


}

export default ImageChoices;