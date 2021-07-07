import React, { useContext } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import UserContext from "../../utils/userContext";
import BuildDescription from "./buildDescription";

const Item = (props) => {
  const { waitingResponse } = props;
  const { authenticationState } = useContext(UserContext);

  return (
    <Row className='border align-middle'>
      <Col md={3} className='align-middle my-auto'>
        <h4>{props.item.name}</h4> {props.quantity ? `X${props.quantity}` : ""}
      </Col>
      <Col md={1} className='align-middle my-auto'>
        <h5>{props.item.value}</h5> Gold
      </Col>
      <Col md={1} className='align-middle my-auto'>
        <h5>{props.item.weight}</h5> lbs.
      </Col>
      <Col md={4} className='my-auto'>
        {BuildDescription(props.item)}
      </Col>
      <Col md={3} className='align-middle my-auto'>
        {waitingResponse ? (
          <Spinner variant='light' role='status'>
            <span className='sr-only'></span>
          </Spinner>
        ) : (
          <Button
            variant='secondary'
            className='btn-small my-1 float-right'
            onClick={() => props.action(props.item)}
            disabled={
              props.item.value > authenticationState.user.wallet &&
              props.button === "Purchase"
                ? true
                : false
            }
          >
            {props.button}
          </Button>
        )}
      </Col>
    </Row>
  );
};

export default Item;
