import React, { useState, useEffect } from "react";
import ListSection from "../listSection";
import { Button, Row, Col } from "reactstrap";
import CharacterHeader from "../characterHeader";
import EquipmentFooter from "./equipmentFooter";

function NewCharacterEquipment(props) {
  const { setPageState, bazaarName, bazaarSystem, API, characterObject } =
    props;
  const [itemList, setItemList] = useState([]);
  const [chosenItemList, setChosenItemList] = useState([]);
  let typeArr = [];

  useEffect(() => {
    API.getItemsBySystem(bazaarSystem).then((res) => {
      setItemList(res.data);
    });
  }, []);

  const buildTypeList = () => {
    //get all unique item types in a Set, casting to an Array
    typeArr = Array.from(new Set(itemList.map((item) => item.type)));
  };

  const getItems = (type) => {
    return itemList.filter((item) => item.type === type);
  };

  const addItemToChosenList = (item) => {
    setChosenItemList([...chosenItemList, item._id]);
  };

  return (
    <div className="text-center">
      <CharacterHeader characterInfo={characterObject} />

      {buildTypeList()}

      <div className="accordion" id="itemMenu">
        {typeArr.map((type) => (
          <ListSection
            key={type}
            type={type}
            items={getItems(type)}
            expanded={"collapse"}
            action={addItemToChosenList}
            button={"Add"}
          ></ListSection>
        ))}
      </div>

      <EquipmentFooter items={itemList} API={API} />

      <Row className="sticky-footer mt-3">
        <Col className="text-center">
          <Button className="btn-small mr-3">Visit {bazaarName}</Button>
        </Col>
      </Row>
    </div>
  );
}

export default NewCharacterEquipment;
