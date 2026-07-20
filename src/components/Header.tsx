import { useEffect, useState } from "react";
import { Navbar, Container, Nav, Offcanvas, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//components
import DynamicDiv from "./DynamicDiv";
import RoundedImage from "./images/RoundedImage";
// import Informer from "../sections/Informer";
import DynamicP from "./p/DynamicP";

//scripts
import Admin from "../scripts/user/Admin";

//interfaces
import type User from "../interfaces/user";
import type About from "../interfaces/about";
// import type Inventory from "../interfaces/inventory";
import type Feedback from "../interfaces/feedback";
interface headerProps {
  brand: string;
}

export default function Header({ brand }: headerProps) {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  const [thisBrand, setThisBrand] = useState(brand);
  const [thisAdmin, setThisAdmin] = useState<Admin>();
  const [feed, setFeed] = useState<Feedback[]>([]);

  //Hover values state
  const [users, setUsers] = useState<User[]>([]);
  const [about, setAbout] = useState<About>();

  const navigate = useNavigate();

  useEffect(() => {
    setThisBrand(brand);
  }, [brand]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');
    const user: User | null = userString ? JSON.parse(userString) : null;
    console.log('Token:', token);
    console.log('User:', user);

    if (!token) {
      navigate('/login');
      return;
    }
    if (user && token) (() => {
      const admin = new Admin(user.regid as number, token);
      setThisAdmin(admin);
    })();
  }, [navigate]);

  useEffect(() => {
    if (thisAdmin) (async () => {
      const u = await thisAdmin.fetchAllUsers();
      const a = await thisAdmin.fetchAbout();
      // const i = await thisAdmin.fetchInventory();
      const f: Feedback[] = await thisAdmin.fetchFeedback();

      setUsers(u);
      setAbout(a);
      // setStore(i);
      setFeed(f);
    })();
  }, [thisAdmin]);

  console.log('Userz', users);
  console.log('Aboutz', about);
  console.log(feed);


  // Hide for login
  if (location.pathname === "/login") return null;

  return (
    <>
      <Navbar variant="dark"
        className="px-2 py-2 shadow-sm"
        style={{
          backgroundColor: '#0000A0'
        }}
        expand={true}>
        <Container className="align-items-center justify-content-between">
          <Navbar.Brand href="/" className="brand fw-bold">
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
        <DynamicDiv className="h-100" style={{
          backgroundColor: '#15317E',
          color: 'white',
          border: '1px solid blue'
        }}

        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title><DynamicP text="Menu" className="menu-text" /></Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <DynamicDiv style={{
              width: '100%',
              height: '100%',
              color: 'white'
            }}
            >
              <Nav className="flex-column gap-3">
                <DynamicDiv className="align-items-center d-flex flex-row justify-content-between navigation-div"
                // onMouseEnter={nav1}
                // onMouseLeave={resetNav}
                >
                  <Nav.Link as={Link} to="/dashboard" onClick={() => setShowMenu(false)} className="navigation-item"
                  >
                    <DynamicP text="Dashboard" className="menu-item-text" />
                  </Nav.Link>
                  <RoundedImage src={'/account.svg'} />
                </DynamicDiv>
                <DynamicDiv className="align-items-center d-flex flex-row justify-content-between navigation-div"
                // onMouseEnter={nav2}
                // onMouseLeave={resetNav}            
                >
                  <Nav.Link as={Link} to="/accounts" onClick={() => setShowMenu(false)} className="navigation-item">
                    <DynamicP text="Accounts" className="menu-item-text" />
                  </Nav.Link>
                  <RoundedImage src={'/account.svg'} />
                </DynamicDiv>
                <DynamicDiv className="align-items-center d-flex flex-row justify-content-between navigation-div"
                // onMouseEnter={nav3}
                // onMouseLeave={resetNav}            
                >
                  <Nav.Link as={Link} to="/about-contact" onClick={() => setShowMenu(false)} className="navigation-item">
                    <DynamicP text="About & Contact" className="menu-item-text" />
                  </Nav.Link>
                  <RoundedImage src={'/account.svg'} />
                </DynamicDiv>
                <DynamicDiv className="align-items-center d-flex flex-row justify-content-between navigation-div"
                // onMouseEnter={nav4}
                // onMouseLeave={resetNav}            
                >
                  <Nav.Link as={Link} to="/reports" onClick={() => setShowMenu(false)} className="navigation-item">
                    <DynamicP text="Reports" className="menu-item-text" />
                  </Nav.Link>
                  <RoundedImage src={'/account.svg'} />
                </DynamicDiv>
                <DynamicDiv className="align-items-center d-flex flex-row justify-content-between navigation-div"
                // onMouseEnter={nav5}
                // onMouseLeave={resetNav}            
                >
                  <Nav.Link as={Link} to="/feedback" onClick={() => setShowMenu(false)} className="navigation-item">
                    <DynamicP text="Feedback" className="menu-item-text" />
                  </Nav.Link>
                  <RoundedImage src={'/account.svg'} />
                </DynamicDiv>
              </Nav>
            </DynamicDiv>
          </Offcanvas.Body>
        </DynamicDiv>
      </Offcanvas>
      {
        showMenu && <Offcanvas>
          <DynamicDiv>
            We're really here man
          </DynamicDiv>
        </Offcanvas>
      }

      {/* {
        mouseEntered && <Informer users={users} 
                                  nav={nav}
                                  store={store}
                                  about={about}
                                  feedback={feed}

                        />
      } */}
    </>
  );
}
