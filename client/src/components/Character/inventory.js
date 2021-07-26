import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import API from "../../utils/API";
import Item from "../Item/item";
import CharacterAdRow from "./characterAdRow";
import CharacterFooter from "./characterFooter";

//props = setViewState={setViewState} items={props.character.items} sell={sellItem} waitingResponse={waitingResponse} userHome={userHome} bazaaar={bazaarObject}
const Inventory = (props) => {
  const [itemList, setItemList] = useState([]);
  const [itemsLoading, setItemsLoading] = useState(true);
  useEffect(() => {
    API.getItemsById(props.items).then((res) => {
      setItemList(res.data);
      setItemsLoading(false);
    });
  }, [props.items]);

  const getQuantity = (item) => {
    let count = 0;
    for (let i = 0; i < props.items.length; ++i) {
      if (props.items[i] === item) count++;
    }
    return count;
  };
  const characterHome = () => {
    props.setViewState("Home");
  };

  return (
    <>
      {/* <CharacterAdRow /> */}
      {itemsLoading ? (
        <Row className="pt-4">
          <h2 className="pulsate">Organizing your loot...</h2>
        </Row>
      ):
      (
        <>
          <Row className='mt-4 px-3 mb-5'>
          <Col>
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
            </Col>
          </Row>
          <Row className='mb-3'></Row>
        </>
      )
      }
      <CharacterFooter
        characterHome={characterHome}
        userHome={props.userHome}
      />
    </>
  );
};

export default Inventory;
