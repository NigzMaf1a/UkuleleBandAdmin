import { useState, useEffect } from "react";
import {
  Container,
  Card,
  Button,
  Form,
  Spinner,
  Alert,
} from "react-bootstrap";

// components
import Skeleton from "../components/Skeleton copy";
import Strip from "../components/headers/Strip";
import Main from "../components/headers/Main";

import link from "../scripts/services/utils/links";

export interface FeedbackRow {
  FeedbackID: number;
  CustomerID: number;
  name: string;
  comments: string | null;
  response: string | null;
  rating: number;
}

interface UpdateResponsePayload {
  FeedbackID: number;
  Response: string;
}

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState<FeedbackRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newResponse, setNewResponse] = useState<string>("");

  // Fetch feedbacks on mount
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await fetch(`${link}/api/admin/feedback`);

        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }

        const data: FeedbackRow[] = await res.json();

        setFeedbacks(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to fetch feedbacks");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  // Handle updating a response
  const handleUpdateResponse = async (
    feedback: FeedbackRow
  ) => {
    if (!newResponse.trim()) return;

    try {
      const payload: UpdateResponsePayload = {
        FeedbackID: feedback.FeedbackID,
        Response: newResponse,
      };

      const res = await fetch(`${link}/api/feedback/put`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to update response");
      }

      // Update locally
      setFeedbacks((prev) =>
        prev.map((f) =>
          f.FeedbackID === feedback.FeedbackID
            ? {
                ...f,
                response: newResponse,
              }
            : f
        )
      );

      setEditingId(null);
      setNewResponse("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Error updating response");
      }
    }
  };

  return (
    <Skeleton>
      <Strip title="Ukulele Band Admin Module" />
      <Main brand="Feedback" />

      <Container className="feed-body py-4">
        {loading && (
          <div className="my-4 text-center">
            <Spinner
              animation="border"
              variant="primary"
            />
          </div>
        )}

        {error && (
          <Alert variant="danger">
            {error}
          </Alert>
        )}

        {!loading &&
          !error &&
          feedbacks.map((fb) => (
            <Card
              key={fb.FeedbackID}
              className="mb-3 shadow-sm"
            >
              <Card.Body className="align-items-start d-flex feed-cont flex-wrap justify-content-between">
                <div
                  style={{
                    flex: 1,
                    minWidth: "200px",
                    marginRight: "20px",
                  }}
                >
                  <h5 className="feed-name">
                    Name: {fb.name}
                  </h5>

                  <p className="comment">
                    Comment: {fb.comments}
                  </p>

                  <p>
                    Rating: {fb.rating} / 5
                  </p>
                </div>

                <div
                  style={{
                    flex: 1,
                    minWidth: "200px",
                  }}
                  className="align-items-center d-flex justify-content-center mx-auto my-auto"
                >
                  {fb.response ? (
                    <p className="response">
                      <strong>Response:</strong>{" "}
                      {fb.response}
                    </p>
                  ) : editingId === fb.FeedbackID ? (
                    <Form
                      onSubmit={(
                        e: React.FormEvent<HTMLFormElement>
                      ) => {
                        e.preventDefault();
                        handleUpdateResponse(fb);
                      }}
                    >
                      <Form.Group
                        controlId={`response-${fb.FeedbackID}`}
                        className="mb-2"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Enter response"
                          value={newResponse}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) =>
                            setNewResponse(
                              e.target.value
                            )
                          }
                          required
                        />
                      </Form.Group>

                      <Button
                        type="submit"
                        size="sm"
                        variant="primary"
                      >
                        Save Response
                      </Button>{" "}

                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => {
                          setEditingId(null);
                          setNewResponse("");
                        }}
                      >
                        Cancel
                      </Button>
                    </Form>
                  ) : (
                    <Button
                      size="sm"
                      variant="success"
                      onClick={() =>
                        setEditingId(fb.FeedbackID)
                      }
                    >
                      Add Response
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          ))}
      </Container>
    </Skeleton>
  );
}