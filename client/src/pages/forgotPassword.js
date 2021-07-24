import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import API from "../utils/API";

const ForgotPassword = () => {
  const [formObject, setFormObject] = useState({ email: null });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (formObject.email === null || formObject.email.length() < 3) {
      return;
    } else {
      API.forgotPassword({ email: formObject.email })
        .then((res) => {
          if (res.data === "email not found") {
            //@TODO alert user email not found
          } else if (res.data === "reset email sent") {
            //@TODO alert user email sent, check email for reset link
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <h1 className='display-2 mt-3 pb-5 text-center'> Fantasy Bazaar</h1>
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
  );
};

export default ForgotPassword;
