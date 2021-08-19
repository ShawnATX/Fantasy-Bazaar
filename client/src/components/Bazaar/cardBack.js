import React from "react";
import Button from "react-bootstrap/Button";
import "./ItemCard.css";

const CardBack = (props) => {
  return (
    <div className='card-side side-back'>
      <div className='container-fluid px-0 h-100 bg-grey'>
        <Button>Remove</Button>
      </div>
    </div>
  );
};

export default CardBack;
