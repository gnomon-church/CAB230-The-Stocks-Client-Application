import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

// navigation links
export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">Stock Prices</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>

            <NavItem>
              <NavLink href="/stocks">Stocks</NavLink>
            </NavItem>

            <NavItem>
              <NavLink href="/quote">Quote</NavLink>
            </NavItem>

            <NavItem>
              <NavLink href="/pricehistory">Price History</NavLink>
            </NavItem>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Account
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Login</DropdownItem>
                <DropdownItem>Register</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
