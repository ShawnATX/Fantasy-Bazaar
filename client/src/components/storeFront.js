import React, { useState, useEffect } from 'react'
import { Row, Col, Button } from 'reactstrap'
import API from "../utils/api";
import Item from "./item";


const StoreFront = (props) => {
    const [itemList, setItemList] = useState([]);
    useEffect(() => {
        //loading default "DnD" items, @@TODO update to get bazaar-specific items
        API.getItemsBySystem("DnD")
            .then(res => {
                setItemList(res.data);
            });
    }, []);

    return (
        <div>
            <Row className="mt-5 px-5">
                <Col >
                    <Button
                        href=""
                        alt="Back Home"
                        className="text-center"
                        onClick={() => props.setPageState("Home")}>
                        Back Home
                    </Button>
                </Col>
            </Row>
            {itemList.map((item) =>
                <Item 
                key={item._id}
                item={item}
                action={props.purchase}/>
            )}
        </div>
    );

};


export default StoreFront;