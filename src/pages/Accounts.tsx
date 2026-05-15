import { useEffect, useState } from "react";
import {
  Table,
  Container,
  Spinner,
  Alert,
} from "react-bootstrap";

// components
import Skeleton from "../components/Skeleton copy";
import Strip from "../components/headers/Strip";
import Main from "../components/headers/Main";

import link from "../scripts/services/utils/links";

interface User {
  RegID: number;
  name: string;
  email: string;
  gender: "Male" | "Female";
  regtype:
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
  accstatus:
    | "Pending"
    | "Approved"
    | "Inactive";
}

export default function Accounts() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] =
    useState<boolean>(true);

  const [error, setError] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          `${link}/api/admin/users/all`
        );

        if (!res.ok) {
          throw new Error(
            `Server error: ${res.status}`
          );
        }

        const data: User[] = await res.json();

        setUsers(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Skeleton>
      <Strip title="Ukulele Band Admin Module" />
      <Main brand="Accounts" />

      <Container className="py-4">
        {loading && (
          <div className="my-4 text-center">
            <Spinner
              animation="border"
              variant="primary"
            />
          </div>
        )}

        {error && (
          <Alert
            variant="danger"
            className="text-center"
          >
            {error}
          </Alert>
        )}

        {!loading && !error && (
          <Table
            striped
            bordered
            hover
            responsive
            className="shadow-sm"
          >
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
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.regtype}</td>
                    <td>{user.gender}</td>
                    <td>{user.accstatus}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center"
                  >
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