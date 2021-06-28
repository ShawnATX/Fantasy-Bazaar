import React, { useEffect, useState } from "react";
import API from "../../utils/API";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

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
    <Row sm={2} md={4} lg={6}>
      {props.character.items.length > 0
        ? itemList.map((item) => (
            <Col className="my-1">
              <Card key={item._id} style={{ width: "14rem" }}>
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
        : "Didnt get them items, bro"}
    </Row>
  );
};

export default CharacterDetails;
