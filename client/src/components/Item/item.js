import React, {useEffect} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap-button-loader";
import BuildDescription from "./buildDescription";

const Item = (props) => {
  const { waitingResponse, checkbox, button, action } = props;
  return (
    <>
    { checkbox ? (
      <Row className='border align-middle py-1'>
        <Col xs={2} md={1} className='align-start my-auto'>
        <Form.Check className={'float-start'}
          onChange={action}
          id={props.item._id}
          name={props.item.name}
          data-level={"item"}
          key={props.item._id}
          checked={button}
          />
      </Col>
      <Col xs={5} md={3} lg={3} className='align-middle my-auto'>
      <h4>{props.item.name}</h4>
      </Col>
      <Col xs={3} md={2} lg={1} className='align-middle my-auto'>
      <h5>{props.item.value}</h5> Gold
      </Col>
      <Col xs={2} md={1} className='align-middle my-auto'>
      <span className="text-nowrap"> <h5>{props.item.weight}</h5> lbs.</span>
      </Col>
      <Col xs={12} md={5} lg={6} className='my-auto'>
        {BuildDescription(props.item)}
        </Col>
        </Row>
    ) : (
      <Row className='border align-middle py-1'>
      <Col xs={7} md={3} className='align-middle my-auto'>
      <h4>{props.item.name}</h4> {props.quantity && `X${props.quantity}`}
      </Col>
      <Col xs={3} md={1} className='align-middle my-auto'>
      <h5>{props.item.value}</h5> Gold
      </Col>
      <Col xs={2} md={1} className='align-middle my-auto'>
      <span className="text-nowrap"> <h5>{props.item.weight}</h5> lbs.</span>
      </Col>
      <Col xs={9} md={5} className='my-auto'>
        {BuildDescription(props.item)}
        </Col>
        <Col xs={3} md={2} className='align-middle my-auto'>
        <Button
        variant='secondary'
        className='btn my-1 float-right loader-btn'
        loading={waitingResponse}
        onClick={() => props.action(props.item)}
        spinAlignment='right'
        >
        {props.button}
        </Button>
        </Col>
        </Row>
        )}
    </>

        );
      };
      
      export default Item;
