import React, { useContext } from "react";
import { Row, Col } from "reactstrap";
import UserContext from "../utils/userContext";

const Item = (props) => {
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
                            Ability Requirements: ${props.item.description.abilityReq}`;
        } else {
          return `Armor Class: ${props.item.description.ac}`;
        }
      case "Consumable":
        return `${props.item.description.description}`;
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
      </Col>
    </Row>
  );
};

export default Item;
