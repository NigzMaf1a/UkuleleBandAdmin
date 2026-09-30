import GeneralStyles from "../tailwind/general"

export default function WhoWeAre() {
    return (
        <div className={GeneralStyles.whoWeAre().body()}>
            <p className={GeneralStyles.whoWeAre().text()}>
                Who we are
            </p>
        </div>
    )
}