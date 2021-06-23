import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

const NavbarComponent = (props) => {
  const { characters, bazaars, goToCharacterHome, goToBazaarHome } = props;
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>Fantasy Bazaar</Navbar.Brand>
      <Nav className="mr-auto" navbar>
        <Nav.Item>
          <NavDropdown id="nav-dropdown-chracters" title="Characters">
            {characters.map((character) => (
              <NavDropdown.Item
                key={character._id}
                onClick={() => {
                  goToCharacterHome(character);
                }}
              >
                {character.characterName}
              </NavDropdown.Item>
            ))}
          </NavDropdown>
        </Nav.Item>
        <Nav.Item>
          <NavDropdown id="nav-dropdown-bazaars" title="Bazaars">
            {bazaars.map((bazaar) => (
              <NavDropdown.Item
                key={bazaar._id}
                onClick={() => {
                  goToBazaarHome(bazaar);
                }}
              >
                {bazaar.bazaarName}
              </NavDropdown.Item>
            ))}
          </NavDropdown>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default NavbarComponent;
