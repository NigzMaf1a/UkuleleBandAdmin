import Skeleton from "../components/Skeleton copy"

import GeneralPageFooter from "../components/GeneralPageFooter"

import GeneralStrip from "../sections/GeneralStrip"

import GeneralPageProvider from "../contexts/GeneralPageProvider"

export default function ContactUsPublic() {
    return (
        <GeneralPageProvider>
            <Skeleton>
                <GeneralStrip />

                Contact Us

                <GeneralPageFooter />
            </Skeleton>
        </GeneralPageProvider>
    )
}