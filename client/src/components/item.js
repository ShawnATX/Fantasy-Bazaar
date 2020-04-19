import React from 'react'
import { Row, Col } from 'reactstrap';



const Item = (props) => {
    const getDescription = () => {
        console.log(props.item.description);
        switch (props.item.type) {
            case "Weapon":
                if (props.item.description.properties) {
                    return `Damage: ${props.item.description.damage}
                    Properties: ${props.item.description.properties}`
                }
                else {
                    return `Damage: ${props.item.description.damage}`
                };
            case "Armor":
                if (props.item.description.skillModifier && props.item.description.abilityReq) {
                    return `Armor Class: ${props.item.description.ac}
                            Skill Modifier: ${props.item.description.skillModifier}
                            Ability Requirements: ${props.item.description.abilityReq}`;
                }
                else if (props.item.description.skillModifier) {
                    return `Armor Class: ${props.item.description.ac}
                            Skill Modifier: ${props.item.description.skillModifier}`;
                }
                else if (props.item.description.skillModifier) {
                    return `Armor Class: ${props.item.description.ac}
                            Ability Requirements: ${props.item.description.abilityReq}`;
                }
                else {
                    return `Armor Class: ${props.item.description.ac}`;
                };
            case "Consumable":
                return `${props.item.description.description}`;
            default:
                break;
        }
    }

    return (
        <Row className="border align-middle">
            <Col className="align-middle">
                <h4>
                    {props.item.name}
                </h4>
            </Col>
            <Col>
                <h5>{props.item.value}</h5> Gold
            </Col>
            <Col>
                <h5>{props.item.weight}</h5> lbs.
            </Col>
            <Col>
                {getDescription()}
                {/* {props.item.description ? props.item.description.description : ""} */}
            </Col>
            <Col>
                <button className="btn-small my-1 float-right" onClick={() => props.action(props.item)}>
                    {props.button}
                </button>
            </Col>
        </Row>
    );
}

export default Item;