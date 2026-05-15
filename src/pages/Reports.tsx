import link from "../scripts/services/utils/links";

import React, {
  useState,
  useEffect,
} from "react";

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

// components
import Skeleton from "../components/Skeleton copy";
import Strip from "../components/headers/Strip";
import Main from "../components/headers/Main";

type ApiValue =
  | string
  | number
  | boolean
  | null
  | undefined;

type ApiData = Record<string, ApiValue>;

interface TabConfig {
  key: string;
  title: string;
  endpoint: string;
}

const tabsConfig: TabConfig[] = [
  {
    key: "bookings",
    title: "Booking",
    endpoint: "/api/booking/get",
  },
  {
    key: "lending",
    title: "Lending",
    endpoint: "/api/lending/get",
  },
  {
    key: "penalties",
    title: "Penalty",
    endpoint: "/api/penalty/get",
  },
  {
    key: "inspection",
    title: "Inspection",
    endpoint: "/api/inspection/get",
  },
  {
    key: "inventory",
    title: "Inventory",
    endpoint: "/api/inventory/get",
  },
  {
    key: "transactions",
    title: "Finances",
    endpoint: "/api/finance/get",
  },
  {
    key: "supplies",
    title: "Supplies",
    endpoint: "/api/supply/get",
  },
];

const BASE_URL = link;

const Reports: React.FC = () => {
  const [activeTab, setActiveTab] =
    useState<string>("bookings");

  const [data, setData] = useState<
    Record<string, ApiData[]>
  >({});

  const [loading, setLoading] =
    useState<boolean>(false);

  const [search, setSearch] =
    useState<string>("");

  const fetchData = async (
    tabKey: string
  ): Promise<void> => {
    const tab = tabsConfig.find(
      (t) => t.key === tabKey
    );

    if (!tab) return;

    try {
      setLoading(true);

      const res = await fetch(
        `${BASE_URL}${tab.endpoint}`
      );

      if (!res.ok) {
        throw new Error(
          `Server error: ${res.status}`
        );
      }

      const json: ApiData[] = await res.json();

      setData((prev) => ({
        ...prev,
        [tabKey]: json,
      }));
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(
          `Error fetching ${tabKey}:`,
          err.message
        );
      } else {
        console.error(
          `Unknown error fetching ${tabKey}`
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab]);

  const currentData: ApiData[] =
    data[activeTab] || [];

  const filteredData = currentData.filter(
    (item) =>
      JSON.stringify(item)
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const handleDownload = (): void => {
    const csv =
      filteredData.length > 0
        ? [
            Object.keys(filteredData[0]).join(
              ","
            ),

            ...filteredData.map((row) =>
              Object.values(row)
                .map(
                  (value) =>
                    `"${String(value).replace(
                      /"/g,
                      '""'
                    )}"`
                )
                .join(",")
            ),
          ].join("\n")
        : "No data";

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const downloadLink =
      document.createElement("a");

    downloadLink.href =
      URL.createObjectURL(blob);

    downloadLink.setAttribute(
      "download",
      `${activeTab}.csv`
    );

    document.body.appendChild(downloadLink);

    downloadLink.click();

    document.body.removeChild(downloadLink);
  };

  return (
    <Skeleton>
      <Strip title="Ukulele Band Admin Module" />

      <Main brand="Reports" />

      <Container fluid className="py-4">
        <Tabs
          activeKey={activeTab}
          onSelect={(k) => {
            if (k) {
              setActiveTab(k);
            }
          }}
          className="mb-3"
        >
          {tabsConfig.map((tab) => (
            <Tab
              key={tab.key}
              eventKey={tab.key}
              title={tab.title}
            >
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Control
                    type="text"
                    placeholder={`Search in ${tab.title}`}
                    value={search}
                    onChange={(
                      e: React.ChangeEvent<HTMLInputElement>
                    ) =>
                      setSearch(e.target.value)
                    }
                  />
                </Col>

                <Col
                  md={6}
                  className="text-end"
                >
                  <Button
                    variant="success"
                    onClick={handleDownload}
                  >
                    Download CSV
                  </Button>
                </Col>
              </Row>

              {loading ? (
                <div className="my-4 text-center">
                  <Spinner animation="border" />
                </div>
              ) : filteredData.length > 0 ? (
                <Table
                  striped
                  bordered
                  hover
                  responsive
                  size="sm"
                >
                  <thead>
                    <tr>
                      {Object.keys(
                        filteredData[0]
                      ).map((key) => (
                        <th key={key}>{key}</th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {filteredData.map(
                      (row, idx) => (
                        <tr key={idx}>
                          {Object.values(
                            row
                          ).map((value, i) => (
                            <td key={i}>
                              {String(value)}
                            </td>
                          ))}
                        </tr>
                      )
                    )}
                  </tbody>
                </Table>
              ) : (
                <p className="text-muted">
                  No data found.
                </p>
              )}
            </Tab>
          ))}
        </Tabs>
      </Container>
    </Skeleton>
  );
};

export default Reports;