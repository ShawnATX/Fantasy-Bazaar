import React, { useState, useEffect, useContext } from 'react'
import UserContext from "../utils/userContext";
import { Row, Col, Button } from 'reactstrap'
import API from "../utils/api";
import Item from "./item";

const Inventory = (props) => {
    const { authenticationState } = useContext(UserContext);

    const [itemList, setItemList] = useState([]);
    useEffect(() => {
        console.log(props)
        API.getItemsById(props.items)
            .then(res => {
                console.log(res.data);
                setItemList(res.data);
            }).then(console.log(itemList));
    }, []);

    return(
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
                action={props.sell}/>
            )}
        </div>
    );
    
};

export default Inventory;    