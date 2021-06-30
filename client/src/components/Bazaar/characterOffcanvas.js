import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";

import CharacterDetails from "./CharacterDetails";

const CharacterOffcanvas = (props) => {
  const { character, showOffCanvas, setShowOffcanvas, approvePendingChanges } =
    props;
  const handleCloseOffcanvas = () => setShowOffcanvas(false);

  return (
    <Offcanvas
      show={showOffCanvas}
      onHide={handleCloseOffcanvas}
      placement="bottom"
    >
      <Offcanvas.Header closeButton className="bg-dark-grey">
        <Offcanvas.Title className="mx-auto bg-dark-grey">
          {character.characterName} - {character.wallet} gold
        </Offcanvas.Title>
        {character.pendingApproval && (
          <Button
            variant="secondary"
            onClick={() => approvePendingChanges(character)}
          >
            Approve Pending Character Changes
          </Button>
        )}
      </Offcanvas.Header>
      <Offcanvas.Body className="bg-grey">
        <CharacterDetails
          character={character}
          approvePendingChanges={approvePendingChanges}
        />
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CharacterOffcanvas;
