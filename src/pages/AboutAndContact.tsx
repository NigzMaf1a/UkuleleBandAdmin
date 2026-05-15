import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Container, Tabs, Tab, Button, Form, Spinner, Alert } from "react-bootstrap";

//components
import Skeleton from "../components/Skeleton copy";
import Strip from "../components/headers/Strip";
import Main from "../components/headers/Main";
import DynamicDiv from "../components/DynamicDiv";

//scripts
import Admin from "../scripts/user/Admin";
import link from "../scripts/services/utils/links";

//interfaces
import type User from "../interfaces/user";
interface About{
  Detail: string;
}

export default function AboutAndContact() {
  // About state
  const [thisAdmin, setThisAdmin] = useState<Admin>();
  const [aboutText, setAboutText] = useState("");
  const [editingAbout, setEditingAbout] = useState(false);
  const [loadingAbout, setLoadingAbout] = useState(true);
  const [errorAbout, setErrorAbout] = useState<string | null>(null);

  // Contact state
  const [contact, setContact] = useState<{
    phoneno: string;
    emailaddress: string;
    instagram: string;
    facebook: string;
    pobox: string;
  }>({ phoneno: "", emailaddress: "", instagram: "", facebook: "", pobox: "" });
  
  const [editingContact, setEditingContact] = useState(false);
  const [loadingContact, setLoadingContact] = useState(true);
  const [errorContact, setErrorContact] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');
    const user: User | null = userString ? JSON.parse(userString) : null;
    console.log('Token:', token);
    console.log('User:', user);

    if (!token) {
      navigate('/login');
      return;
    }    
    if(user && token)(()=>{
      const admin = new Admin(user.regid, token);
      setThisAdmin(admin);
    })();
  }, [navigate]);

  // Fetch About info
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        if(thisAdmin)(async ()=>{
          const about:About = await thisAdmin.fetchAbout();
          console.log(about);
          setAboutText(about.Detail);
        })();
      } catch (err: any) {
        setErrorAbout(err.message || "Failed to fetch About");
      } finally {
        setLoadingAbout(false);
      }
    };
    fetchAbout();
  }, [thisAdmin]);

  // Fetch Contact info
  useEffect(() => {
    const fetchContact = async () => {
      try {
        // if(thisAdmin)(async ()=>{
        //   const contacts = await thisAdmin.fetchAbout();
        //   console.log(about);
        //   setAboutText(about.Detail);
        // })();

        const res = await fetch(`${link}/api/contacts/get`);
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

  const updateAbout = async () => {
    try {
      if(thisAdmin){
        await thisAdmin.editAbout(aboutText);
        console.log("Updated About:", aboutText);
        toast.success('About updated successfully');
      }

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
    <Skeleton className="about-page">
      <Strip title="Ukulele Band Admin Module"/>
      <Main brand="About"/>

      <Container className="py-4">
        <Tabs defaultActiveKey="about" id="about-contact-tabs" className="mb-3" fill>
          {/* About Tab */}
          <Tab eventKey="about" title="About" >
            {loadingAbout ? (
              <div className="my-4 text-center">
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
                    <Button className="edit-about" onClick={() => setEditingAbout(true)}>
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
              <div className="my-4 text-center">
                <Spinner animation="border" variant="primary" />
              </div>
            ) : errorContact ? (
              <Alert variant="danger">{errorContact}</Alert>
            ) : (
              <Form className="align-items-center d-flex flex-column justify-content-center">
                <DynamicDiv className="contact-form mb-3 px-3 py-2">
                  {["phoneno", "emailaddress", "instagram", "facebook", "pobox"].map((field) => (
                    <Form.Group className="mb-3" key={field}>
                      <Form.Label className="contact-label">{field}</Form.Label>
                      <Form.Control
                        type="text"
                        value={(contact as any)[field] || ""}
                        onChange={(e) =>
                          setContact((prev) => ({ ...prev, [field]: e.target.value }))
                        }
                        readOnly={!editingContact}
                        className="contact-input"
                      />
                    </Form.Group>
                  ))}
                </DynamicDiv>

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
                  <Button className="edit-about" onClick={() => setEditingContact(true)}>
                    Edit Contact
                  </Button>
                )}
              </Form>
            )}
          </Tab>
        </Tabs>
      </Container>
    </Skeleton>
  );
}
