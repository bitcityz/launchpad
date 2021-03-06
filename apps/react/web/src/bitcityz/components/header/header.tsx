import React from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';

const Header: React.FC = () => {
  return (
    <header className="w-100 sticky">
      <Navbar expand="xl">
        <Container>
          <Navbar.Brand href="/">
            <img className="d-inline-block align-top" alt="logo" src="/assets/img/launch/logo.svg" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Launchpad</Nav.Link>
              <Nav.Link href="/launchpool">Launchpool</Nav.Link>
              <Nav.Link href="/github">Github</Nav.Link>
              <Nav.Link href="/document">Document</Nav.Link>
            </Nav>
            <Button variant="primary" className="btn-connect-wallet mt-lg-3">
              <img className="btn--icon" src="/assets/icons/icon-wallet.svg" /> Connect wallet
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
