import React, { useState } from "react";
import { Container, Row, Input } from "reactstrap";
import ImageChoices from "./imageChoices";
import API from "../../utils/API";
// import { Image, CloudinaryContext } from "cloudinary-react";

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
        <Input type="file" name="fileInput" onChange={fileChangedHandler} />
        <button onClick={uploadHandler}>Upload</button>
      </Row>

      <ImageChoices handleInputChange={handleInputChange} />
    </Container>
  );
};

export default NewCharacterImage;
