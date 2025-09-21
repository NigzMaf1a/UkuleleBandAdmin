import { useState, useEffect } from "react";
import { Tab, Tabs, Row, Form, Col, Button } from "react-bootstrap";

//scripts

//components
import Skeleton from "../components/Skeleton copy";
import GlobalModal from "../components/modals/GlobalModal";


const tabsConfig = [
  { key: "update", title: "Update", endpoint: "/bookings" },
  { key: "switch", title: "Switch User", endpoint: "/lending" },
  { key: "add", title: "Add User", endpoint: "/penalties" },
  { key: "logout", title: "Log Out", endpoint: "/inspection" },
];

function User() {
  const [activeTab, setActiveTab] = useState<string>("update");
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);


  return (
    <Skeleton>
      <Tabs
        activeKey={activeTab}
        onSelect={(k) => k && setActiveTab(k)}
        className="mb-3"
      >
        { tabsConfig.map((tab) => (
            <Tab key={tab.key} eventKey={tab.key} title={tab.title}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Control
                  type="text"
                  placeholder={`Search in ${tab.title}`}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Col>
              <Col md={6} className="text-end">
                <Button variant="success" onClick={handleDownload}>
                  Download CSV
                </Button>
              </Col>
            </Row>
            </Tab>
        ))}
      </Tabs>
      {loading && <GlobalModal></GlobalModal>}
    </Skeleton>
  )
}

export default User