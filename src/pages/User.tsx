// import { useState, useEffect } from "react";
// import { Tab, Tabs, Row, Form, Col, Button } from "react-bootstrap";

// //scripts

// //components
// import Skeleton from "../components/Skeleton copy";
// import GlobalModal from "../components/modals/GlobalModal";


// const tabsConfig = [
//   { key: "update", title: "Update", endpoint: "/bookings" },
//   { key: "switch", title: "Switch User", endpoint: "/lending" },
//   { key: "add", title: "Add User", endpoint: "/penalties" },
//   { key: "logout", title: "Log Out", endpoint: "/inspection" },
// ];

// function User() {
//   const [activeTab, setActiveTab] = useState<string>("update");
//   const [search, setSearch] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);


//   return (
//     <Skeleton>
//       <Tabs defaultActiveKey="about" id="about-contact-tabs" className="mb-3" fill>
//           <Tab eventKey="about" title="About"></Tab>
//       </Tabs>      
//     </Skeleton>
//   )
// }

// export default User