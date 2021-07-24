import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import API from "../utils/API";


const PasswordReset = (props) => {
    const [formObject, setFormObject] = useState({ email: '' });
    const [userObject, setUserObject] = useState({});

    useEffect(() => {
        validateTokenx();
    })

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  };

  const validateTokenx = () => {
      API.getTokenUser(props.token)
      .then((res) => console.log(res));
  }


  return (
      <>
        <h1 className='display-2 mt-3 pb-5 text-center'> Fantasy Bazaar</h1>
        <h4 className='display-4 mt-0 pb-3 text-center'>
            Choose a new password
        </h4>
        <Form className='mt-5' onSubmit={handleFormSubmit}>
        <Row className='text-center pt-5'>
          <Col md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
            <Form.Group className='mb-4'>
              <Form.Control
                type='email'
                name='email'
                id='email'
                placeholder='Email Address'
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Button
            className='btn-small float-end'
            variant='secondary'
            type='submit'
          >
            Submit
          </Button>
        </Row>
      </Form>
      </>
  )
}

export default PasswordReset;