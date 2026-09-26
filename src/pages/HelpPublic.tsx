import Skeleton from "../components/Skeleton copy"

import GeneralPageFooter from "../components/GeneralPageFooter"

import GeneralStrip from "../sections/GeneralStrip"

import GeneralPageProvider from "../contexts/GeneralPageProvider"

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
                    Help
                </div>

                <GeneralPageFooter />
            </Skeleton>
        </GeneralPageProvider>
    )
}