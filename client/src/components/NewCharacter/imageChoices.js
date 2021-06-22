import React, { useState } from "react";
import { FormGroup, Label, Input, Collapse } from "reactstrap";
import { imgSet } from "../../images/character/charImgs";

const ImageChoices = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <legend onClick={() => setIsOpen(!isOpen)} caret>
        Or choose a cool default image
      </legend>
      <Collapse isOpen={isOpen}>
        <FormGroup tag="fieldset" onChange={props.handleInputChange}>
          <div className="row">
            {imgSet.map((image) => {
              return (
                <div
                  className="col-sm-8-offset-2 col-md-6 col-lg-3 p-4"
                  key={image}
                >
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
      </Collapse>
    </div>
  );
};

export default ImageChoices;
