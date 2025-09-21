// src/pages/Feedback.tsx
import { useState, useEffect } from "react";
import { Container, Card, Button, Form, Spinner, Alert } from "react-bootstrap";

//components
import Header from "../components/Header";
import Skeleton from "../components/Skeleton copy";
import DynamicDiv from "../components/DynamicDiv";
import Ribz from "../components/Ribz";
import DynamicP from "../components/p/DynamicP";
import DynamicButton from "../components/buttons/DynamicButton";
import Strip from "../components/headers/Strip";

export interface FeedbackRow {
  FeedbackID: number;
  CustomerID: number;
  Name: string;
  Comments: string | null;
  Response: string | null;
  Rating: number;
}

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState<FeedbackRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newResponse, setNewResponse] = useState<string>("");

  // Fetch feedbacks on mount
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/feedback");
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const data: FeedbackRow[] = await res.json();
        setFeedbacks(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch feedbacks");
      } finally {
        setLoading(false);
      }
    };
    fetchFeedback();
  }, []);

  // Handle updating a response
  const handleUpdateResponse = async (feedback: FeedbackRow) => {
    if (!newResponse.trim()) return;

    try {
      const res = await fetch("http://localhost:5000/api/feedback/put", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          FeedbackID: feedback.FeedbackID,
          Response: newResponse,
        }),
      });

      if (!res.ok) throw new Error("Failed to update response");

      // Update locally
      setFeedbacks((prev) =>
        prev.map((f) =>
          f.FeedbackID === feedback.FeedbackID ? { ...f, Response: newResponse } : f
        )
      );
      setEditingId(null);
      setNewResponse("");
    } catch (err: any) {
      alert(err.message || "Error updating response");
    }
  };

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

        {error && <Alert variant="danger">{error}</Alert>}

        {!loading &&
          !error &&
          feedbacks.map((fb) => (
            <Card key={fb.FeedbackID} className="mb-3 shadow-sm">
              <Card.Body className="d-flex justify-content-between align-items-start flex-wrap">
                <div style={{ flex: 1, minWidth: "200px", marginRight: "20px" }}>
                  <h5>{fb.Name}</h5>
                  <p>{fb.Comments}</p>
                  <p>Rating: {fb.Rating} / 5</p>
                </div>

                <div style={{ flex: 1, minWidth: "200px" }}>
                  {fb.Response ? (
                    <p>
                      <strong>Response:</strong> {fb.Response}
                    </p>
                  ) : editingId === fb.FeedbackID ? (
                    <Form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleUpdateResponse(fb);
                      }}
                    >
                      <Form.Group controlId={`response-${fb.FeedbackID}`} className="mb-2">
                        <Form.Control
                          type="text"
                          placeholder="Enter response"
                          value={newResponse}
                          onChange={(e) => setNewResponse(e.target.value)}
                          required
                        />
                      </Form.Group>
                      <Button type="submit" size="sm" variant="primary">
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
                      onClick={() => setEditingId(fb.FeedbackID)}
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
