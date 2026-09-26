import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

//pages
import AboutUsPublic from "../pages/AboutUsPublic"
import HelpPublic from "../pages/HelpPublic"
import ContactUsPublic from "../pages/ContactUsPublic"



export default function GeneralPages() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/aboutus" replace />} />
                <Route path="/aboutus" element={<AboutUsPublic />} />
                <Route path="/contactus" element={<ContactUsPublic />} />
                <Route path="/help" element={<HelpPublic />} />
            </Routes>
        </BrowserRouter>
    )
}
