import React from "react";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import { imgSet } from "../../images/character/charImgs";

const ImageChoices = (props) => {
  return (
    <Accordion>
      <Card className="m-3">
        <Accordion.Toggle as={Card.Header} eventKey="0">
          Or choose a cool default image
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <Form.Group tag="fieldset" onChange={props.handleInputChange}>
              <Row>
                {imgSet.map((image) => {
                  return (
                    <div
                      className="col-sm-8-offset-2 col-md-6 col-lg-3 p-4"
                      key={image}
                    >
                      <Form.Group check>
                        <Form.Label>
                          <Form.Control
                            type="radio"
                            name="characterImage"
                            value={image}
                          />
                          <img src={image} className="img-fluid" alt={image} />
                        </Form.Label>
                      </Form.Group>
                    </div>
                  );
                })}
              </Row>
            </Form.Group>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default ImageChoices;
