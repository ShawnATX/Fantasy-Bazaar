import React, { useEffect, useState } from "react";
import API from "../../utils/API";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ItemCard from "./itemCard";

const CharacterDetails = (props) => {
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    //returns a set of unique items
    if (props.character.items.length > 0) {
      API.getItemsById(props.character.items).then((res) => {
        setItemList(res.data);
      });
    }
  }, [props.character.items]);

  const getQuantity = (item) => {
    let count = 0;
    for (let i = 0; i < props.character.items.length; ++i) {
      if (props.character.items[i] === item) count++;
    }
    return count;
  };

  return (
    // <Row xs={2} sm={2} md={4} lg={5} className='text-center bg-dark-grey'>
    <Row className='text-center bg-dark-grey'>
      {props.character.items.length > 0 ? (
        itemList.map((item) => (
          // <Col className='my-1 bg-dark-grey mx-auto' key={item._id}>
          //   <Card>
          //     <Card.Body>
          //       <Card.Text>
          //         {item.name} - {getQuantity(item._id)}
          //       </Card.Text>
          //       <Card.Text>
          //         Total Value: {item.value * getQuantity(item._id)}
          //       </Card.Text>
          //     </Card.Body>
          //   </Card>
          // </Col>
          <ItemCard item={item} quantity={getQuantity(item._id)} />
        ))
      ) : (
        <Row className='text-center'>
          <Col>This character has no items</Col>
        </Row>
      )}
    </Row>
  );
};

export default CharacterDetails;
