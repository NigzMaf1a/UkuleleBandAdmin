import Skeleton from "../components/Skeleton copy"

import GeneralPageFooter from "../components/GeneralPageFooter"

import FAQs from "../sections/FAQs"

import GeneralStrip from "../sections/GeneralStrip"

import Navigation from "../sections/Navigation"

import ChatAdmin from "../sections/ChatAdmin"

import GeneralPageProvider from "../contexts/GeneralPageProvider"

import { useGeneralPage } from "../contexts/GeneralPageContext"

import type Faqs from "../interfaces/faqs"

const faqs: Faqs[] = [
    {
        FAQID: 1,
        Question: 'How do I sign up',
        Answer: 'Download the app'
    }
]

class Styles {
    static body(): string {
        const dim = 'w-full h-125 flex flex-row'
        return `${dim}`
    }
}

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

                <div className={Styles.body()}>
                    <HelpContent />
                </div>

                <GeneralPageFooter />
            </Skeleton>
        </GeneralPageProvider>
    )
}