import React from "react";

import {
  Navbar,
  Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
} from "reactstrap";

const NavbarComponent = (props) => {
  return (
    <Navbar dark expand="md">
      <NavbarBrand>Fantasy Bazaar</NavbarBrand>
      <Nav className="mr-auto" navbar>
        <NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Characters
            </DropdownToggle>
          </UncontrolledDropdown>
        </NavItem>
        <NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Bazaars
            </DropdownToggle>
          </UncontrolledDropdown>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default NavbarComponent;
