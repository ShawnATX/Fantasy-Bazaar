import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const NewBazaarMain = (props) => {
  const { formObject, setFormObject, setPageState } = props;

  const handleInputChange = (event) => {
    let { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  };

  const nextPage = () => {
    setPageState("Settings");
  };

  const handleFormSubmit = (event) => {
    let form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      event.stopPropagation();
      nextPage();
    }
  };

  return (
    <Row className="my-1">
      <Col className="" sm={12} md={{ span: 6, offset: 3 }}>
        <Form onSubmit={handleFormSubmit}>
          <Form.Control
            required
            name="bazaarName"
            placeholder="Bazaar Name"
            id="bazaarName"
            onChange={handleInputChange}
            value={formObject.bazaarName}
            className="mt-3"
          ></Form.Control>
          <Col sm={{ span: 8, offset: 2 }} className="justify-content-start">
            <Form.Check
              className="my-3 bazaar-radio"
              size="lg"
              type="radio"
              onClick={handleInputChange}
              name="system"
              value="DnD"
              id="systemRadioDnD"
              label="Dungeons and Dragons 5th Edition"
            />
            <Form.Check
              required
              className="my-3 bazaar-radio"
              type="radio"
              onClick={handleInputChange}
              name="system"
              value="Pathfinder1e"
              id="systemRadioPathfinder"
              label="Pathfinder 1st Edition"
            />
          </Col>

          <Row className="sticky-footer mt-4">
            <Col className="text-center">
              <Button
                className="text-center btn-small"
                variant="secondary"
                type="submit"
              >
                Choose Bazaar Settings
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default NewBazaarMain;
