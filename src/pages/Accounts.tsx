import { useEffect, useState } from "react";
import { Table, Container, Spinner, Alert } from "react-bootstrap";

//components
import Skeleton from "../components/Skeleton copy";
import Ribz from "../components/Ribz";
import Header from "../components/Header"; 
import Strip from "../components/headers/Strip";
import DynamicDiv from "../components/DynamicDiv";
import DynamicButton from "../components/buttons/DynamicButton";
import DynamicP from "../components/p/DynamicP";

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
    <Skeleton>
      <Strip title="Ukulele Band Admin Module"/>
      <DynamicDiv className="d-flex flex-row col-12 justify-content-between align-items-center px-6"
                  style={{
                          height:'100px',
                          width:'98%',
                          border:'1px solid white'
                        }}    
      >
        <Ribz style={{
                      height:'100px',
                      borderRadius:'10px'
                    }}
              className="justify-content-between align-items-center mx-2"
        >
              
          <Header brand="Accounts" />
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
            />
          </DynamicDiv>
        </Ribz>
      </DynamicDiv>
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
    </Skeleton>
  );
}
