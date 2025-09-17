import { useEffect, useState } from "react";
import { Container, Tabs, Tab, Button, Form, Spinner, Alert } from "react-bootstrap";
import Header from "../components/Header";

export default function AboutAndContact() {
  // About state
  const [aboutText, setAboutText] = useState("");
  const [editingAbout, setEditingAbout] = useState(false);
  const [loadingAbout, setLoadingAbout] = useState(true);
  const [errorAbout, setErrorAbout] = useState<string | null>(null);

  // Contact state
  const [contact, setContact] = useState<{
    PhoneNo: string;
    EmailAddress: string;
    Instagram: string;
    Facebook: string;
    POBox: string;
  }>({ PhoneNo: "", EmailAddress: "", Instagram: "", Facebook: "", POBox: "" });
  const [editingContact, setEditingContact] = useState(false);
  const [loadingContact, setLoadingContact] = useState(true);
  const [errorContact, setErrorContact] = useState<string | null>(null);

  // Fetch About info
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/about");
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const data = await res.json();
        setAboutText(data.Detail || "");
      } catch (err: any) {
        setErrorAbout(err.message || "Failed to fetch About");
      } finally {
        setLoadingAbout(false);
      }
    };
    fetchAbout();
  }, []);

  // Fetch Contact info
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/contacts");
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const data = await res.json();
        setContact(data || {});
      } catch (err: any) {
        setErrorContact(err.message || "Failed to fetch Contact");
      } finally {
        setLoadingContact(false);
      }
    };
    fetchContact();
  }, []);

  // Placeholder update functions
  const updateAbout = async () => {
    try {
      // TODO: Replace with actual API call to update About
      console.log("Updated About:", aboutText);
      setEditingAbout(false);
    } catch (err) {
      console.error("Failed to update About:", err);
    }
  };

  const updateContact = async () => {
    try {
      // TODO: Replace with actual API call to update Contact
      console.log("Updated Contact:", contact);
      setEditingContact(false);
    } catch (err) {
      console.error("Failed to update Contact:", err);
    }
  };

  return (
    <>
      <Header />

      <Container className="py-4">
        <Tabs defaultActiveKey="about" id="about-contact-tabs" className="mb-3" fill>
          {/* About Tab */}
          <Tab eventKey="about" title="About">
            {loadingAbout ? (
              <div className="text-center my-4">
                <Spinner animation="border" variant="primary" />
              </div>
            ) : errorAbout ? (
              <Alert variant="danger">{errorAbout}</Alert>
            ) : (
              <div>
                {editingAbout ? (
                  <>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      value={aboutText}
                      onChange={(e) => setAboutText(e.target.value)}
                      className="mb-3"
                    />
                    <Button variant="primary" onClick={updateAbout}>
                      Save About
                    </Button>{" "}
                    <Button variant="secondary" onClick={() => setEditingAbout(false)}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <p>{aboutText || "No about information available."}</p>
                    <Button variant="primary" onClick={() => setEditingAbout(true)}>
                      Edit About
                    </Button>
                  </>
                )}
              </div>
            )}
          </Tab>

          {/* Contact Tab */}
          <Tab eventKey="contact" title="Contact">
            {loadingContact ? (
              <div className="text-center my-4">
                <Spinner animation="border" variant="primary" />
              </div>
            ) : errorContact ? (
              <Alert variant="danger">{errorContact}</Alert>
            ) : (
              <Form>
                {["PhoneNo", "EmailAddress", "Instagram", "Facebook", "POBox"].map((field) => (
                  <Form.Group className="mb-3" key={field}>
                    <Form.Label>{field}</Form.Label>
                    <Form.Control
                      type="text"
                      value={(contact as any)[field] || ""}
                      onChange={(e) =>
                        setContact((prev) => ({ ...prev, [field]: e.target.value }))
                      }
                      readOnly={!editingContact}
                    />
                  </Form.Group>
                ))}

                {editingContact ? (
                  <>
                    <Button variant="primary" onClick={updateContact}>
                      Save Contact
                    </Button>{" "}
                    <Button variant="secondary" onClick={() => setEditingContact(false)}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button variant="primary" onClick={() => setEditingContact(true)}>
                    Edit Contact
                  </Button>
                )}
              </Form>
            )}
          </Tab>
        </Tabs>
      </Container>
    </>
  );
}
