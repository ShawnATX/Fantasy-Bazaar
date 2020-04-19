import React, { useContext, useEffect, useState } from 'react'
import UserContext from "../utils/userContext";
import { Row, Col, Button } from 'reactstrap'
import API from "../utils/API";
import Item from "./item";

const Inventory = (props) => {
    const [itemList, setItemList] = useState([]);
    const { authenticationState } = useContext(UserContext);
    useEffect(() => {
        API.getItemsById(props.items)
            .then(res => {
                setItemList(res.data);
            });
    }, [authenticationState, props.items]);

    return(
        <div>
            <Row className="mt-4 px-5">
                <Col className="mb-1 text-center">
                    <button
                        href="#home"
                        alt="Back Home"
                        className="text-center btn-small"
                        onClick={() => props.setPageState("Home")}>
                        Back Home
                    </button>
                </Col>
            </Row>
            {(props.items.length > 0) ? itemList.map((item) =>
                <Item 
                key={item._id}
                item={item}
                action={props.sell}
                button={"Sell"}/>
            ) : "No items in inventory at this time. Maybe give the Bazaar a visit?"}
        </div>
    );
};

export default Inventory;    