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
        Question: 'How do I sign up?',
        Answer: 'Download the app'
    },
    {
        FAQID: 2,
        Question: 'What are some of the services offered?',
        Answer: 'Visit '
    },
    {
        FAQID: 3,
        Question: 'How do I make payments?',
        Answer: 'After'
    },
    {
        FAQID: 4,
        Question: 'How do I sign up?',
        Answer: 'Download the app'
    },
    {
        FAQID: 5,
        Question: 'What are some of the services offered?',
        Answer: 'Visit '
    },
    {
        FAQID: 6,
        Question: 'How do I make payments?',
        Answer: 'After'
    },
    {
        FAQID: 7,
        Question: 'How do I make payments?',
        Answer: 'After'
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