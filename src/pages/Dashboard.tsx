import { useState, useEffect, useMemo } from "react";
import { Container, Card } from "react-bootstrap";
import Header from "../components/Header";
import UserCard from "../components/UserCard";

interface User {
  Name: string;
  Email: string;
}

export default function Dashboard() {
  const [pending, setPending] = useState<User[]>([]);
  const [approved, setApproved] = useState<User[]>([]);
  const [inactive, setInactive] = useState<User[]>([]);

  // Fetch data from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const [pRes, aRes, iRes] = await Promise.all([
          fetch("http://localhost:5000/api/admin/users/pending"),
          fetch("http://localhost:5000/api/admin/users/approved"),
          fetch("http://localhost:5000/api/admin/users/inactive"),
        ]);

        if (!pRes.ok || !aRes.ok || !iRes.ok) {
          throw new Error("Failed to fetch users");
        }

        const [pData, aData, iData] = await Promise.all([
          pRes.json(),
          aRes.json(),
          iRes.json(),
        ]);

        setPending(pData);
        setApproved(aData);
        setInactive(iData);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

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
          onAction={() => console.log("Approve", user.Email)}
        />
      )),
    [pending]
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
          onAction={() => console.log("Deactivate", user.Email)}
        />
      )),
    [approved]
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
          onAction={() => console.log("Reactivate", user.Email)}
        />
      )),
    [inactive]
  );

  return (
    <>
      <Header />
      <Container className="py-4">
        {pending.length > 0 && (
          <Card className="mb-4">
            <Card.Header className="bg-success text-white fw-bold">
              Pending Users
            </Card.Header>
            <Card.Body style={{ maxHeight: "300px", overflowY: "auto" }}>
              {pendingList}
            </Card.Body>
          </Card>
        )}

        {approved.length > 0 && (
          <Card className="mb-4">
            <Card.Header className="bg-danger text-white fw-bold">
              Approved Users
            </Card.Header>
            <Card.Body style={{ maxHeight: "300px", overflowY: "auto" }}>
              {approvedList}
            </Card.Body>
          </Card>
        )}

        {inactive.length > 0 && (
          <Card className="mb-4">
            <Card.Header className="bg-warning fw-bold">
              Inactive Users
            </Card.Header>
            <Card.Body style={{ maxHeight: "300px", overflowY: "auto" }}>
              {inactiveList}
            </Card.Body>
          </Card>
        )}
      </Container>
    </>
  );
}
