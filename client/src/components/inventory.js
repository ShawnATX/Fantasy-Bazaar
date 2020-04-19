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
    }, [authenticationState]);

    return(
        <div>
            <Row className="mt-5 px-5">
                <Col className="mb-1 text-center">
                    <Button
                        href="#home"
                        alt="Back Home"
                        className="text-center"
                        onClick={() => props.setPageState("Home")}>
                        Back Home
                    </Button>
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