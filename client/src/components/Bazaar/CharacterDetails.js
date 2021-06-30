import React, { useEffect, useState } from "react";
import API from "../../utils/API";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

const CharacterDetails = (props) => {
  const [itemList, setItemList] = useState([]);

  //props.approvePendingChanges

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
    <Row sm={2} md={4} lg={5} className="text-center bg-grey">
      {props.character.items.length > 0 ? (
        itemList.map((item) => (
          <Col className="my-1 bg-grey" key={item._id}>
            <Card style={{ width: "12rem" }}>
              <Card.Body>
                <Card.Text>
                  {item.name} - {getQuantity(item._id)}
                </Card.Text>
                <Card.Text>
                  Total Value: {item.value * getQuantity(item._id)}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))
      ) : (
        <Row className="text-center">
          <Col>This character has no items</Col>
        </Row>
      )}
    </Row>
  );
};

export default CharacterDetails;
