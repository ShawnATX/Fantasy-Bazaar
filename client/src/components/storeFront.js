import React, { useState, useEffect } from 'react'
import { Row, Col, Button } from 'reactstrap'
import API from "../utils/API";
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

    const buildList = () => {
        itemList.forEach((item) => {
        })
        //get all unique item types in a Set, casting to an Array
        typeArr = Array.from(new Set(itemList.map((item) => item.type)));
    }

    const getItems = (type) => {
        return itemList.filter( (item) => (item.type === type))
    };

    return (
        <div>
            <Row className="mt-5 px-5">
                <Col className="text-center">
                    <button
                        href=""
                        alt="Back Home"
                        className="text-center mb-1 btn-small"
                        onClick={() => props.setPageState("Home")}>
                        Back Home
                    </button>
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
        </div>
    );
};


export default StoreFront;