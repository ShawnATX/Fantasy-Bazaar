import React, { useState, useEffect } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";

import CharacterDetails from "./CharacterDetails";

const CharacterOffcanvas = (props) => {
  const { character, showOffCanvas, setShowOffcanvas, approvePendingChanges } =
    props;

  useEffect(() => {}, [character]);
  const handleCloseOffcanvas = () => setShowOffcanvas(false);

  return (
    <Offcanvas
      show={showOffCanvas}
      onHide={handleCloseOffcanvas}
      placement="bottom"
    >
      <Offcanvas.Header closeButton className="bg-grey">
        <Offcanvas.Title className="mx-auto bg-grey">
          <h3 className="bg-grey">
            {character.characterName} - {character.wallet} gold
          </h3>
        </Offcanvas.Title>
        {character.pendingApproval && (
          <Button
            variant="secondary bg-dark-grey"
            onClick={() => approvePendingChanges(character)}
          >
            Approve Pending Character Changes
          </Button>
        )}
      </Offcanvas.Header>
      <Offcanvas.Body className="bg-dark-grey">
        <CharacterDetails
          character={character}
          approvePendingChanges={approvePendingChanges}
        />
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CharacterOffcanvas;
