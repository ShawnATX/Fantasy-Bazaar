import React, { useState } from "react";
import { A } from "hookrouter";
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
      <h1 className='display-2 mt-3'>Fantasy Bazaar</h1>
      <Row className='mt-4 px-5'>
        <Col>
          <A
            href='/newusercreds/gm'
            alt='Create a new Bazaar'
            className='text-center'
          >
            <Button className='btn-small ml-3' variant='dark'>
              Create a new Bazaar
            </Button>
          </A>
        </Col>
      </Row>
      <Form>
        <Row className='mt-5 px-5 text-center'>
          <Col md={12}>
            {validBazaarCode ? (
              <A
                href={"/newusercreds/player/" + formObject.bazaarCode}
                alt='Join a bazaar'
                className='text-center'
              >
                <Button className='btn-small ml-3' variant='secondary' active>
                  Join a bazaar
                </Button>
              </A>
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
            <A href='/' alt='Home' className='text-center'>
              <Button className='btn-small ml-3' variant='secondary'>
                Home
              </Button>
            </A>
          </Col>
        </Row>
      </Form>
      <ToastContainer className='p-4' position='top-right'>
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
