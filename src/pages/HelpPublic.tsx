import Skeleton from "../components/Skeleton copy"
import GeneralPageFooter from "../components/GeneralPageFooter"
import FAQs from "../sections/FAQs"
import GeneralStrip from "../sections/GeneralStrip"
import Navigation from "../sections/Navigation"
import ChatAdmin from "../sections/ChatAdmin"

import GeneralPageProvider from "../contexts/GeneralPageProvider"
import { useGeneralPage } from "../contexts/GeneralPageContext"

import type Faqs from "../interfaces/faqs"

import GeneralStyles from "../tailwind/general"

const faqs: Faqs[] = [
    {
        FAQID: 1,
        Email: "@gmail.com",
        Question: "How do I sign up?",
        Answer: "Download the app",
        Approved: "Yes"
    },
    {
        FAQID: 2,
        Email: "@gmail.com",
        Question: "What are some of the services offered?",
        Answer: "Visit ",
        Approved: "No"
    },
    {
        FAQID: 3,
        Email: "@gmail.com",
        Question: "How do I make payments?",
        Answer: "After",
        Approved: "No"
    },
    {
        FAQID: 4,
        Email: "@gmail.com",
        Question: "How do I sign up?",
        Answer: "Download the app",
        Approved: "Yes"
    },
    {
        FAQID: 5,
        Email: "@gmail.com",
        Question: "What are some of the services offered?",
        Answer: "Visit ",
        Approved: "No"
    },
    {
        FAQID: 6,
        Email: "@gmail.com",
        Question: "How do I make payments?",
        Answer: "After",
        Approved: "No"
    },
    {
        FAQID: 7,
        Email: "@gmail.com",
        Question: "How do I make payments?",
        Answer: "After",
        Approved: "Yes"
    }
]

function HelpContent() {
    const { help } = useGeneralPage()

    switch (help.segment) {
        case 'faqs':
            return <FAQs faqs={faqs} />

        case 'navigation':
            return <Navigation />

        case 'chatbot':
            return <ChatAdmin />
    }
}

export default function HelpPublic() {
    return (
        <GeneralPageProvider>
            <Skeleton>
                <GeneralStrip />

                <div className={`${GeneralStyles.cont} justify-center items-center`}>
                    <HelpContent />
                </div>

                <GeneralPageFooter />
            </Skeleton>
        </GeneralPageProvider>
    )
}