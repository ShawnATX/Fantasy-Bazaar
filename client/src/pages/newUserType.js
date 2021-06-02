import React, { useState, useContext, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useAlert } from "react-alert";
import UserContext from "../utils/userContext";
import {
  Container,
  FormGroup,
  Form,
  Label,
  Input,
  Row,
  Col,
  Button,
} from "reactstrap";
import API from "../utils/API";

function NewUserType() {
  const { authenticationState } = useContext(UserContext);
  const [formObject, setFormObject] = useState({});
  const [validBazaarCode, setValidBazaarCode] = useState(false);
  const history = useHistory();
  const alert = useAlert();

  useEffect(() => {
    if (authenticationState.isAuthenticated) {
      history.push("/playerhome");
    }
  }, [authenticationState]);

  function handleFormSubmit(event) {
    event.preventDefault();
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
    // if bazaarCode == {join code length} => check bazaar code API to validate and then activate the 'join' button
    if (value.length === 8) {
      API.getBazaar(value)
        .then((res) => {
          if (res.data) {
            setValidBazaarCode(true);
          }
        })
        .catch((err) => {
          alert.show("Bazaar not found");
        });
    } else {
      setValidBazaarCode(false);
    }
  }

  return (
    <Container>
      <Row className="mt-5 px-5">
        <Col>
          <Link
            to="/newusercreds/gm"
            alt="Create a new Bazaar"
            className="text-center"
          >
            <Button className="splashBtn">Create a new Bazaar</Button>
          </Link>
        </Col>
      </Row>
      <Form onSubmit={handleFormSubmit}>
        <Row className="mt-5 px-5 text-center">
          <Col>
            {validBazaarCode ? (
              <Link
                to={"/newusercreds/player/" + formObject.bazaarCode}
                alt="Create a new Bazaar"
                className="text-center"
              >
                <Button size="lg" active>
                  Join a bazaar
                </Button>
              </Link>
            ) : (
              <Button size="lg" disabled>
                Join a bazaar
              </Button>
            )}

            <FormGroup>
              <Input
                name="bazaarCode"
                id="bazaarCode"
                placeholder="Bazaar Join Code"
                onChange={handleInputChange}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            <Link to="/" alt="Home" className="text-center">
              <Button className="splashBtn">Home</Button>
            </Link>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default NewUserType;
