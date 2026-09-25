import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


//View components
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Accounts from "./pages/Accounts";
import AboutAndContact from "./pages/AboutAndContact";
import AboutUsPublic from "./pages/AboutUsPublic";
import ContactUsPublic from "./pages/ContactUsPublic";
import HelpPublic from "./pages/HelpPublic";
import Reports from "./pages/Reports";
import Feedback from "./pages/Feedback";
// import User from "./pages/User";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/aboutus" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/about-contact" element={<AboutAndContact />} />
        <Route path="/aboutus" element={<AboutUsPublic />} />
        <Route path="/contactus" element={<ContactUsPublic />} />
        <Route path="/help" element={<HelpPublic />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/feedback" element={<Feedback />} />
        {/* <Route path="/user" element={<User />} /> */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
