import React from "react";
import { Navbar, Container } from "react-bootstrap";

export default function Header() {
  return (
    <Navbar bg="primary" variant="dark" className="shadow-sm">
      <Container className="justify-content-center">
        <Navbar.Brand href="/" className="mx-auto fw-bold">
          Ukulele Band Admin
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}
