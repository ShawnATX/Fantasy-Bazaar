import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import SweetAlert from "react-bootstrap-sweetalert";
import API from "../utils/API";

const ForgotPassword = () => {
  const [formObject, setFormObject] = useState({ email: "" });
  const [sweetAlertContent, setSweetAlertContent] = useState({
    title: "",
  });
  const [showAlert, setShowAlert] = useState(false);

  const confirmAlert = () => {
    setShowAlert(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (formObject.email.length < 3) {
      return;
    } else {
      API.forgotPassword({ email: formObject.email })
        .then((res) => {
          if (res.data === "email not found") {
            setSweetAlertContent({
              title: "Womp Womp",
              value: "That email address was not found",
            });
            setShowAlert(true);
          } else if (res.data === "reset email sent") {
            setSweetAlertContent({
              title: "Success!",
              value:
                "Password reset email has been sent, please check your email box",
            });
            setShowAlert(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      {showAlert && (
        <SweetAlert
          custom
          customIcon={
            <i className='bi bi-check-lg' style={{ fontSize: "3rem" }} />
          }
          style={{ backgroundColor: "#6c757d" }}
          confirmBtnBsStyle={"secondary"}
          title={sweetAlertContent.title}
          onConfirm={confirmAlert}
          onCancel={confirmAlert}
        >
          <p>{sweetAlertContent.value} </p>
        </SweetAlert>
      )}
      <h1 className='display-2 mt-3 pb-5 text-center'> Fantasy Bazaar</h1>
      <Form className='mt-5' onSubmit={handleFormSubmit}>
        <Row className='text-center pt-5'>
          <Col
            sm={{ span: 8, offset: 2 }}
            md={{ span: 8, offset: 2 }}
            lg={{ span: 6, offset: 3 }}
          >
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
        </Row>
        <Row>
          <Col xs={12} className='d-flex justify-content-center'>
            <Button className='btn-small' variant='secondary' type='submit'>
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default ForgotPassword;
