import React, { useContext } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import Button from "react-bootstrap/Button";
import Button from "react-bootstrap-button-loader";
import UserContext from "../../utils/userContext";
import BuildDescription from "./buildDescription";

const Item = (props) => {
  const { waitingResponse } = props;
  const { authenticationState } = useContext(UserContext);

  return (
    <Row className='border align-middle py-1'>
      <Col xs={7} md={3} className='align-middle my-auto'>
        <h4>{props.item.name}</h4> {props.quantity ? `X${props.quantity}` : ""}
      </Col>
      <Col xs={3} md={1} className='align-middle my-auto'>
        <h5>{props.item.value}</h5> Gold
      </Col>
      <Col xs={2} md={1} className='align-middle my-auto'>
        <h5>{props.item.weight}</h5> lbs.
      </Col>
      <Col xs={9} md={5} className='my-auto'>
        {BuildDescription(props.item)}
      </Col>
      <Col xs={3} md={2} className='align-middle my-auto'>
        <Button
          variant='secondary'
          className='btn my-1 float-right'
          loading={waitingResponse}
          onClick={() => props.action(props.item)}
          spinAlignment='right'
          // disabled={
          //   props.item.value > authenticationState.user.wallet &&
          //   props.button === "Purchase"
          //     ? true
          //     : false
          // }
        >
          {props.button}
        </Button>
      </Col>
    </Row>
  );
};

export default Item;
