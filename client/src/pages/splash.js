import React from 'react';
import { Container, Row, Col, Button } from "reactstrap";
import { Link } from 'react-router-dom';

const Splash = (props) => {
    return (
        <Container className="text-center">
            <Row className="mt-5 px-5">
                <Col >
                    <Link to="/newplayer" alt="Join a game" className="text-center">
                        Join a Bazaar
                    </Link>
                </Col>
            </Row>
            <Row className="mt-5 px-5">
                <Col>
                    <Link to="/">
                        Curate a new Bazaar
                    </Link>
                </Col>
            </Row>
            <Row className="fixed-bottom pb-5 mt-2">
                <Col>
                <Link to="/login">
                    <Button>
                        Login Here 
                    </Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};

export default Splash;