import Skeleton from "../components/Skeleton copy"
import GeneralPageFooter from "../components/GeneralPageFooter"
import GeneralStrip from "../sections/GeneralStrip"

import GeneralPageProvider from "../contexts/GeneralPageProvider"

import GeneralStyles from "../tailwind/general"

export default function ContactUsPublic() {
    return (
        <GeneralPageProvider>
            <Skeleton>
                <GeneralStrip />

                <div className={GeneralStyles.cont}>
                    Contact Us
                </div>

                <GeneralPageFooter />
            </Skeleton>
        </GeneralPageProvider>
    )
}