import React, { useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import InputGroup from "react-bootstrap/InputGroup";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import SweetAlert from "react-bootstrap-sweetalert";

import buildCustomItem from "./buildCustomItem";

import API from "../../utils/API";

const CustomItem = (props) => {
  const { bazaarId, handleCloseModal } = props;
  const [formObject, setFormObject] = useState({
    type: "",
    system: "Pathfinder1e",
  });
  const [validated, setValidated] = useState(false);
  const [sweetAlertContent, setSweetAlertContent] = useState({
    title: "",
  });
  const [showAlert, setShowAlert] = useState(false);

  const saveItem = (item) => {
    console.log(item);
    API.saveItem(item).then((res) => {
      if (res.status === 201) {
        setSweetAlertContent({
          title: res.data.name,
          value: res.data.value,
          weight: res.data.weight,
          type: res.data.type,
          subtype: res.data.subtype,
        });
        handleCloseModal();
        setShowAlert(true);
      } else {
        console.log(res.data);
      }
    });
  };

  const confirmAlert = () => {
    setShowAlert(false);
  };

  const handleFormSubmit = (event) => {
    let form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      setValidated(true);
      let newItem = buildCustomItem(formObject);
      saveItem({
        item: newItem,
        bazaar: bazaarId,
      });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  };

  return (
    <Container fluid={true} className='bg-dark-grey'>
      {showAlert && (
        <SweetAlert
          custom
          customIcon={
            <i className='bi bi-check-lg' style={{ fontSize: "3rem" }} />
          }
          style={{ backgroundColor: "#6c757d" }}
          confirmBtnBsStyle={"secondary"}
          title={sweetAlertContent.title}
          onConfirm={confirmAlert}
          onCancel={confirmAlert}
        >
          <p>
            <span style={{ color: "#a4bace", backgroundColor: "#6c757d" }}>
              Value:{" "}
            </span>
            {sweetAlertContent.value}{" "}
            <span style={{ color: "#a4bace", backgroundColor: "#6c757d" }}>
              Weight:
            </span>{" "}
            {sweetAlertContent.weight}
          </p>
          <p>
            <span style={{ color: "#a4bace", backgroundColor: "#6c757d" }}>
              Type:
            </span>{" "}
            {sweetAlertContent.type}{" "}
            <span style={{ color: "#a4bace", backgroundColor: "#6c757d" }}>
              Subtype:
            </span>{" "}
            {sweetAlertContent.subtype}
          </p>
        </SweetAlert>
      )}
      <Form
        onSubmit={handleFormSubmit}
        className='bg-dark-grey'
        validated={validated}
      >
        <Row className='bg-dark-grey'>
          <Col md={5} className='bg-dark-grey px-1'>
            <Form.Group className='mb-3 bg-dark-grey' controlId='formGroupName'>
              <FloatingLabel controlId='floatingValue' label='Item Name'>
                <Form.Control
                  required
                  type='input'
                  name='name'
                  placeholder='Item Name'
                  onChange={handleInputChange}
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col md={3} className='bg-dark-grey px-1'>
            <Form.Group
              className='mb-3 bg-dark-grey'
              controlId='formGroupValue'
            >
              <FloatingLabel controlId='floatingValue' label='Item Value'>
                <Form.Control
                  required
                  type='double'
                  name='value'
                  placeholder='Item Value'
                  onChange={handleInputChange}
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col md={4} className='bg-dark-grey px-1'>
            <Form.Group
              className='mb-3 bg-dark-grey'
              controlId='formGroupWeight'
            >
              <InputGroup className='bg-dark-grey input-group-text-base'>
                <FloatingLabel controlId='floatingWeight' label='Item Weight'>
                  <Form.Control
                    required
                    type='double'
                    name='weight'
                    placeholder='Item Weight'
                    onChange={handleInputChange}
                  />
                </FloatingLabel>
                <InputGroup.Text id='input-group-weight'>lbs.</InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>

        <Row className='bg-dark-grey pe-1'>
          <Col md={6} className='bg-dark-grey px-1'>
            <Form.Group className='my-2 bg-dark-grey'>
              <Form.Select
                required
                aria-label='Item Type'
                type='select'
                name='type'
                onChange={handleInputChange}
              >
                <option>Item Type</option>
                <option value='Weapon'>Weapon</option>
                <option value='Armor'>Armor</option>
                <option value='Wearable'>Wearable</option>
                <option value='Adventuring Gear'>Adventuring Gear</option>
                <option value='Service'>Service</option>
                <option value='Misc'>Misc</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xs={10} md={5} className='bg-dark-grey px-1'>
            <Form.Group className='my-2' controlId='formGroupSubtype'>
              <FloatingLabel
                controlId='floatingSubtype'
                label='Item Subtype'
                className='bg-dark-grey'
              >
                <Form.Control
                  required
                  type='input'
                  name='subtype'
                  placeholder='Item Subtype'
                  onChange={handleInputChange}
                ></Form.Control>
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col xs={1} className='bg-dark-grey px-0 my-auto'>
            <OverlayTrigger
              placement='auto-start'
              overlay={
                <Tooltip id='tooltipItemSubtype' style={{ fontSize: "1.1rem" }}>
                  {` Not a required field, but useful to keep your Bazaar looking
                  organized. Subtypes of standard items typically follow this
                  chart: 
                    Adventuring gear: Consumable, Trekking, Container, Tool, Kit, Ammunition
                    Armor: Light Armor, Medium Armor, Heavy Armor, Shield
                    Weapon: Simple Melee, Simple Ranged, Martial Melee, Martial Ranged
                  `}
                </Tooltip>
              }
            >
              <i
                className='bi bi-question-square-fill bg-dark-grey '
                style={{ fontSize: "1.6rem" }}
              ></i>
            </OverlayTrigger>
          </Col>
        </Row>
        {formObject.type === "Weapon" && (
          <>
            <Row className='bg-dark-grey mt-1 mb-2'>
              <Col sm={12} className='bg-dark-grey px-1'>
                <Form.Label className='bg-dark-grey'>Weapon Damage</Form.Label>
                <InputGroup className='bg-dark-grey input-group-text-base'>
                  <Col sm={2}>
                    <FloatingLabel
                      controlId='floatingDamageDiceNumber'
                      label='Dice Number'
                    >
                      <Form.Control
                        required
                        type='input'
                        name='weaponDamageDiceNumber'
                        placeholder='Dice Number'
                        onChange={handleInputChange}
                      />
                    </FloatingLabel>
                  </Col>
                  <InputGroup.Text className=''>d</InputGroup.Text>
                  <Col sm={2}>
                    <FloatingLabel
                      controlId='floatingDamageDiceNumber'
                      label='Dice Type'
                    >
                      <Form.Control
                        required
                        type='input'
                        name='weaponDamageDiceType'
                        placeholder='Dice Type'
                        onChange={handleInputChange}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col xs={8} sm={5} md={3} className='bg-dark-grey ps-1'>
                    <FloatingLabel
                      controlId='floatingDamageType'
                      label='Damage Type'
                    >
                      <OverlayTrigger
                        placement='top'
                        overlay={
                          <Tooltip
                            id='tooltipDamageType'
                            style={{ fontSize: "1.1rem" }}
                          >
                            Bludgeoning, Piercing, Slashing, Bludgeoning or
                            Slashing, Slashing and Piercing, etc.
                          </Tooltip>
                        }
                      >
                        <Form.Control
                          required
                          type='input'
                          name='weaponDamageType'
                          placeholder='Weapon Damage Type'
                          onChange={handleInputChange}
                        />
                      </OverlayTrigger>
                    </FloatingLabel>
                  </Col>
                  <Col xs={10} md={3} className='bg-dark-grey px-1'>
                    <Form.Group
                      className='bg-dark-grey'
                      controlId='formGroupCrit'
                    >
                      <FloatingLabel
                        controlId='floatingCrit'
                        label='Weapon Critical'
                        className=''
                      >
                        <Form.Control
                          required
                          type='input'
                          name='crit'
                          placeholder='Weapon Critical'
                          onChange={handleInputChange}
                        />
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                  <Col xs={1} className='bg-dark-grey px-0 my-auto float-start'>
                    <OverlayTrigger
                      placement='bottom'
                      overlay={
                        <Tooltip
                          id='tooltipWeaponCrit'
                          style={{ fontSize: "1.1rem" }}
                        >
                          Examples: x2, x3, 19-20/x2
                        </Tooltip>
                      }
                    >
                      <i
                        className='bi bi-question-square-fill bg-dark-grey '
                        style={{ fontSize: "1.6rem" }}
                      ></i>
                    </OverlayTrigger>
                  </Col>
                </InputGroup>
              </Col>
            </Row>
          </>
        )}

        {formObject.type === "Armor" && (
          <>
            <Row className='bg-dark-grey mt-1 mb-1'>
              <Col xs={12} sm={6} className='bg-dark-grey px-1'>
                <Form.Group
                  className='mb-1 bg-dark-grey'
                  controlId='formGroupAC'
                >
                  <FloatingLabel
                    controlId='floatingAC'
                    label='Armor Class'
                    className='mb-1'
                  >
                    <Form.Control
                      required
                      type='input'
                      name='ac'
                      placeholder='Armor Class'
                      onChange={handleInputChange}
                    />
                  </FloatingLabel>
                </Form.Group>
              </Col>
              <Col xs={12} sm={6} className='bg-dark-grey px-1'>
                <Form.Group
                  className='mb-1 bg-dark-grey'
                  controlId='formGroupDexBonus'
                >
                  <FloatingLabel
                    controlId='floatingDexBonus'
                    label='Max Dexterity Bonus'
                    className='mb-1'
                  >
                    <Form.Control
                      type='input'
                      name='dexBonus'
                      placeholder='Max Dexterity Bonus'
                      onChange={handleInputChange}
                    />
                  </FloatingLabel>
                </Form.Group>
              </Col>
            </Row>
            <Row className='bg-dark-grey mt-1 mb-2'>
              <Col xs={12} sm={6} className='bg-dark-grey px-1'>
                <Form.Group
                  className='mb-1 bg-dark-grey'
                  controlId='formGroupArmorCheckPenalty'
                >
                  <FloatingLabel
                    controlId='floatingArmorCheckPenalty'
                    label='Armor Check Penalty'
                    className='mb-1'
                  >
                    <Form.Control
                      type='input'
                      name='armorCheckPenalty'
                      placeholder='Armor Check Penalty'
                      onChange={handleInputChange}
                    />
                  </FloatingLabel>
                </Form.Group>
              </Col>
              <Col xs={12} sm={6} className='bg-dark-grey px-1'>
                <Form.Group
                  className='bg-dark-grey'
                  controlId='formGroupArcaneSpellFailure'
                >
                  <InputGroup className='bg-dark-grey input-group-text-base'>
                    <Col xs={10}>
                      <FloatingLabel
                        controlId='floatingArcaneSpellFailure'
                        label='Arcane Spell Failure Chance'
                      >
                        <Form.Control
                          type='number'
                          name='arcaneSpellFailure'
                          placeholder='Arcane Spell Failure Chance'
                          onChange={handleInputChange}
                        />
                      </FloatingLabel>
                    </Col>
                    <Col xs={1}>
                      <InputGroup.Text>%</InputGroup.Text>
                    </Col>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>
          </>
        )}

        <Row className='bg-dark-grey mb-1'>
          <Col xs={10} className='bg-dark-grey px-1'>
            <Form.Group
              className='mb-1 bg-dark-grey'
              controlId='formGroupDescription'
            >
              <FloatingLabel
                controlId='floatingDescription'
                label='Item Description'
                className='mb-1 bg-dark-grey'
              >
                <Form.Control
                  as='textarea'
                  rows={2}
                  type='input'
                  name='description'
                  placeholder='Item Description'
                  onChange={handleInputChange}
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col xs={1} className='bg-dark-grey px-0 my-auto'>
            <OverlayTrigger
              placement='top'
              overlay={
                <Tooltip
                  id='tooltipItemDescription'
                  style={{ fontSize: "1.1rem" }}
                >
                  Typically necessary for Adventuring Gear, Services, Magic
                  Items, etc. A good place to describe what an item might do, if
                  it is not apparent.
                </Tooltip>
              }
            >
              <i
                className='bi bi-question-square-fill bg-dark-grey '
                style={{ fontSize: "1.6rem" }}
              ></i>
            </OverlayTrigger>
          </Col>
        </Row>
        <Row className='bg-dark-grey mb-3'>
          <Col xs={10} className='bg-dark-grey px-1'>
            <Form.Group
              className='mb-1 bg-dark-grey'
              controlId='formGroupProperties'
            >
              <FloatingLabel
                controlId='floatingProperties'
                label='Item Properties'
                className='mb-1'
              >
                <Form.Control
                  as='textarea'
                  rows={2}
                  type='input'
                  name='properties'
                  placeholder='Item Properties'
                  onChange={handleInputChange}
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col xs={1} className='bg-dark-grey px-0 my-auto'>
            <OverlayTrigger
              placement='top'
              overlay={
                <Tooltip
                  id='tooltipItemProperties'
                  style={{ fontSize: "1.1rem" }}
                >
                  This is where the specific game mechanics which correspond to
                  the item go. Weapon range and properties, effect saves, potion
                  effects, tool benefits all belong here.
                </Tooltip>
              }
            >
              <i
                className='bi bi-question-square-fill bg-dark-grey '
                style={{ fontSize: "1.6rem" }}
              ></i>
            </OverlayTrigger>
          </Col>
        </Row>

        <Row className='mb-1 bg-dark-grey'>
          <Col className='mb-1 bg-dark-grey'>
            <Button
              className='btn-small float-end'
              variant='secondary'
              type='submit'
            >
              Save
            </Button>
          </Col>
          <Col className='mb-1 bg-dark-grey'>
            <Button
              className='btn-small float-start'
              variant='secondary'
              onClick={handleCloseModal}
            >
              Close
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default CustomItem;
