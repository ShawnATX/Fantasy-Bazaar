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
        <Accordion.Item eventKey="0">
          <Accordion.Header as={Card.Header}>
            Or choose a cool default image
          </Accordion.Header>
          <Accordion.Body as={Card.Body}>
            <Form.Group tag="fieldset" onChange={props.handleInputChange}>
              <Row>
                {imgSet.map((image) => {
                  return (
                    <div
                      className="col-sm-8-offset-2 col-md-6 col-lg-3 p-4"
                      key={image}
                    >
                      <Form.Group>
                        <Form.Label>
                          <Form.Check
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
          </Accordion.Body>
        </Accordion.Item>
      </Card>
    </Accordion>
  );
};

export default ImageChoices;
