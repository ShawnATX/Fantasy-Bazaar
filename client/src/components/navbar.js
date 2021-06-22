import React from "react";

import {
  Navbar,
  Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const NavbarComponent = (props) => {
  const { characters, bazaars, goToCharacterHome, goToBazaarHome } = props;
  return (
    <Navbar dark expand="md">
      <NavbarBrand>Fantasy Bazaar</NavbarBrand>
      <Nav className="mr-auto" navbar>
        <NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Characters
            </DropdownToggle>
            <DropdownMenu>
              {characters.map((character) => (
                <DropdownItem
                  key={character._id}
                  onClick={() => {
                    goToCharacterHome(character);
                  }}
                >
                  {character.characterName}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledDropdown>
        </NavItem>
        <NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Bazaars
            </DropdownToggle>
            <DropdownMenu>
              {bazaars.map((bazaar) => (
                <DropdownItem
                  key={bazaar._id}
                  onClick={() => {
                    goToBazaarHome(bazaar);
                  }}
                >
                  {bazaar.bazaarName}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledDropdown>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default NavbarComponent;
