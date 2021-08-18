import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import API from "../../utils/API";
import { A } from "hookrouter";
import ListSection from "../../components/listSection";

const DNDExampleBazaar = (props) => {
  const [itemList, setItemList] = useState([]);
  const [itemsLoading, setItemsLoading] = useState(true);

  useEffect(() => {
    API.getItemsBySystem("DnD").then((res) => {
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

  const dummyAction = () => {
    return;
  };

  return (
    <Container fluid={true} className='text-center'>
      <h1 className='display-2 mt-3'>Fantasy Bazaar</h1>
      <h3 className='mt-3'>Example Dungeons and Dragons 5th Edition Bazaar</h3>
      {buildList()}
      {itemsLoading ? (
        <Row className='pt-4'>
          <h2 className='pulsate'>Stocking the shelves...</h2>
        </Row>
      ) : (
        <>
          <div className='accordion mb-5 mt-1' id='itemMenu'>
            {typeArr.map((type) => (
              <ListSection
                key={type}
                type={type}
                items={getItems(type)}
                expanded='false'
                action={dummyAction}
                button={"Buy"}
                waitingResponse={null}
              ></ListSection>
            ))}
          </div>
          <Row className='mb-3'></Row>
        </>
      )}
      <A href='/' alt='Back Home'>
        <Button className='btn-small' variant='secondary'>
          Back Home
        </Button>
      </A>
    </Container>
  );
};

export default DNDExampleBazaar;
