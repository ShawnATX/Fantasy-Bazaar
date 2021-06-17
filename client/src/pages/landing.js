import React, { useContext, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../utils/userContext";

const Landing = () => {
  const { authenticationState } = useContext(UserContext);

  const history = useHistory();
  useEffect(() => {
    if (authenticationState.isAuthenticated) {
      history.push("/userhome");
    }
    //   const threeScript = document.createElement("script");
    //   threeScript.async = false;
    //   const vantaScript = document.createElement("script");
    //   vantaScript.async = true;
    //   const fogScript = document.createElement("script");
    //   threeScript.src =
    //     "https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js";
    //   vantaScript.src =
    //     "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.fog.min.js";
    //   fogScript.innerHTML = `
    //   if (window.VANTA){
    //     VANTA.FOG({
    //       el: ".app",
    //       mouseControls: true,
    //       touchControls: true,
    //       gyroControls: false,
    //       minHeight: 200.00,
    //       minWidth: 200.00,
    //       highlightColor: 0x64b61,
    //       midtoneColor: 0x1556b1,
    //       lowlightColor: 0x343452,
    //       baseColor: 0x0,
    //       blurFactor: 0.50,
    //       speed: 0.90,
    //       zoom: 2.30
    //     })
    //   }`;
    //   document.body.appendChild(threeScript);
    //   document.body.appendChild(vantaScript);
    //   document.body.appendChild(fogScript);
    //   return () => {
    //     document.body.removeChild(threeScript);
    //     document.body.removeChild(vantaScript);
    //     document.body.removeChild(fogScript);
    //   };
  }, []);

  return (
    <Container fluid={true} className="text-center">
      <h1 className="display-2">Fantasy Bazaar</h1>
      <Row className="mt-5 px-5">
        <Col>
          <Link to="/newusertype" alt="Get Started" className="text-center">
            <button className="splashBtn">Get Started</button>
          </Link>
        </Col>
      </Row>
      <Row className="mt-5 px-5">
        <Col>
          <Link to="/login">
            <button>Login Here</button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Landing;
