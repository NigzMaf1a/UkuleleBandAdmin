import { useEffect, useState } from "react";
import { Table, Container, Spinner, Alert } from "react-bootstrap";
import Header from "../components/Header"; // <-- import Header

interface User {
  RegID: number;
  Name: string;
  Email: string;
  Gender: "Male" | "Female";
  RegType:
    | "Customer"
    | "DJ"
    | "Mcee"
    | "Storeman"
    | "Accountant"
    | "Dispatchman"
    | "Inspector"
    | "Band"
    | "Admin"
    | "Supplier";
  accStatus: "Pending" | "Approved" | "Inactive";
}

export default function Accounts() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/users/all");
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const data: User[] = await res.json();
        setUsers(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <Header /> {/* <-- header on all pages */}
      <Container className="py-4">

        {loading && (
          <div className="text-center my-4">
            <Spinner animation="border" variant="primary" />
          </div>
        )}

        {error && (
          <Alert variant="danger" className="text-center">
            {error}
          </Alert>
        )}

        {!loading && !error && (
          <Table striped bordered hover responsive className="shadow-sm">
            <thead className="table-primary">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Reg Type</th>
                <th>Gender</th>
                <th>ACC Status</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user.RegID}>
                    <td>{index + 1}</td>
                    <td>{user.Name}</td>
                    <td>{user.Email}</td>
                    <td>{user.RegType}</td>
                    <td>{user.Gender}</td>
                    <td>{user.accStatus}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center">
                    No accounts found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
}
