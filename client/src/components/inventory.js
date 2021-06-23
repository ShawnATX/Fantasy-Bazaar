import React, { useContext, useEffect, useState } from "react";
import UserContext from "../utils/userContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import API from "../utils/API";
import Item from "./item";

const Inventory = (props) => {
  const [itemList, setItemList] = useState([]);
  const { authenticationState } = useContext(UserContext);
  useEffect(() => {
    API.getItemsById(props.items).then((res) => {
      setItemList(res.data);
    });
  }, [authenticationState, props.items]);

  const getQuantity = (item) => {
    let count = 0;
    for (let i = 0; i < props.items.length; ++i) {
      if (props.items[i] === item) count++;
    }
    return count;
  };

  return (
    <div>
      <Row className="mt-4 px-5">
        <Col className="mb-1 text-center">
          <Button
            variant="secondary"
            alt="Character Home"
            className="text-center btn-small"
            onClick={() => props.setViewState("Home")}
          >
            Back to Character Home
          </Button>
        </Col>
      </Row>
      {props.items.length > 0
        ? itemList.map((item) => (
            <Item
              key={item._id}
              item={item}
              quantity={getQuantity(item._id)}
              action={props.sell}
              button={"Sell"}
            />
          ))
        : "No items in inventory at this time. Maybe give the Bazaar a visit?"}
    </div>
  );
};

export default Inventory;
