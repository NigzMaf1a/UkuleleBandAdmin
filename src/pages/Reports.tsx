import React, { useState, useEffect } from "react";
import {
  Container,
  Tabs,
  Tab,
  Table,
  Button,
  Form,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import Header from "../components/Header";

type ApiData = Record<string, any>;

const tabsConfig = [
  { key: "bookings", title: "Booking", endpoint: "/bookings" },
  { key: "lending", title: "Lending", endpoint: "/lending" },
  { key: "penalties", title: "Penalty", endpoint: "/penalties" },
  { key: "inspection", title: "Inspection", endpoint: "/inspection" },
  { key: "inventory", title: "Inventory", endpoint: "/inventory" },
  { key: "transactions", title: "Transactions", endpoint: "/finances" },
  { key: "supplies", title: "Supplies", endpoint: "/supplies" },
];

const BASE_URL = "http://localhost:5000/api/admin";

const Reports: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("bookings");
  const [data, setData] = useState<Record<string, ApiData[]>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const fetchData = async (tabKey: string) => {
    const tab = tabsConfig.find((t) => t.key === tabKey);
    if (!tab) return;

    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}${tab.endpoint}`);
      const json = await res.json();
      setData((prev) => ({ ...prev, [tabKey]: json }));
    } catch (err) {
      console.error(`Error fetching ${tabKey}:`, err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(activeTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const currentData: ApiData[] = data[activeTab] || [];

  const filteredData = currentData.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(search.toLowerCase())
  );

  const handleDownload = () => {
    const csv =
      filteredData.length > 0
        ? [
            Object.keys(filteredData[0]).join(","),
            ...filteredData.map((row) =>
              Object.values(row)
                .map((v) => `"${String(v).replace(/"/g, '""')}"`)
                .join(",")
            ),
          ].join("\n")
        : "No data";

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `${activeTab}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container fluid className="py-4">
      <Header/>

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => k && setActiveTab(k)}
        className="mb-3"
      >
        {tabsConfig.map((tab) => (
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

            {loading ? (
              <div className="text-center my-4">
                <Spinner animation="border" />
              </div>
            ) : filteredData.length > 0 ? (
              <Table striped bordered hover responsive size="sm">
                <thead>
                  <tr>
                    {Object.keys(filteredData[0]).map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((row, idx) => (
                    <tr key={idx}>
                      {Object.values(row).map((val, i) => (
                        <td key={i}>{String(val)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p className="text-muted">No data found.</p>
            )}
          </Tab>
        ))}
      </Tabs>
    </Container>
  );
};

export default Reports;
