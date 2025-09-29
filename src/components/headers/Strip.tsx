import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//components
import DynamicDiv from "../DynamicDiv";
import DynamicP from "../p/DynamicP";
import RoundedImage from "../images/RoundedImage";

//sections
import Profile from "../../sections/Profile";
import EditProfile from "../../sections/EditProfile";
import SwitchUser from "../../sections/SwitchUser";

//scripts
import Admin from "../../scripts/user/Admin";

//interface
import type User from "../../interfaces/user";
interface StripProps{
    title:string;
}

function Strip({title}:StripProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModal2, setShowModal2] = useState<boolean>(false);
  const [showModal3, setShowModal3] = useState<boolean>(false);
  const [thisAdmin, setThisAdmin] = useState<Admin>();
  const [userData, setUserData] = useState<User>();
  const navigate = useNavigate();

  function toggleModal() {
    setShowModal(prev => !prev);
  }

  function toggleModalTwo() {
    setShowModal2(prev => !prev);
  }

  function toggleModalThree() {
    setShowModal3(prev => !prev);
  }

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
    const userString = localStorage.getItem('user');
    const user: User | null = userString ? JSON.parse(userString) : null;
    if(thisAdmin && user)(async ()=>{
      const loggedAdmin:User = await thisAdmin.loggedInAdmin(user.RegID);
      console.log('Logged in admin:', loggedAdmin);
      setUserData(loggedAdmin);
    })();
  }, [thisAdmin]);

  return (
    <>
      <DynamicDiv style={{
                          color:'#FFFFFF',
                          height:'70px',
                          backgroundColor:'#15317E'
                        }}
                  className="d-flex flex-row justify-content-between align-items-center w-100 px-3"
      >
        <DynamicDiv className="d-flex flex-column justify-content-center align-items-center bg-white rounded-circle"
                    onClick={toggleModal}
                    style={{
                            height:'30px',
                            width:'30px',
                            cursor:'pointer'
                          }}  
        > 
          <RoundedImage style={{
                                height:'40px',
                                width:'40px',
                                color:'white',
                                backgroundColor:'white'
                              }}
                        src={'/account.svg'}
          />
        </DynamicDiv>
        <DynamicP text={title}/>
        <DynamicDiv className="d-flex flex-column justify-content-center align-items-center bg-white rounded-circle"
                    onClick={toggleModal}
                    style={{
                            height:'40px',
                            width:'40px',
                            cursor:'pointer'
                          }}  
        > 
          <RoundedImage style={{
                                height:'40px',
                                width:'40px'
                              }}
                        src={'/vite.svg'}
          />
        </DynamicDiv>
      </DynamicDiv>
      {showModal && <Profile user={userData} 
                             callback1={toggleModal}
                             callback2={toggleModalTwo}
                             callback3={toggleModalThree}
                    />
      }

      {showModal2 && <EditProfile/>
      }

      {showModal3 && <SwitchUser/>}
    </>
  )
}

export default Strip