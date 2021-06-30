import React, { useState } from "react";
import API from "../utils/API";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import InputGroup from "react-bootstrap/InputGroup";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const CustomItem = (props) => {
  const { bazaarSystem, bazaarId, handleCloseModal } = props;
  const [formObject, setFormObject] = useState({
    type: "",
  });
  const [validated, setValidated] = useState(false);

  const handleFormSubmit = (event) => {
    let form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      setValidated(true);
      let newItemForm = {
        name: formObject.name,
        custom: true,
        weight: formObject.weight,
        type: formObject.type,
        subtype: formObject.subtype,
        system: bazaarSystem,
        value: formObject.value,
        description: {
          description: formObject.description,
        },
      };
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
    console.log(formObject);
  };

  return (
    <Container fluid={true} className="bg-dark-grey">
      <Form
        onSubmit={handleFormSubmit}
        className="bg-dark-grey"
        validated={validated}
      >
        <Row className="bg-dark-grey">
          <Col md={5} className="bg-dark-grey px-1">
            <Form.Group className="mb-3 bg-dark-grey" controlId="formGroupName">
              <FloatingLabel controlId="floatingValue" label="Item Name">
                <Form.Control
                  required
                  type="input"
                  name="name"
                  placeholder="Item Name"
                  onChange={handleInputChange}
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col md={3} className="bg-dark-grey px-1">
            <Form.Group
              className="mb-3 bg-dark-grey"
              controlId="formGroupValue"
            >
              <FloatingLabel controlId="floatingValue" label="Item Value">
                <Form.Control
                  required
                  type="number"
                  name="value"
                  placeholder="Item Value"
                  onChange={handleInputChange}
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col md={4} className="bg-dark-grey px-1">
            <Form.Group
              className="mb-3 bg-dark-grey"
              controlId="formGroupWeight"
            >
              <InputGroup className="bg-dark-grey">
                <FloatingLabel controlId="floatingWeight" label="Item Weight">
                  <Form.Control
                    required
                    type="number"
                    name="weight"
                    placeholder="Item Weight"
                    onChange={handleInputChange}
                  />
                </FloatingLabel>
                <InputGroup.Text id="input-group-weight">lbs.</InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>

        <Row className="bg-dark-grey pe-1">
          <Col md={6} className="bg-dark-grey px-1">
            <Form.Group className="my-2 bg-dark-grey">
              <Form.Select
                required
                aria-label="Item Type"
                type="select"
                name="type"
                onChange={handleInputChange}
              >
                <option>Item Type</option>
                <option value="Weapon">Weapon</option>
                <option value="Armor">Armor</option>
                <option value="Wearable">Wearable</option>
                <option value="Adventuring Gear">Adventuring Gear</option>
                <option value="Service">Service</option>
                <option value="Misc">Misc</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={5} className="bg-dark-grey px-1">
            <Form.Group className="my-2" controlId="formGroupSubtype">
              <FloatingLabel
                controlId="floatingSubtype"
                label="Item Subtype"
                className="bg-dark-grey"
              >
                <Form.Control
                  required
                  type="input"
                  name="subtype"
                  placeholder="Item Subtype"
                  onChange={handleInputChange}
                ></Form.Control>
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col xs={1} className="bg-dark-grey px-0 my-auto">
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip id="tooltipItemSubtype" style={{ fontSize: "1.1rem" }}>
                  Not a required field, but useful to keep your Bazaar looking
                  organized. Subtypes of standard items typically follow this
                  chart:
                </Tooltip>
              }
            >
              <i
                className="bi bi-question-square-fill bg-dark-grey "
                style={{ fontSize: "1.6rem" }}
              ></i>
            </OverlayTrigger>
          </Col>
        </Row>
        <Row className="bg-dark-grey my-3">
          {formObject.type === "Weapon" && (
            <Form.Group
              className="mb-1 bg-dark-grey"
              controlId="formGroupDamage"
            >
              <FloatingLabel
                controlId="floatingDamage"
                label="Weapon Damage"
                className="mb-1"
              >
                <Form.Control
                  required
                  type="input"
                  name="damage"
                  placeholder="Weapon Damage"
                  onChange={handleInputChange}
                />
              </FloatingLabel>
            </Form.Group>
          )}
          {formObject.type === "Armor" && (
            <Form.Group className="mb-1 bg-dark-grey" controlId="formGroupAC">
              <FloatingLabel
                controlId="floatingAC"
                label="Armor Class"
                className="mb-1"
              >
                <Form.Control
                  required
                  type="input"
                  name="ac"
                  placeholder="Armor Class"
                  onChange={handleInputChange}
                />
              </FloatingLabel>
            </Form.Group>
          )}
          <Form.Group
            className="mb-1 bg-dark-grey"
            controlId="formGroupDescription"
          >
            <FloatingLabel
              controlId="floatingDescription"
              label="Item Description"
              className="mb-1"
            >
              <Form.Control
                required
                type="input"
                name="description"
                placeholder="Item Description"
                onChange={handleInputChange}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group
            className="mb-1 bg-dark-grey"
            controlId="formGroupProperties"
          >
            <FloatingLabel
              controlId="floatingProperties"
              label="Item Properties"
              className="mb-1"
            >
              <Form.Control
                required
                type="input"
                name="properties"
                placeholder="Item Properties"
                onChange={handleInputChange}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group
            className="mb-1 bg-dark-grey"
            controlId="formGroupAbilityReq"
          >
            <FloatingLabel
              controlId="floatingAbilityReq"
              label="Item Ability Requirement"
              className="mb-1"
            >
              <Form.Control
                required
                type="input"
                name="abilityReq"
                placeholder="Item Ability Requirement"
                onChange={handleInputChange}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group
            className="mb-1 bg-dark-grey"
            controlId="formGroupSkillModifier"
          >
            <FloatingLabel
              controlId="floatingSkillModifier"
              label="Item Skill Modifier"
              className="mb-1"
            >
              <Form.Control
                required
                type="input"
                name="skillModifier"
                placeholder="Item Skill Modifier"
                onChange={handleInputChange}
              />
            </FloatingLabel>
          </Form.Group>
        </Row>
        <Row className="mb-1 bg-dark-grey">
          <Col className="mb-1 bg-dark-grey">
            <Button
              className="btn-small float-end"
              variant="secondary"
              onClick={handleCloseModal}
            >
              Close
            </Button>
          </Col>
          <Col className="mb-1 bg-dark-grey">
            <Button
              className="btn-small float-start"
              variant="secondary"
              type="submit"
            >
              Save
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default CustomItem;
