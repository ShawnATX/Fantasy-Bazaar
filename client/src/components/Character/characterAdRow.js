import React, { useEffect } from "react";
import Row from "react-bootstrap/Row";

const CharacterAdRow = () => {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  });
  // let adInit = null;
  //   useEffect(() => {
  //     adInit = setTimeout(() => {
  //       (window.adsbygoogle = window.adsbygoogle || []).push({});
  //     }, 2500);
  //     return () => {
  //       clearTimeout(adInit);
  //     };
  //   });

  return (
    <Row className='ad'>
      <ins
        className='adsbygoogle'
        style={{ display: "block" }}
        data-ad-client='ca-pub-4956647583327789'
        data-ad-slot='9176994471'
        data-ad-format='auto'
        data-full-width-responsive='true'
      />
    </Row>
  );
};

export default CharacterAdRow;
