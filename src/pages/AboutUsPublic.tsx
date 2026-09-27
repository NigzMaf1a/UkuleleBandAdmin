import Skeleton from "../components/Skeleton copy"
import GeneralPageFooter from "../components/GeneralPageFooter"
import GeneralStrip from "../sections/GeneralStrip"
import WhoWeAre from "../sections/WhoWeAre"
import OurServices from "../sections/OurServices"
import GetStarted from "../sections/GetStarted"

import GeneralPageProvider from "../contexts/GeneralPageProvider"
import { useGeneralPage } from "../contexts/GeneralPageContext"

import GeneralStyles from "../tailwind/general"

function AboutContent() {
    const { about } = useGeneralPage()

    switch (about.segment) {
        case 'whoWeAre':
            return <WhoWeAre />

        case 'ourServices':
            return <OurServices />

        case 'getStarted':
            return <GetStarted />
    }
}

export default function AboutUsPublic() {
    return (
        <GeneralPageProvider>
            <Skeleton>
                <GeneralStrip />

                <div className={GeneralStyles.cont}>
                    <AboutContent />
                </div>

                <GeneralPageFooter />
            </Skeleton>
        </GeneralPageProvider>
    )
}