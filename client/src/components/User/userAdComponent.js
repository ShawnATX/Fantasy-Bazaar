import React, { useEffect } from "react";

const UserAd = () => {
  let adInit = null;

  useEffect(() => {
    adInit = setTimeout(() => {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }, 2500);
    return () => {
      clearTimeout(adInit);
    };
  });

  //horizontal display ad
  //   <ins class="adsbygoogle"
  //      style="display:block"
  //      data-ad-client="ca-pub-4956647583327789"
  //      data-ad-slot="9176994471"
  //      data-ad-format="auto"
  //      data-full-width-responsive="true"></ins>

  return (
    <div className='ad'>
      <ins
        className='adsbygoogle'
        style={{ display: "block" }}
        data-ad-client='ca-pub-4956647583327789'
        data-ad-slot='5697107987'
        data-ad-format='auto'
        data-full-width-responsive='true'
      />
    </div>
  );
};

export default UserAd;
