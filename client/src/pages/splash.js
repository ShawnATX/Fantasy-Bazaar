import React from 'react';
import API from "../utils/API";
import { Container, Row, Col } from "reactstrap";
import { Link } from 'react-router-dom';





const Splash = (props) => {
    return (
        <Container fluid={true}>
            <Row>
                <Col>
                    <Link to="/newplayer" alt="Join a game" className="text-center">
                        Join a Bazaar
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Link>
                        Curate a new Bazaar
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};

export default Splash;