import React, { useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import API from "../utils/API";

function NewUserType() {
  const [formObject, setFormObject] = useState({});
  const [validBazaarCode, setValidBazaarCode] = useState(false);
  const [showToast, setShowToast] = useState(false);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
    if (value.length === 8) {
      API.getBazaar(value)
        .then((res) => {
          if (res.data) {
            setValidBazaarCode(true);
          }
        })
        .catch((err) => {
          setShowToast(true);
        });
    } else {
      setValidBazaarCode(false);
    }
  }

  return (
    <Container className='text-center'>
      <Row className='mt-5 px-5'>
        <Col>
          <Link
            to='/newusercreds/gm'
            alt='Create a new Bazaar'
            className='text-center'
          >
            <Button className='btn-small ml-3' variant='dark'>
              Create a new Bazaar
            </Button>
          </Link>
        </Col>
      </Row>
      <Form>
        <Row className='mt-5 px-5 text-center'>
          <Col md={12}>
            {validBazaarCode ? (
              <Link
                to={"/newusercreds/player?bazaar=" + formObject.bazaarCode}
                alt='Join a bazaar'
                className='text-center'
              >
                <Button className='btn-small ml-3' variant='secondary' active>
                  Join a bazaar
                </Button>
              </Link>
            ) : (
              <Button className='btn-small ml-3' variant='secondary' disabled>
                Join a bazaar
              </Button>
            )}
            <Col
              md={{ span: 8, offset: 2 }}
              lg={{ span: 6, offset: 3 }}
              className='my-3'
            >
              <Form.Group>
                <Form.Control
                  name='bazaarCode'
                  id='bazaarCode'
                  placeholder='Bazaar Join Code'
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Col>
        </Row>
        <Row className='text-center'>
          <Col>
            <Link to='/' alt='Home' className='text-center'>
              <Button className='btn-small ml-3' variant='secondary'>
                Home
              </Button>
            </Link>
          </Col>
        </Row>
      </Form>
      <ToastContainer className='p-4' position='top-center'>
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3200}
          autohide
        >
          <Toast.Header className='bg-dark-grey'>
            <strong className='me-auto bg-dark-grey'>Uh Oh!</strong>
          </Toast.Header>
          <Toast.Body className='me-auto bg-grey'>
            It appears that an invalid Bazaar join code was entered
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
}

export default NewUserType;
