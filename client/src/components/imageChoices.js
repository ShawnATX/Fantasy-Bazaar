import React  from 'react'
import { FormGroup, Label, Input, Col } from 'reactstrap';
import { imgSet } from "../images/character/charImgs";



const ImageChoices = (props) => {

    return (
        <FormGroup tag="fieldset" onChange={props.handleInputChange}>
            <legend>Select a character image</legend>
            <div className="row">
                {imgSet.map((image) => {
                    return (
                        <div className="col-sm-3 p-4" key={image}>
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio" name="characterImage" value={image} />
                                    <img src={image} className="img-fluid" alt={image} />
                                </Label>
                            </FormGroup>
                        </div>
                    );
                })}
            </div>
        </FormGroup>
    );
}

export default ImageChoices;