import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import API from "../../utils/API";
// import ListSection from "../listSection";
import StockListAccordion from "./stockListAccordion";


const StockPicker = (props) => {
  const [itemList, setItemList] = useState([]);
  const [chosenItems, setChosenItems] = useState([]);
  const [chosenItemTypes, setChosenItemTypes] = useState([]);
  const [chosenItemSubtypes, setChosenItemSubtypes] = useState([]);

  let itemTypes = [];


  useEffect(() => {
    API.getItemsBySystem(props.formObject.system).then((res) => {
      setItemList(res.data);
    });
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    props.saveNewBazaar(props.formObject);
  };
  const handleGoBack = () => {
    props.setPageState(2);
  };

  const buildTypeList = () => {
    //get all unique item types in a Set, casting to an Array
    itemTypes = Array.from(new Set(itemList.map((item) => item.type)));
  };

  const getItems = (type) => {
    return itemList.filter((item) => item.type === type);
  };


  return (
    <>
      <Row>
        <h4 className='mb-3'>
          Select the items available to purchase initially:
        </h4>
        <Col>
          {buildTypeList()}
          {itemTypes.map((type) => (
            <StockListAccordion 
              expanded={"collapse"}
              key={type}
              type={type}
              items={getItems(type)}
              chosenItems={chosenItems}
              setChosenItems={setChosenItems}
              chosenItemTypes={chosenItemTypes}
              setChosenItemTypes={setChosenItemTypes}
              chosenItemSubtypes={chosenItemSubtypes}
              setChosenItemSubtypes={setChosenItemSubtypes}
            />
          ))}
        </Col>
        <Row className='sticky-footer mt-3'>
          <Col className='text-center'>
            <Button
              variant='secondary'
              type='submit'
              className='text-center btn-small'
              onClick={handleGoBack}
            >
              Go Back
            </Button>
          </Col>
          <Col>
            <Button
              variant='secondary'
              type='submit'
              className='text-center btn-small'
              onClick={handleFormSubmit}
            >
              Finish!
            </Button>
          </Col>
        </Row>
      </Row>
    </>
  );
};

export default StockPicker;
