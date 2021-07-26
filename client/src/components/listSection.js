import React from "react";
import Item from "./Item/item";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";

const ListSection = (props) => {
  const { type, items, waitingResponse, action, button } = props;
  //create a whitespace-free version to use in element ids and names
  const strippedType = type.replace(/\s+/g, "");
  let subtypeArr = [];

  const buildSubtypeList = () => {
    subtypeArr = Array.from(new Set(items.map((item) => item.subtype)));
    subtypeArr = subtypeArr.map((subtype) => ({
      subtype: subtype,
      strippedSubtype: subtype.replace(/\s+/g, ""),
    }));
  };

  const getItems = (subtype) => {
    return items.filter((item) => item.subtype === subtype);
  };

  return (
    <Accordion>
      <Card>
        <Accordion.Item eventKey='0'>
          <Accordion.Header as={Card.Header} className='py-0 my-0'>
            {type}
          </Accordion.Header>

          <Accordion.Body id={strippedType + "body"} className='px-1 py-2 mx-0'>
            <div>
              {buildSubtypeList()}
              {subtypeArr.map((subtypeObject) => (
                <Accordion key={subtypeObject.strippedSubtype}>
                  <Accordion.Item
                    as={Card}
                    eventKey='0'
                    key={subtypeObject.strippedSubtype}
                  >
                    <Accordion.Header
                      className='px-1 py-0 my-0'
                      as={Card.Header}
                      id={subtypeObject.strippedSubtype + "head"}
                    >
                      <h4 className='my-0 text-center bg-grey'>
                        {subtypeObject.subtype}
                      </h4>
                    </Accordion.Header>
                    <Accordion.Body as={Card.Body} className='py-2 px-3'>
                      {getItems(subtypeObject.subtype).map((item) => (
                        <Item
                          key={item._id}
                          item={item}
                          action={action}
                          button={button}
                          waitingResponse={waitingResponse}
                        />
                      ))}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              ))}
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Card>
    </Accordion>
  );
};

export default ListSection;
