import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../utils/userContext";
import { useAlert } from "react-alert";
import API from "../utils/API";
import bazaarImg from "../images/bazaar.jpg";
import { Container } from "reactstrap";

const GmHome = () => {
  const { authenticationState } = useContext(UserContext);
  const [gmObject, setGmObject] = useState({});
  const [bazaarObject, setbazaarObject] = useState({});
  const history = useHistory();
  const alert = useAlert();

  useEffect(() => {
    if (
      !authenticationState.isAuthenticated ||
      !authenticationState.user.type === "GM"
    ) {
      history.push("/login");
    } else {
      alert.show("Not currently logged in as a GM");
      console.log(authenticationState);
      API.getBazaarId(authenticationState.user.bazaars[0])
        .then((res) => {
          console.log(res);
          setbazaarObject(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      setGmObject(authenticationState.user);
    }
  }, []);

  const handleLogout = () => {
    API.logoutUser().then((res) => {
      if (res.status === 200) {
        authenticationState.userHasAuthenticated({
          isAuthenticated: false,
          user: {},
        });
        history.push("/");
      } else {
        alert.show("Weird logout error happening...");
      }
    });
  };

  return (
    <div>
      <Container fluid={true}>
        <img className="img-fluid" src={bazaarImg} alt="Bazaar" />
        {gmObject.userName}
        <br />
        <br />
        <p className="text-center">Player Join Code: {bazaarObject.joinCode}</p>
        <ul>
          <p>Players:</p>
          {console.log(bazaarObject)}
          {bazaarObject.players
            ? bazaarObject.players.map((player) => {
                return <li>(player)</li>;
              })
            : "No Players"}
        </ul>
      </Container>

      <button onClick={() => handleLogout()}>Logout</button>
    </div>
  );
};

export default GmHome;
