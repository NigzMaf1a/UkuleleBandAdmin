import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Container, Tabs, Tab, Button, Form, Spinner, Alert } from "react-bootstrap";

//components
import Skeleton from "../components/Skeleton copy";
import Header from "../components/Header";
import Ribz from "../components/Ribz";
import Strip from "../components/headers/Strip";
import DynamicDiv from "../components/DynamicDiv";
import DynamicButton from "../components/buttons/DynamicButton";
import DynamicP from "../components/p/DynamicP";

//scripts
import Admin from "../scripts/user/Admin";

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
    PhoneNo: string;
    EmailAddress: string;
    Instagram: string;
    Facebook: string;
    POBox: string;
  }>({ PhoneNo: "", EmailAddress: "", Instagram: "", Facebook: "", POBox: "" });
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
      const admin = new Admin(user.RegID, token);
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
    </Skeleton>
  );
}
