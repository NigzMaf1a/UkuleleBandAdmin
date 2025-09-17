// import React from "react";
import { Button, Row, Col } from "react-bootstrap";

interface UserCardProps {
  name: string;
  email: string;
  buttonText: string;
  buttonVariant: string;
  onAction: () => void;
}

export default function UserCard({
  name,
  email,
  buttonText,
  buttonVariant,
  onAction,
}: UserCardProps) {
  return (
    <Row className="align-items-center border rounded p-3 mb-2 bg-white">
      <Col xs={8}>
        <h6 className="mb-1 fw-bold">{name}</h6>
        <small className="text-muted">{email}</small>
      </Col>
      <Col xs={4} className="text-end">
        <Button variant={buttonVariant} size="sm" onClick={onAction}>
          {buttonText}
        </Button>
      </Col>
    </Row>
  );
}
