import { Navigate, Route, Routes } from "react-router-dom"

import Login from "../pages/Login"
import Dashboard from "../pages/Dashboard"
import Accounts from "../pages/Accounts"
import AboutAndContact from "../pages/AboutAndContact"
import Reports from "../pages/Reports"
import Feedback from "../pages/Feedback"

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/aboutus" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/about-contact" element={<AboutAndContact />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/feedback" element={<Feedback />} />

            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    )
}