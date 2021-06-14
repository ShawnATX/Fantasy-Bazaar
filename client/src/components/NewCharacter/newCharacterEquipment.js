import React, { useState, useEffect } from "react";
import { Button, Row, Col } from "reactstrap";
import { useHistory } from "react-router-dom";
import ListSection from "../listSection";
import CharacterHeader from "../characterHeader";
import EquipmentFooter from "./equipmentFooter";

function NewCharacterEquipment(props) {
  const {
    setPageState,
    bazaarObject,
    API,
    characterObject,
    authenticationState,
  } = props;
  const history = useHistory();

  const [itemList, setItemList] = useState([]);
  const [chosenItemList, setChosenItemList] = useState([]);
  let typeArr = [];

  useEffect(() => {
    console.log(authenticationState);
    API.getItemsBySystem(bazaarObject.system).then((res) => {
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
    setChosenItemList([
      ...chosenItemList,
      { name: item.name, value: item.value, id: item._id },
    ]);
  };

  const saveNewCharacter = () => {
    let itemList = chosenItemList.map((item) => item.id);
    console.log(bazaarObject);
    API.saveCharacter({
      characterName: characterObject.characterName,
      characterImage: characterObject.characterImage,
      wallet: characterObject.wallet,
      items: itemList,
      bazaar: bazaarObject.id,
      owner: authenticationState.user.id,
    })
      .then((res) => {
        if (res.status === 200) {
          history.push("/characterhome");
        }
      })
      .catch((err) => console.log(err));
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

      <EquipmentFooter items={chosenItemList} API={API} />

      <Row className="sticky-footer mt-3">
        <Col className="text-center">
          <Button className="btn-small mr-3" onClick={saveNewCharacter}>
            Save {characterObject.characterName}
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default NewCharacterEquipment;
