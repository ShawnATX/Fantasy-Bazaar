import React, { useState, useEffect } from 'react'
import { Row, Col, Button } from 'reactstrap'
import API from "../utils/api";
import ListSection from "./listSection";

const StoreFront = (props) => {
    const [itemList, setItemList] = useState([]);
    useEffect(() => {
        //loading default "DnD" items, @@TODO update to get bazaar-specific items
        API.getItemsBySystem("DnD")
            .then(res => {
                setItemList(res.data);
            })
    }, []);

    let typeArr = [];
    let subtypeArr;

    const buildList = () => {
        itemList.forEach((item) => {
            //console.log(item.subtype);
        })
        //get all unique item types in a Set, casting to an Array
        typeArr = Array.from(new Set(itemList.map((item) => item.type)));
        subtypeArr = itemList.map((item) => { return  {type: item.type , subtype : item.subtype } } );
        subtypeArr = subtypeArr.filter( (obj) => {} )
        // let typeList = itemList.filter( (item) => (!typeList.includes(item.type)))
        // for (let i=0; i < itemList.length; i++) {
        // }
    }

    const getItems = (type) => {
        return itemList.filter( (item) => (item.type === type))
    };

    return (
        <div>
            <Row className="mt-5 px-5">
                <Col className="text-center">
                    <Button
                        href=""
                        alt="Back Home"
                        className="text-center mb-1"
                        onClick={() => props.setPageState("Home")}>
                        Back Home
                    </Button>
                </Col>
            </Row>
            {buildList()}
            <div className="accordion" id="itemMenu">
                {typeArr.map((type => 
                    <ListSection
                        key={type}
                        type={type}
                        items={getItems(type)}
                        expanded={ type === "Consumable" ? "collapse show" : "collapse"}
                        action={props.purchase}
                        button={"Purchase"}
                    >
                    </ListSection>
                ))}
                
            </div>
            {/* {itemList.map((item) =>
                <Item 
                key={item._id}
                item={item}
                action={props.purchase}
                buttonPrompt={"Purchase"}/>
            )} */}
        </div>
    );

};


export default StoreFront;