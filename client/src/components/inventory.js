import React, { useState, useEffect } from 'react'
import { Row, Col, Button } from 'reactstrap'
import api from "../utils/api";
import Item from "./item";

const Inventory = (props) => {

    const [itemList, setItemList] = useState([]);
    useEffect(() => {
        api.getItemsById(props.items)
            .then(res => {
                setItemList(res.data);
            });
    }, []);

    return(
        <div>
            <Row className="mt-5 px-5">
                <Col >
                    <Button
                        href="#home"
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
                action={props.sell}
                buttonPrompt={"Sell"}/>
            )}
        </div>
    );
};

export default Inventory;    