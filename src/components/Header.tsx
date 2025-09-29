import { useEffect, useState } from "react";
import { Navbar, Container, Nav, Offcanvas, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//components
import DynamicDiv from "./DynamicDiv";
import RoundedImage from "./images/RoundedImage";
import Informer from "../sections/Informer";

//scripts
import Admin from "../scripts/user/Admin";

//interfaces
import type User from "../interfaces/user";
import type About from "../interfaces/about";

interface headerProps{
  brand:string;
}

export default function Header({brand}:headerProps) {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  const [thisBrand, setThisBrand] = useState(brand);
  const [mouseEntered, setMouseEntered] = useState<boolean>(false);
  const [nav, setNav] = useState<number>(0);
  const [thisAdmin, setThisAdmin] = useState<Admin>();

  //Hover values state
  const [users, setUsers] = useState<User[]>([]);
  const [about, setAbout] = useState<About>();
  
  const navigate = useNavigate();

  function toggleMousePresence(){
    setMouseEntered(prev => !prev);
  }

  function nav1(){
    if(mouseEntered){
      setNav(1);
    }
  }

  function nav2(){
    if(mouseEntered){
      setNav(2);
    }
  }

  function nav3(){
    if(mouseEntered){
      setNav(3);
    }
  }

  function nav4(){
    if(mouseEntered){
      setNav(4);
    }
  }

  function nav5(){
    if(mouseEntered){
      setNav(5);
    }
  }

  function resetNav(){
    if(!mouseEntered || nav !== 0){
      setNav(0);
    }
  }

  useEffect(()=>{
    setThisBrand(brand);
  }, [brand]);

  useEffect(()=>{
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');
    const user: User | null = userString ? JSON.parse(userString) : null;
    console.log('Token:', token);
    console.log('User:', user);

    if (!token) {
      navigate('/login');
      return;
    }    
    if(user && token)(()=>{
      const admin = new Admin(user.RegID, token);
      setThisAdmin(admin);
    })();
  }, [navigate]);

  useEffect(()=>{
    if(thisAdmin)( async ()=>{
      const u = await thisAdmin.fetchAllUsers();
      const a = await thisAdmin.fetchAbout();

      setUsers(u);
      setAbout(a);
    })();
  }, [thisAdmin]);

  console.log('Userz', users);
  console.log('Aboutz', about);

  // Hide for login
  if (location.pathname === "/login") return null;

  return (
    <>
      <Navbar  variant="dark" 
               className="shadow-sm px-2 py-2" 
               style={{
                       backgroundColor:'#0000A0'
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
        <DynamicDiv className="h-100" style={{
                                              backgroundColor:'#15317E',
                                              color:'white',
                                              border:'1px solid blue'
                                            }}
                                      onMouseEnter={toggleMousePresence}
                                      onMouseLeave={toggleMousePresence}
        >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <DynamicDiv style={{
                              width:'100%',
                              height:'100%',
                              color:'white'
                            }}
          >
          <Nav className="flex-column gap-3">
            <DynamicDiv className="d-flex flex-row justify-content-between align-items-center navigation-div"
                        onMouseEnter={nav1}
                        onMouseLeave={resetNav}
            >
              <Nav.Link as={Link} to="/dashboard" onClick={() => setShowMenu(false)} className="navigation-item"
              >
                Dashboard
              </Nav.Link>
              <RoundedImage src={'/account.svg'}/>
            </DynamicDiv>
            <DynamicDiv className="d-flex flex-row justify-content-between align-items-center navigation-div"
                        onMouseEnter={nav2}
                        onMouseLeave={resetNav}            
            >
              <Nav.Link as={Link} to="/accounts" onClick={() => setShowMenu(false)} className="navigation-item">
                Accounts
              </Nav.Link>
              <RoundedImage src={'/account.svg'}/>
            </DynamicDiv>
            <DynamicDiv className="d-flex flex-row justify-content-between align-items-center navigation-div"
                        onMouseEnter={nav3}
                        onMouseLeave={resetNav}            
            >
              <Nav.Link as={Link} to="/about-contact" onClick={() => setShowMenu(false)} className="navigation-item">
                About & Contact
              </Nav.Link>
              <RoundedImage src={'/account.svg'}/>
            </DynamicDiv>
            <DynamicDiv className="d-flex flex-row justify-content-between align-items-center navigation-div"
                        onMouseEnter={nav4}
                        onMouseLeave={resetNav}            
            >
              <Nav.Link as={Link} to="/reports" onClick={() => setShowMenu(false)} className="navigation-item">
                Reports
              </Nav.Link>
              <RoundedImage src={'/account.svg'}/>
            </DynamicDiv>
            <DynamicDiv className="d-flex flex-row justify-content-between align-items-center navigation-div"
                        onMouseEnter={nav5}
                        onMouseLeave={resetNav}            
            >
              <Nav.Link as={Link} to="/feedback" onClick={() => setShowMenu(false)} className="navigation-item">
                Feedback
              </Nav.Link>
              <RoundedImage src={'/account.svg'}/>
            </DynamicDiv>
            <DynamicDiv className="d-flex flex-row justify-content-between align-items-center navigation-div">
              <Nav.Link as={Link} to="/user" onClick={() => setShowMenu(false)} className="navigation-item">
                User
              </Nav.Link>
              <RoundedImage src={'/account.svg'}/>
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

      {mouseEntered && <Informer users={users} nav={nav}/>}
    </>
  );
}
