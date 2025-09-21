import { useEffect, useState } from "react";
import { Navbar, Container, Nav, Offcanvas, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

//components
import DynamicDiv from "./DynamicDiv";

interface headerProps{
  brand:string;
}

export default function Header({brand}:headerProps) {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
const [thisBrand, setThisBrand] = useState(brand);
useEffect(()=>{
  setThisBrand(brand);
}, [brand]);

  // Hide for login
  if (location.pathname === "/login") return null;

  return (
    <>
      <Navbar  variant="dark" 
               className="shadow-sm px-2 py-2" 
               style={{
                       backgroundColor:'#153E7E'
                     }}   
               expand={true}>
        <Container className="justify-content-between align-items-center">
          <Navbar.Brand href="/" className="fw-bold">
            {thisBrand}
          </Navbar.Brand>

          {/* Hamburger Button */}
          <Button
            variant="outline-light"
            onClick={() => setShowMenu(true)}
            aria-label="Toggle menu"
          >
            <span className="navbar-toggler-icon"></span>
          </Button>
        </Container>
      </Navbar>

      {/* Offcanvas Menu */}
      <Offcanvas
        show={showMenu}
        onHide={() => setShowMenu(false)}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/dashboard" onClick={() => setShowMenu(false)}>
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/accounts" onClick={() => setShowMenu(false)}>
              Accounts
            </Nav.Link>
            <Nav.Link as={Link} to="/about-contact" onClick={() => setShowMenu(false)}>
              About & Contact
            </Nav.Link>
            <Nav.Link as={Link} to="/reports" onClick={() => setShowMenu(false)}>
              Reports
            </Nav.Link>
            <Nav.Link as={Link} to="/feedback" onClick={() => setShowMenu(false)}>
              Feedback
            </Nav.Link>
            <Nav.Link as={Link} to="/user" onClick={() => setShowMenu(false)}>
              User
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
      {
        showMenu && <Offcanvas>
                      <DynamicDiv>
                        We're really here man
                      </DynamicDiv>
                    </Offcanvas>
      }
    </>
  );
}
