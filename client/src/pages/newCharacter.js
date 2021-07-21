import React, { useState, useContext, useEffect } from "react";
import { A } from "hookrouter";
import UserContext from "../utils/userContext";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import API from "../utils/API";
import NewCharacterMain from "../components/NewCharacter/newCharacterMain";
import NewCharacterEquipment from "../components/NewCharacter/newCharacterEquipment";

function NewCharacter(props) {
  const { authenticationState } = useContext(UserContext);
  const [characterObject, setCharacterObject] = useState({
    wallet: 0,
    characterName: "",
    characterImage: "",
  });
  const [bazaarObject, setBazaarObject] = useState({});
  const [pageState, setPageState] = useState("Main");
  const [showModal, setShowModal] = useState(false);
  const toggle = () => setShowModal(!showModal);

  useEffect(() => {
    getBazaarDeets(props.bazaarCode);
    if (props.bazaarcode) {
      console.log(props.bazaarcode);
    }
  }, []);

  const getBazaarDeets = (bazaarCode) => {
    if (props.bazaarCode) {
      API.getBazaar(bazaarCode)
        .then((res) => {
          console.log(res.data);
          setBazaarObject({
            name: res.data.name,
            system: res.data.system,
            id: res.data.id,
            limitedInventory: res.data.limitedInventory,
            requireNewCharacterApproval: res.data.requireNewCharacterApproval,
            requireCustomItemApproval: res.data.requireCustomItemApproval,
          });
        })
        .catch((err) => console.log(err));
    } else {
      setShowModal(true);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCharacterObject({ ...characterObject, [name]: value });
  };

  const handleBazaarCodeInput = (event) => {
    const { value } = event.target;
    if (value.length === 8) {
      API.getBazaar(value)
        .then((res) => {
          if (res.data) {
            setBazaarObject({
              name: res.data.name,
              system: res.data.system,
              id: res.data.id,
              limitedInventory: res.data.limitedInventory,
              requireNewCharacterApproval: res.data.requireNewCharacterApproval,
              requireCustomItemApproval: res.data.requireCustomItemApproval,
            });
            toggle();
          }
        })
        .catch((err) => {});
    }
  };

  const renderPage = () => {
    if (pageState === "Main") {
      return (
        <NewCharacterMain
          setPageState={setPageState}
          handleInputChange={handleInputChange}
          bazaarName={bazaarObject.name}
          characterObject={characterObject}
        />
      );
    } else if (pageState === "Equipment") {
      return (
        <NewCharacterEquipment
          setPageState={setPageState}
          bazaarObject={bazaarObject}
          API={API}
          characterObject={characterObject}
          authenticationState={authenticationState}
        />
      );
    }
  };

  return (
    <Container className='text-center'>
      <Modal show={showModal}>
        <ModalHeader>
          Enter the Join Code for the bazaar you wish to join
        </ModalHeader>
        <ModalBody>
          <Form.Group>
            <Form.Control
              name='bazaarCode'
              id='bazaarCode'
              placeholder='Bazaar Join Code'
              onChange={handleBazaarCodeInput}
            />
          </Form.Group>
        </ModalBody>
        <ModalFooter>
          <A href='/'>
            <Button variant='dark'>Back Home</Button>
          </A>
        </ModalFooter>
      </Modal>
      {renderPage()}
    </Container>
  );
}

export default NewCharacter;
