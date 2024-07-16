import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const Header = () => (
  <Navbar bg="dark" variant="dark" expand="lg" className="header">
    <Navbar.Brand as={Link} to="/">AI Assistant</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        <Nav.Link as={Link} to="/tasks">Tasks</Nav.Link>
        <Nav.Link as={Link} to="/ai">AI Interaction</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Header;
