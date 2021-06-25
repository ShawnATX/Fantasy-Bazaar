import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import ImageChoices from "./imageChoices";
import API from "../../utils/API";

const NewCharacterImage = (props) => {
  const { handleInputChange, characterObject } = props;
  const [chosenImageFile, setChosenImageFile] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [defaultImageSelected, setDefaultImageSelected] = useState(false);

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
        setImageUploaded(true);
      })
      .catch((err) => {
        console.log("invalid image selected");
      });
  };

  const handleImageInputChange = (event) => {
    handleInputChange(event);
    setDefaultImageSelected(true);
  };

  return (
    <Container>
      {defaultImageSelected ? (
        ` `
      ) : (
        <Form.Row className="text-center">
          <Form.Group as={Col} controlId="imageUploadValidation">
            <Form.Label>Upload Your Own Image:</Form.Label>
            <Form.Control
              required
              type="file"
              name="fileInput"
              onChange={fileChangedHandler}
            />
            <Button variant="secondary" onClick={uploadHandler}>
              Upload
            </Button>
          </Form.Group>
        </Form.Row>
      )}

      {imageUploaded ? (
        <Col xs={6} md={4}>
          <Image src={characterObject.characterImage} rounded />
        </Col>
      ) : (
        <ImageChoices handleInputChange={handleImageInputChange} />
      )}
    </Container>
  );
};

export default NewCharacterImage;
