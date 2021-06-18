import React, { useState, useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import UserContext from "../utils/userContext";
import {
  Container,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Button,
} from "reactstrap";
import { useAlert } from "react-alert";
import API from "../utils/API";
import NewCharacterMain from "../components/NewCharacter/newCharacterMain";
import NewCharacterEquipment from "../components/NewCharacter/newCharacterEquipment";

function NewCharacter(props) {
  const { authenticationState } = useContext(UserContext);
  const [characterObject, setCharacterObject] = useState({
    wallet: 0,
    characterName: "",
  });
  const [bazaarObject, setBazaarObject] = useState({});
  const [pageState, setPageState] = useState("Main");
  const history = useHistory();
  const alert = useAlert();
  const bazaarCode = new URLSearchParams(useLocation().search).get("bazaar");
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  useEffect(() => {
    getBazaarDeets(bazaarCode);
  }, []);

  const getBazaarDeets = (bazaarCode) => {
    console.log("get deets");
    if (bazaarCode) {
      API.getBazaar(bazaarCode)
        .then((res) => {
          setBazaarObject({
            name: res.data.name,
            system: res.data.system,
            id: res.data.id,
          });
        })
        .catch((err) => console.log(err));
    } else {
      setModal(true);
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
            });
            toggle();
          }
        })
        .catch((err) => {
          alert.show("Bazaar not found");
        });
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
    <Container className="text-center">
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader>
          Enter the Join Code for the bazaar you wish to join
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Input
              name="bazaarCode"
              id="bazaarCode"
              placeholder="Bazaar Join Code"
              onChange={handleBazaarCodeInput}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Save
          </Button>{" "}
          <Button color="secondary" onClick={() => history.push("/userhome")}>
            Back Home
          </Button>
        </ModalFooter>
      </Modal>
      {renderPage()}
    </Container>
  );
}

export default NewCharacter;
