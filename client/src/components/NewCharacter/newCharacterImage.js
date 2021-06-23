import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ImageChoices from "./imageChoices";
import API from "../../utils/API";

const NewCharacterImage = (props) => {
  const { handleInputChange, characterObject } = props;
  const [chosenImageFile, setChosenImageFile] = useState(null);

  const fileChangedHandler = (event) => {
    setChosenImageFile(event.target.files[0]);
  };

  const uploadHandler = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("file", chosenImageFile);
    formData.append("timestamp", Date.now() / 1000 || 0);
    formData.append("upload_preset", "FantasyBazaarCharacters");
    API.uploadImage(formData, characterObject);
  };

  return (
    <Container>
      <Row>
        <legend>Upload Your Own Image:</legend>
        <Form.Control
          type="file"
          name="fileInput"
          onChange={fileChangedHandler}
        />
        <Button variant="secondary" onClick={uploadHandler}>
          Upload
        </Button>
      </Row>

      <ImageChoices handleInputChange={handleInputChange} />
    </Container>
  );
};

export default NewCharacterImage;
