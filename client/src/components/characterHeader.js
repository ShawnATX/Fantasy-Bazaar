import React, { useEffect } from "react";
import { Row, Col } from "reactstrap";

function CharacterHeader(props) {
  const { characterInfo } = props;

  useEffect(() => {}, []);
  return (
    <Row className="border p-1 mb-3 text-center sticky-top playerHeader">
      <Col
        className="text-center p-0 mx-2 mh-50 "
        sm={{ size: 8, offset: 2 }}
        md={{ size: 6, offset: 3 }}
        lg={{ size: 5, offset: 3 }}
      >
        <Row className="mx-0">
          <Col
            sm={{ size: 8, offset: 2 }}
            md={{ size: 6, offset: 3 }}
            lg={{ size: 5, offset: 3 }}
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
