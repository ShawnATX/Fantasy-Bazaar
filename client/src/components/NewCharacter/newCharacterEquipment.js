import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../utils/userContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListSection from "../listSection";
import CharacterHeader from "../Character/characterHeader";
import EquipmentFooter from "./equipmentFooter";
import { navigate } from "hookrouter";

const NewCharacterEquipment = (props) => {
  const { setPageState, bazaarObject, API, characterObject } = props;
  const { authenticationState } = useContext(UserContext);

  const [itemList, setItemList] = useState([]);
  const [chosenItemList, setChosenItemList] = useState([]);
  let typeArr = [];

  useEffect(() => {
    API.getBazaarItems(bazaarObject.id).then((res) => {
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
  const updateAuthenticationState = (userData) => {
    authenticationState.userHasAuthenticated(true, {
      email: userData.email,
      bazaars: userData.bazaars,
      characters: userData.characters,
      id: userData._id,
    });
  };

  const saveNewCharacter = () => {
    let itemList = chosenItemList.map((item) => item.id);
    API.saveCharacter({
      characterName: characterObject.characterName,
      characterImage: characterObject.characterImage,
      wallet: characterObject.wallet,
      items: itemList,
      bazaar: bazaarObject.id,
      owner: authenticationState.user.id,
      pendingApproval: bazaarObject.requireNewCharacterApproval,
    })
      .then((res) => {
        updateAuthenticationState(res.data);
        if (res.status === 201) {
          navigate("/userhome");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='text-center'>
      <CharacterHeader characterInfo={characterObject} />

      {buildTypeList()}

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

      <EquipmentFooter items={chosenItemList} API={API} />

      <Row className='sticky-footer mt-3'>
        <Col className='text-center'>
          <button className='btn-small mr-3' onClick={saveNewCharacter}>
            Save {characterObject.characterName}
          </button>
        </Col>
      </Row>
    </div>
  );
};

export default NewCharacterEquipment;
