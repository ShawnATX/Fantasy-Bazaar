import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Dropdown from "react-bootstrap/Dropdown";

const NavbarComponent = (props) => {
  const {
    characters,
    bazaars,
    goToCharacterHome,
    goToBazaarHome,
    handleLogout,
    history,
    setPageState,
  } = props;

  const userHome = () => {
    history.push("/userhome");
    setPageState("user");
  };

  return (
    <Navbar collapseOnSelect variant='dark' expand='sm'>
      <Navbar.Brand>Fantasy Bazaar</Navbar.Brand>
      <Navbar.Toggle aria-controls='user-navbar-nav' />
      <Navbar.Collapse id='user-navbar-nav'>
        <Nav className='me-auto'>
          <NavDropdown id='nav-dropdown-chracters' title='Characters'>
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
          <NavDropdown id='nav-dropdown-bazaars' title='Bazaars'>
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
        </Nav>
        <Nav>
          <NavDropdown title='User Menu' className='nav-user'>
            <NavDropdown.Item key={"Home"} onClick={() => userHome()}>
              User Home
            </NavDropdown.Item>
            <NavDropdown.Item key={"User"}>User Settings</NavDropdown.Item>
            <Dropdown.Divider />
            <NavDropdown.Item key={"logout"} onClick={handleLogout}>
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
