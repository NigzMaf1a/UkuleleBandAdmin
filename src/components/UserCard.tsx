import { useState } from "react";
import { Button, Row, Col } from "react-bootstrap";

//components
import UserDetailCard from "./modals/UserDetailCard";

//interfaces
import type User from "../interfaces/user";

interface UserCardProps {
  user:User;
  buttonText: string;
  buttonVariant: string;
  className4Button?: string;
  onAction: () => void;
}

export default function UserCard({
  user,
  buttonText,
  buttonVariant,
  className4Button = "",
  onAction,
}: UserCardProps) {
  const [showModal, setShowModal] = useState<boolean>(false);

  function toggleModal(){
    setShowModal(prev => !prev);
  }

  return (
    <>
      <Row className="align-items-center bg-white border mb-2 p-3 rounded user-card"
           onClick={toggleModal}
      >
        <Col xs={8}>
          <h6 className="fw-bold mb-1">{user.Name}</h6>
          <small className="text-muted">{user.Email}</small>
        </Col>
        <Col xs={4} className="text-end">
          <Button variant={buttonVariant} size="sm" onClick={onAction} className={`${className4Button}`}>
            {buttonText}
          </Button>
        </Col>
      </Row>
      {showModal && <UserDetailCard user={user} callback1={toggleModal}/>}
    </>
  );
}
