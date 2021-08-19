import React from "react";
import Row from "react-bootstrap/Row";
import "./ItemCard.css";

const CardFront = (props) => {
  return (
    <div className='card-side side-front'>
      <div className='container-fluid bg-grey px-1 h-100'>
        <div className='row bg-grey px-0 d-flex'>
          <div className='col d-flex align-items-end flex-column bg-grey px-0 pt-0 '>
            <Row className='bg-grey'>
              <h5 className='bg-grey my-1'>{props.item.name}</h5>
            </Row>
            <Row className='bg-grey'>
              <h5 className='bg-grey my-0'>x {props.quantity}</h5>
            </Row>
            <Row className='bg-grey mt-auto'>
              <h5 className='bg-grey '>
                Total Value: {props.item.value * props.quantity}
              </h5>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardFront;
