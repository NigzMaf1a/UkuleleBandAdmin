import { Route, Routes } from "react-router-dom"

import AboutUsPublic from "../pages/AboutUsPublic"
import ContactUsPublic from "../pages/ContactUsPublic"
import HelpPublic from "../pages/HelpPublic"

export default function PublicRoutes() {
    return (
        <Routes>
            <Route path="/aboutus" element={<AboutUsPublic />} />
            <Route path="/contactus" element={<ContactUsPublic />} />
            <Route path="/help" element={<HelpPublic />} />
        </Routes>
    )
}
