import React from 'react'
import { Row, Col, Button } from 'reactstrap';

const Item = (props) => {
    return(
        <Row className="border">
            <Col>
                {props.item.name}
            </Col>
            <Col>
                {props.item.weight} lbs.
            </Col>
            <Col>
                {props.item.value} Gold
            </Col>
            <Col>
                {props.item.description ? props.item.description.description : ""}
            </Col>
            <Col>
            <Button onClick={() => props.purchase(props.item)}>
                Purchase
            </Button>
            </Col>
        </Row>
    );
}

export default Item;