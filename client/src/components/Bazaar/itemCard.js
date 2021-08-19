import React from "react";
import CardFront from "./cardFront";
import CardBack from "./cardBack";
import "./ItemCard.css";

const ItemCard = (props) => {
  //props = item => {name, value, _id, description}, quantity
  return (
    <div className='card-container'>
      <div className='card-body'>
        <CardFront item={props.item} quantity={props.quantity} />

        <CardBack />
      </div>
    </div>
  );
};

export default ItemCard;
