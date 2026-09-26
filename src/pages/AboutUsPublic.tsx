import Skeleton from "../components/Skeleton copy"

import GeneralPageFooter from "../components/GeneralPageFooter"

import GeneralStrip from "../sections/GeneralStrip"

import GeneralPageProvider from "../contexts/GeneralPageProvider"

export default function AboutUsPublic() {
    return (
        <GeneralPageProvider>
            <Skeleton>
                <GeneralStrip />

                About Us

                <GeneralPageFooter />
            </Skeleton>
        </GeneralPageProvider>
    )
}