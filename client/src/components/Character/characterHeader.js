import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function CharacterHeader(props) {
  const { characterInfo } = props;

  return (
    <Row className="border p-1 mb-3 text-center sticky-top">
      <Col
        className="text-center p-0 mx-2 mh-50"
        sm={{ span: 6, offset: 3 }}
        md={{ span: 6, offset: 3 }}
        lg={{ span: 5, offset: 3 }}
      >
        <Row className="mx-0">
          <Col
            sm={{ span: 6, offset: 3 }}
            md={{ span: 6, offset: 3 }}
            lg={{ span: 5, offset: 3 }}
          >
            <img
              src={characterInfo.characterImage}
              alt="Character Portrait"
              className="img-fluid mx-auto"
            />
          </Col>
        </Row>
        {characterInfo.characterName}
      </Col>
      <Col className="text-center p-0 mx-2">
        <Row className="mx-0 mt-2">
          <Col className="justify-center mt-5">
            {characterInfo.wallet}
            {/* <Animate
                                animate="false"
                                change="bounce"
                                durationChange={1200}
                                component="span"
                                // animateChangeIf={(spendMoney)}
                            > */}
            <img
              className="img-fluid w-25 ml-1 mb-1"
              src="./gold-coin-icon.png"
              alt="gold coins"
            />
            {/* </Animate> */}
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default CharacterHeader;