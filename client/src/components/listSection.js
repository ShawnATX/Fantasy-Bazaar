import React from "react";
import Item from "./item";
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
        <h1 className="mb-0 text-center">
          <Accordion.Toggle as={Card.Header} eventKey={strippedType + "head"}>
            {type}
          </Accordion.Toggle>
        </h1>
        <Accordion.Collapse
          eventKey={strippedType + "head"}
          id={strippedType + "body"}
          data-parent="#itemMenu"
        >
          <div>
            {buildSubtypeList()}
            {subtypeArr.map((subtypeObject) => (
              <Accordion key={subtypeObject.strippedSubtype}>
                <Card key={subtypeObject.strippedSubtype}>
                  <Accordion.Toggle
                    className="p-1"
                    as={Card.Header}
                    eventKey={subtypeObject.strippedSubtype}
                    id={subtypeObject.strippedSubtype + "head"}
                  >
                    <h4 className="mb-0 text-center">
                      {subtypeObject.subtype}
                    </h4>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={subtypeObject.strippedSubtype}>
                    <Card.Body>
                      {getItems(subtypeObject.subtype).map((item) => (
                        <Item
                          key={item._id}
                          item={item}
                          action={action}
                          button={button}
                          waitingResponse={waitingResponse}
                        />
                      ))}
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            ))}
          </div>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default ListSection;
