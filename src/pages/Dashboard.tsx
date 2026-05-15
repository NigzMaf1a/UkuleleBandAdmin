import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card } from "react-bootstrap";

//scripts
import Admin from "../scripts/user/Admin";

//components 
import UserCard from "../components/UserCard";
import Skeleton from "../components/Skeleton copy";
import Strip from "../components/headers/Strip";
import Main from "../components/headers/Main";

import type User from '../interfaces/user';

export default function Dashboard() {
  const [pending, setPending] = useState<User[]>([]);
  const [approved, setApproved] = useState<User[]>([]);
  const [inactive, setInactive] = useState<User[]>([]);
  const [thisAdmin, setThisAdmin] = useState<Admin>();
  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');
    const user: User | null = userString ? JSON.parse(userString) : null;

    if (!token) {
      navigate('/login');
      return;
    }    
    if(user && token)(()=>{
      const admin = new Admin(user.regid, token);
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
        console.log('Approved Users:', allApproved);
        setInactive(allInactive);

      } catch (err) {
        console.error("Error fetching users:", err);
      }
    })();
  }, [thisAdmin]);

  const pendingList = useMemo(
    () =>
      pending.map((user, idx) => (
        <UserCard
          key={idx}
          user={user}
          buttonText="Approve"
          buttonVariant="success"
          className4Button="approve-user-btn"
          onAction={() => thisAdmin? thisAdmin.approveUser(user.regid) : console.error('No Logged in Admin')}
        />
      )),
    [pending, thisAdmin]
  );

  const approvedList = useMemo(
    () =>
      approved.map((user, idx) => (
        <UserCard
          key={idx}
          user={user}
          buttonText="Deactivate"
          buttonVariant="danger"
          className4Button="deactivate-user-btn"
          onAction={() => thisAdmin? thisAdmin.deactivateUser(user.regid) : console.error('No Logged in Admin')}
        />
      )),
    [approved, thisAdmin]
  );

  const inactiveList = useMemo(
    () =>
      inactive.map((user, idx) => (
        <UserCard
          key={idx}
          user={user}
          buttonText="Reactivate"
          buttonVariant="warning"
          className4Button="reactivate-user-btn"
          onAction={() => thisAdmin ? thisAdmin.reactivateUser(user.regid) : console.error('No Logged in Admin')}
        />
      )),
    [inactive, thisAdmin]
  );

  return (
    <Skeleton>
      <Strip title="Ukulele Band Admin Module"/>
      <Main brand="Dashboard"/>
      <Container className="py-4">
        {pending.length > 0 && (
          <Card className="mb-4">
            <Card.Header className="fw-bold golden-rod text-white">
              Pending Users
            </Card.Header>
            <Card.Body style={{ maxHeight: "300px", overflowY: "auto" }}>
              {pendingList}
            </Card.Body>
          </Card>
        )}

        {approved.length > 0 && (
          <Card className="mb-4">
            <Card.Header className="bg-success fw-bold text-white">
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
    </Skeleton>
  );
}