import Skeleton from "../components/Skeleton copy"
import GeneralPageFooter from "../components/GeneralPageFooter"
import FAQs from "../sections/FAQs"
import GeneralStrip from "../sections/GeneralStrip"

import GeneralPageProvider from "../contexts/GeneralPageProvider"

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

export default function HelpPublic() {

    return (
        <GeneralPageProvider>
            <Skeleton>
                <GeneralStrip />

                <div className={Styles.body()}>
                    <FAQs faqs={faqs} />
                </div>

                <GeneralPageFooter />
            </Skeleton>
        </GeneralPageProvider>
    )
}