import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import API from "../../utils/API";
import ListSection from "../listSection";
import CharacterAdRow from "./characterAdRow";
import CharacterFooter from "./characterFooter";

const StoreFront = (props) => {
  const { waitingResponse, setViewState, purchase, bazaarSettings, userHome } =
    props;
  const [itemList, setItemList] = useState([]);
  const [itemsLoading, setItemsLoading] = useState(true);
  useEffect(() => {
    API.getBazaarItems(bazaarSettings.id).then((res) => {
      setItemList(res.data);
      setItemsLoading(false);
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
    <>
      {/* <CharacterAdRow /> */}
      {buildList()}
      {itemsLoading ? (
        <Row className="pt-4">
          <h2 className="pulsate">Stocking the shelves...</h2>
        </Row>
      ) :
      (
        <>
        <div className='accordion mb-5 mt-1' id='itemMenu'>
          {typeArr.map((type) => (
            <ListSection
              key={type}
              type={type}
              items={getItems(type)}
              expanded='false'
              action={purchase}
              button={"Buy"}
              waitingResponse={waitingResponse}
            ></ListSection>
          ))}
        </div>
        <Row className='mb-3'></Row>
        </>

      )
    }
      <CharacterFooter characterHome={characterHome} userHome={userHome} />
    </>
  );
};

export default StoreFront;
