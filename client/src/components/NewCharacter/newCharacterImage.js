import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import ImageChoices from "./imageChoices";
import API from "../../utils/API";

const NewCharacterImage = (props) => {
  const { handleInputChange, characterObject } = props;
  const [chosenImageFile, setChosenImageFile] = useState(null);
  const [imageSet, setImageSet] = useState(false);

  const fileChangedHandler = (event) => {
    setChosenImageFile(event.target.files[0]);
  };

  const uploadHandler = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("file", chosenImageFile);
    formData.append("timestamp", Date.now() / 1000 || 0);
    formData.append("upload_preset", "FantasyBazaarCharacters");
    API.uploadImage(formData)
      .then((res) => {
        characterObject.characterImage = res.eager[0].secure_url;
        setImageSet(true);
      })
      .catch((err) => {
        console.log("invalid image selected");
      });
  };

  const handleImageInputChange = (event) => {
    handleInputChange(event);
    setImageSet(true);
  };

  const changeImage = () => {
    characterObject.characterImage = "";
    setImageSet(false);
  };

  return (
    <Container>
      {imageSet ? (
        <Row className='text-center'>
          <Col
            xs={{ span: 6, offset: 3 }}
            md={{ span: 4, offset: 4 }}
            lg={{ span: 4, offset: 4 }}
          >
            <Image
              src={characterObject.characterImage}
              rounded
              className='img-fluid'
            />
            <Button
              variant='secondary'
              className='btn-small ml-3'
              onClick={changeImage}
            >
              Choose a different image
            </Button>
          </Col>
        </Row>
      ) : (
        <Row className='text-center'>
          <Form.Group as={Col} controlId='imageUploadValidation'>
            <Form.Label>Upload Your Own Image:</Form.Label>
            <Form.Control
              required
              type='file'
              name='fileInput'
              onChange={fileChangedHandler}
            />
            <Button variant='secondary' onClick={uploadHandler}>
              Upload
            </Button>
          </Form.Group>
          <ImageChoices handleInputChange={handleImageInputChange} />
        </Row>
      )}
    </Container>
  );
};

export default NewCharacterImage;
