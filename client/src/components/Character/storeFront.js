import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import API from "../../utils/API";
import ListSection from "../listSection";
import CharacterFooter from "./characterFooter";

const StoreFront = (props) => {
  const { waitingResponse, setViewState, purchase, bazaarSettings, userHome } =
    props;
  const [itemList, setItemList] = useState([]);
  useEffect(() => {
    API.getBazaarItems(bazaarSettings.id).then((res) => {
      setItemList(res.data);
    });
  }, []);

  let typeArr = [];

  const buildList = () => {
    //get all unique item types in a Set, casting to an Array
    typeArr = Array.from(new Set(itemList.map((item) => item.type)));
  };

  const getItems = (type) => {
    return itemList.filter((item) => item.type === type);
  };

  const characterHome = () => {
    setViewState("Home");
  };

  return (
    <div>
      <Row className='mt-5 px-5 mb-5'></Row>
      {buildList()}
      <div className='accordion' id='itemMenu'>
        {typeArr.map((type) => (
          <ListSection
            key={type}
            type={type}
            items={getItems(type)}
            expanded='false'
            action={purchase}
            button={"Purchase"}
            waitingResponse={waitingResponse}
          ></ListSection>
        ))}
      </div>
      <CharacterFooter userHome={userHome} characterHome={characterHome} />
    </div>
  );
};

export default StoreFront;
