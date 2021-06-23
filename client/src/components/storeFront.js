import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import API from "../utils/API";
import ListSection from "./listSection";

const StoreFront = (props) => {
  const { waitingResponse, setViewState, purchase } = props;
  const [itemList, setItemList] = useState([]);
  useEffect(() => {
    //loading default "DnD" items, @@TODO update to get bazaar-specific items
    API.getItemsBySystem("DnD").then((res) => {
      setItemList(res.data);
    });
  }, []);

  let typeArr = [];

  const buildList = () => {
    itemList.forEach((item) => {});
    //get all unique item types in a Set, casting to an Array
    typeArr = Array.from(new Set(itemList.map((item) => item.type)));
  };

  const getItems = (type) => {
    return itemList.filter((item) => item.type === type);
  };

  return (
    <div>
      <Row className="mt-5 px-5">
        <Col className="text-center">
          <Button
            variant="secondary"
            alt="Back Home"
            className="text-center mb-1 btn-small"
            onClick={() => setViewState("Home")}
          >
            Back To Character Home
          </Button>
        </Col>
      </Row>
      {buildList()}
      <div className="accordion" id="itemMenu">
        {typeArr.map((type) => (
          <ListSection
            key={type}
            type={type}
            items={getItems(type)}
            expanded={type === "Consumable" ? "collapse show" : "collapse"}
            action={purchase}
            button={"Purchase"}
            waitingResponse={waitingResponse}
          ></ListSection>
        ))}
      </div>
    </div>
  );
};

export default StoreFront;
