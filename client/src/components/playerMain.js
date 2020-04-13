import React from 'react'
import { Row, Col, Button } from 'reactstrap'

const PlayerMain = (props) => {
    return (
        <div>

            <Row className="mt-5 px-5">
                <Col >
                    <Button
                        href="#inventory"
                        alt="Manage Inventory"
                        className="text-center"
                        onClick={() => props.setPageState("Inventory")}>
                        Manage Inventory
            </Button>
                </Col>
            </Row>
            <Row className="mt-5 px-5">
                <Col >
                    <Button
                        href="#Store"
                        alt="Visit The Bazaar"
                        className="text-center"
                        onClick={() => props.setPageState("Store")}>
                            Visit The Bazaar!
                    </Button>
                </Col>
            </Row>
        </div>
    );
}

export default PlayerMain;