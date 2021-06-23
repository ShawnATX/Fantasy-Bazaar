import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const NewBazaarMain = (props) => {
  const { formObject, setFormObject, setPageState } = props;

  function handleInputChange(event) {
    let { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  function nextPage(event) {
    setPageState("Settings");
  }

  return (
    <Row className="my-1">
      <Col
        className="text-center"
        sm={12}
        md={{ span: 6, offset: 3 }}
        lg={{ span: 8, offset: 2 }}
      >
        <input
          name="bazaarName"
          placeholder="Bazaar Name"
          id="bazaarName"
          onChange={handleInputChange}
        ></input>
        <ButtonGroup className="my-2" vertical>
          <Button
            className="my-1"
            type="radio"
            onClick={handleInputChange}
            active={formObject.system === "DnD"}
            name="system"
            value="DnD"
          >
            Dungeons and Dragons 5th Edition
          </Button>
          <Button
            type="radio"
            onClick={handleInputChange}
            active={formObject.system === "Pathfinder"}
            name="system"
            value="Pathfinder"
          >
            Pathfinder 1st Edition
          </Button>
        </ButtonGroup>

        <Row className="sticky-footer mt-3">
          <Col className="text-center">
            <button className="text-center btn-small" onClick={nextPage}>
              Choose Bazaar Settings
            </button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default NewBazaarMain;
