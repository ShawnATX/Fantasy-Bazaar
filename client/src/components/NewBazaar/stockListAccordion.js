import React, {useEffect} from 'react'

import Item from "../Item/item";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";


const StockListAccordion = (props) => {

  useEffect(() => {
    console.log(props.chosenItems);

  })

  const { chosenItemTypes, chosenItemSubtypes } = props;
    const whitespaceStrippedType = props.type.replace(/\s+/g, "");
    let subtypes = [];

    const getItems = (subtype) => {
        return props.items.filter((item) => item.subtype === subtype);
    };

    
    const buildSubtypeList = () => {
      subtypes = (Array.from(new Set(props.items.map((item) => item.subtype))));
      subtypes = subtypes.map((subtype) => ({
        subtype: subtype,
        whitespaceStrippedSubtype: subtype.replace(/\s+/g, ""),
      }));
    };

    const handleInputChange = (event) => {
        event.stopPropagation();
        console.log()
        if (event.target.dataset.level === "type"){
          console.log(chosenItemTypes)
          console.log(chosenItemTypes.includes(event.target.name));
          if (chosenItemTypes.includes(event.target.name)){
            let newTypes = [...chosenItemTypes];
            newTypes.splice(newTypes.indexOf(event.target.name), 1);
            console.log(newTypes);
            props.setChosenItemTypes(newTypes);
            propagateSubtypesFromParent(false)
          } else{
            props.setChosenItemTypes([...chosenItemTypes, event.target.name])
            propagateSubtypesFromParent(true)
          }
        }
        else if(event.target.dataset.level === "subtype" ){
          if (chosenItemSubtypes.includes(event.target.name)){
            let newSubtypes = [...chosenItemSubtypes];
            newSubtypes.splice(newSubtypes.indexOf(event.target.name), 1);
            props.setChosenItemSubtypes(newSubtypes);
            propagateItemsFromSubtype(event.target.name, false);
          } else{
            props.setChosenItemSubtypes([...chosenItemSubtypes, event.target.name])
            propagateItemsFromSubtype(event.target.name, true);
          }
        }
        else { //'item'
          let newChosenItems = [...props.chosenItems];
          if (itemSelected(event.target.id)){
            newChosenItems.splice(newChosenItems.indexOf(event.target.id), 1)
            props.setChosenItems(newChosenItems);
          }
          else {
            newChosenItems.push(event.target.id);
            props.setChosenItems(newChosenItems);
          }
        }
    }

    const itemSelected = (element) => {
      if (props.chosenItems.includes(element)){
        return true;
      }
      return false;
    }

    const renderParentCheckbox = (element, level) => {
      let checked;
      if(level === "type"){
        if (props.chosenItemTypes.includes(element)){
          checked = true;
        }
        return (
          <Form.Check className={'me-2 bg-grey'}
            onClick={handleInputChange}
            id={element}
            name={element}
            data-level={level}
            key={element}
            checked={checked}
          />
          );
      } else {
        if (props.chosenItemSubtypes.includes(element)){
          checked = true;
        }
        return (
          <Form.Check 
            className={'me-2 bg-grey'}
            onClick={handleInputChange}
            id={element}
            name={element}
            data-level={level}
            data-parent={whitespaceStrippedType}
            key={element}
            checked={checked}
          />
          );
      }
    }

    const propagateSubtypesFromParent = (checked) => {
      console.log("subtype propagation expected: " + checked);
      console.log(checked);
      if (!checked){
        let newSubtypes = [...chosenItemSubtypes];
        let newItems = [...props.chosenItems];
        console.log(newSubtypes);
        subtypes.forEach(subtype => {
          const subtypeItems = getItems(subtype.subtype).map(item => {return (item._id)})
          newSubtypes.splice(newSubtypes.indexOf(subtype.whitespaceStrippedSubtype), 1)
          console.log("trying to propagate items for " + subtype.subtype)
          subtypeItems.forEach((item) => {
            newItems.splice(newItems.indexOf(item._id), 1);
          })
          // propagateItemsFromSubtype(subtype.whitespaceStrippedSubtype, false);
        })
        props.setChosenItems(newItems);
        props.setChosenItemSubtypes(newSubtypes);
      } else{
        let newSubtypes = [...chosenItemSubtypes];
        let newItems = [];
        subtypes.forEach(subtype => {
          if (!newSubtypes.includes(subtype.whitespaceStrippedSubtype)){
            console.log("trying to propagate items for " + subtype.whitespaceStrippedSubtype)
            newSubtypes.push(subtype.whitespaceStrippedSubtype)
            const subtypeItems = getItems(subtype.subtype).map(item => {return (item._id)});
            newItems = [...newItems, ...subtypeItems];
          }
        })
        props.setChosenItems([...newItems, ...props.chosenItems])
        props.setChosenItemSubtypes(newSubtypes);
      }
    };

    const propagateItemsFromSubtype = (subtype, checked) => {
      if (checked === false) {
        let childrenItems = props.items.filter((item) => {
          let strippedSubtype = item.subtype.replace(/\s+/g, "");
          return (strippedSubtype === subtype)
          }
        ).map((item) => {
          return item._id;
        })
        let newChosenItems = [...props.chosenItems];
        childrenItems.forEach((item) => {
          if (itemSelected(item)){
            newChosenItems.splice(newChosenItems.indexOf(item), 1);
          }
        })
        props.setChosenItems(newChosenItems);
      } else {
        let childrenItems = props.items.filter((item) => {
          let strippedSubtype = item.subtype.replace(/\s+/g, "");
          return (strippedSubtype === subtype)
          }
        ).map((item) => {
          return item._id;
        })
        console.log(subtype, childrenItems)
        props.setChosenItems([ ...childrenItems, ...props.chosenItems]);
      }
    }


    return (
        <Accordion>
          <Card>
            <Accordion.Item eventKey='0'>
              <Accordion.Header as={Card.Header} className='py-0 my-0 ps-0'>
                {renderParentCheckbox(whitespaceStrippedType, "type")}
        
                {props.type}
              </Accordion.Header>
    
              <Accordion.Body id={whitespaceStrippedType + "body"} className='px-1 py-2 mx-0'>
                <div>
                  {buildSubtypeList()}
                  {subtypes.map((subtype) => (
                    <Accordion key={subtype.whitespaceStrippedSubtype}>
                      <Accordion.Item
                        as={Card}
                        eventKey='0'
                        key={subtype.whitespaceStrippedSubtype}
                      >
                        <Accordion.Header
                          className='px-0 py-0 my-0'
                          as={Card.Header}
                          id={subtype.whitespaceStrippedSubtype + "head"}
                        >
                          {renderParentCheckbox(subtype.whitespaceStrippedSubtype, "subtype")}
                          <h4 className='my-0 text-center bg-grey'>
                            {subtype.subtype}
                          </h4>
                        </Accordion.Header>
                        <Accordion.Body as={Card.Body} className='py-2 px-3'>
                          {getItems(subtype.subtype).map((item) => (
                            <Item
                              key={item._id}
                              item={item}
                              action={handleInputChange}
                              button={itemSelected(item._id)}
                              waitingResponse={false}
                              checkbox={true}
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
}


export default StockListAccordion;