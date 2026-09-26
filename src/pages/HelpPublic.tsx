//components
import Skeleton from "../components/Skeleton copy"
import GeneralPageFooter from "../components/GeneralPageFooter"
import GeneralStrip from "../sections/GeneralStrip"

class Styles {
    static body(): string {
        const dim = 'w-full h-125 flex flex-row'

        return `${dim}`
    }
}


export default function HelpPublic() {

    return (
        <Skeleton>
            <GeneralStrip />

            <div className={Styles.body()}>
                Help
            </div>

            <GeneralPageFooter />
        </Skeleton>
    )
}
