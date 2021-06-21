import React, { useContext } from "react";
import { Row, Col, Spinner } from "reactstrap";
import UserContext from "../utils/userContext";

const Item = (props) => {
  const { waitingResponse } = props;
  const { authenticationState } = useContext(UserContext);

  const getDescription = () => {
    switch (props.item.type) {
      case "Weapon":
        if (props.item.description.properties) {
          return `Damage: ${props.item.description.damage}
                    Properties: ${props.item.description.properties}`;
        } else {
          return `Damage: ${props.item.description.damage}`;
        }
      case "Armor":
        if (
          props.item.description.skillModifier &&
          props.item.description.abilityReq
        ) {
          return `Armor Class: ${props.item.description.ac}
                  
          Skill Modifier: ${props.item.description.skillModifier}
                  Ability Requirements: ${props.item.description.abilityReq}`;
        } else if (props.item.description.skillModifier) {
          return `Armor Class: ${props.item.description.ac}
                  Skill Modifier: ${props.item.description.skillModifier}`;
        } else if (props.item.description.skillModifier) {
          return `Armor Class: ${props.item.description.ac}
                  Skill Modifier: ${props.item.description.skillModifier}`;
        } else {
          return `Armor Class: ${props.item.description.ac}`;
        }
      case "Adventuring Gear":
        //capacity, description, damage, properties
        if (props.item.description) {
          if (
            props.item.description.description &&
            props.item.description.damage &&
            props.item.description.properties
          ) {
            return `
              Description: ${props.item.description.description}
                Damage: ${props.item.description.damage}
                Properties: ${props.item.description.properties}`;
          } else if (
            props.item.description.description &&
            props.item.description.properties
          ) {
            return `
            Description: ${props.item.description.description}
              Properties: ${props.item.description.properties}
          `;
          } else if (props.item.description.properties) {
            return `Properties: ${props.item.description.properties}`;
          } else if (props.item.description.description) {
            return `Description: ${props.item.description.description}`;
          } else if (
            props.item.description.capacity &&
            props.item.description.description &&
            props.item.description.properties
          ) {
            return `Description: ${props.item.description.description}
                      Properties: ${props.item.description.properties}
                      Capacity: ${props.item.description.capacity}`;
          } else if (
            props.item.description.capacity &&
            props.item.description.description
          ) {
            return `Description: ${props.item.description.description}
              
            Capacity: ${props.item.description.capacity}`;
          } else if (
            props.item.description.capacity &&
            props.item.description.properties
          ) {
            return `Capacity: ${props.item.description.capacity}
                
            Description: ${props.item.description.properties}`;
          } else if (props.item.description.capacity) {
            return `Capacity: ${props.item.description.capacity}`;
          } else {
            return;
          }
        } else {
          return;
        }
      default:
        break;
    }
  };

  return (
    <Row className="border align-middle">
      <Col className="align-middle">
        <h4>{props.item.name}</h4> {props.quantity ? `X${props.quantity}` : ""}
      </Col>
      <Col>
        <h5>{props.item.value}</h5> Gold
      </Col>
      <Col>
        <h5>{props.item.weight}</h5> lbs.
      </Col>
      <Col>{getDescription()}</Col>
      <Col>
        {/* Disable purchase button if it is too expensive */}
        {waitingResponse ? (
          <Spinner color="light" role="status">
            <span className="sr-only"></span>
          </Spinner>
        ) : (
          <button
            className="btn-small my-1 float-right"
            onClick={() => props.action(props.item)}
            disabled={
              props.item.value > authenticationState.user.wallet &&
              props.button === "Purchase"
                ? true
                : false
            }
          >
            {props.button}
          </button>
        )}
      </Col>
    </Row>
  );
};

export default Item;
