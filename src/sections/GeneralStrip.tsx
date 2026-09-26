import { useLocation } from "react-router-dom"

import { useGeneralPage } from "../contexts/GeneralPageContext"

interface BtnProps {
    label: string
    onClick: () => void
}

const styles = 'flex flex-row w-full h-full justify-evenly items-center'

function Button({ label, onClick }: BtnProps) {
    const styles = 'w-30 h-10 flex rounded-xl items-center justify-center bg-white text-blue-500 hover:cursor-pointer'

    return (
        <div
            className={styles}
            onClick={onClick}
        >
            {label}
        </div>
    )
}

function HelpStrip() {
    const { help } = useGeneralPage()

    return (
        <div className={styles}>
            <Button
                label="FAQs"
                onClick={help.functions.faqs}
            />

            <Button
                label="Navigation"
                onClick={help.functions.navigation}
            />

            <Button
                label="Chatbot"
                onClick={help.functions.chatbot}
            />
        </div>
    )
}

function ContactStrip() {
    return (
        <div className={styles}>
        </div>
    )
}

function AboutStrip() {
    const { about } = useGeneralPage()

    return (
        <div className={styles}>
            <Button
                label="Who we are"
                onClick={about.functions.whoWeAre}
            />

            <Button
                label="Our services"
                onClick={about.functions.ourServices}
            />

            <Button
                label="Get started"
                onClick={about.functions.getStarted}
            />
        </div>
    )
}

export default function GeneralStrip() {
    const { pathname } = useLocation()

    return (
        <div className="w-full h-[80px] flex flex-row bg-blue-500 py-2 justify-center items-center">
            {pathname === '/aboutus' && <AboutStrip />}

            {pathname === '/contactus' && <ContactStrip />}

            {pathname === '/help' && <HelpStrip />}
        </div>
    )
}