import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card } from "react-bootstrap";

//scripts
import Admin from "../scripts/user/Admin";

//components 
import Header from "../components/Header";
import UserCard from "../components/UserCard";
import Skeleton from "../components/Skeleton copy";
import Strip from "../components/headers/Strip";
import Ribz from "../components/Ribz";
import DynamicDiv from "../components/DynamicDiv";
import DynamicButton from "../components/buttons/DynamicButton";
import RegModal from "../components/modals/RegModal";
import DynamicP from "../components/p/DynamicP";

import type User from '../interfaces/user';

export default function Dashboard() {
  const [pending, setPending] = useState<User[]>([]);
  const [approved, setApproved] = useState<User[]>([]);
  const [inactive, setInactive] = useState<User[]>([]);
  const [thisAdmin, setThisAdmin] = useState<Admin>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigate = useNavigate();

  function toggleModal(){
    if(showModal === true){
      setShowModal(false);
    } else{
      setShowModal(true);
    }
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

  // Fetch data from API
  useEffect(() => {
    if(thisAdmin)(async () => {
      try {

        const allPend:User[] = await thisAdmin.fetchPendingUsers(); 
        const allApproved:User[] = await thisAdmin.fetchApprovedUsers();
        const allInactive:User[] = await thisAdmin.fetchInactiveUsers();

        setPending(allPend);
        setApproved(allApproved);
        setInactive(allInactive);

        console.log('Pending Users:', allPend);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    })();
  }, [thisAdmin]);

  // Memoized rendering of user lists
  const pendingList = useMemo(
    () =>
      pending.map((user, idx) => (
        <UserCard
          key={idx}
          name={user.Name}
          email={user.Email}
          buttonText="Approve"
          buttonVariant="success"
          onAction={() => thisAdmin? thisAdmin.approveUser(user.RegID) : console.error('No Logged in Admin')}
        />
      )),
    [pending, thisAdmin]
  );

  const approvedList = useMemo(
    () =>
      approved.map((user, idx) => (
        <UserCard
          key={idx}
          name={user.Name}
          email={user.Email}
          buttonText="Deactivate"
          buttonVariant="danger"
          onAction={() => thisAdmin? thisAdmin.deactivateUser(user.RegID) : console.error('No Logged in Admin')}
        />
      )),
    [approved, thisAdmin]
  );

  const inactiveList = useMemo(
    () =>
      inactive.map((user, idx) => (
        <UserCard
          key={idx}
          name={user.Name}
          email={user.Email}
          buttonText="Reactivate"
          buttonVariant="warning"
          onAction={() => thisAdmin? thisAdmin.reactivateUser(user.RegID) : console.error('No Logged in Admin')}
        />
      )),
    [inactive, thisAdmin]
  );

  return (
    <Skeleton>
      <Strip title="Ukulele Band Admin Module"/>
      <DynamicDiv className="d-flex flex-row justify-content-between align-items-center px-6"
                  style={{
                          height:'100px',
                          width:'98.5%',
                          border:'1px solid white'
                        }}    
      >
        <Ribz style={{
                      height:'100px',
                      borderRadius:'10px'
                    }}
              className="justify-content-between align-items-center mx-2"
        >
              
          <Header brand="Dashboard" />
          <DynamicDiv style={{
                              height:'70px',
                              width:'300px',
                              color:'#2554C7',
                              backgroundColor:'#FFFFFF',
                              marginLeft:'10px'
                            }}
                      className="d-flex flex-row justify-content-between align-items-center"
          >
            <DynamicP text={'Click the button to add a user'}/>
            <DynamicButton label="Add" style={{
                                                backgroundColor:'#348017',
                                                color:'#FFFFFF',
                                                height:'30px',
                                                width:'50px',
                                                marginLeft:'10px'
                                             }}
                                        onClick={toggleModal}
            />
          </DynamicDiv>
        </Ribz>
      </DynamicDiv>
      <Container className="py-4">
        {pending.length > 0 && (
          <Card className="mb-4">
            <Card.Header className="bg-warning text-white fw-bold">
              Pending Users
            </Card.Header>
            <Card.Body style={{ maxHeight: "300px", overflowY: "auto" }}>
              {pendingList}
            </Card.Body>
          </Card>
        )}

        {approved.length > 0 && (
          <Card className="mb-4">
            <Card.Header className="bg-success text-white fw-bold">
              Approved Users
            </Card.Header>
            <Card.Body style={{ maxHeight: "300px", overflowY: "auto" }}>
              {approvedList}
            </Card.Body>
          </Card>
        )}

        {inactive.length > 0 && (
          <Card className="mb-4">
            <Card.Header className="bg-danger fw-bold">
              Inactive Users
            </Card.Header>
            <Card.Body style={{ maxHeight: "300px", overflowY: "auto" }}>
              {inactiveList}
            </Card.Body>
          </Card>
        )}
      </Container>
      {!pending || !approved || !inactive }
      {showModal && <RegModal callback2={toggleModal}/>}
    </Skeleton>
  );
}