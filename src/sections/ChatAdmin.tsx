import GeneralStyles from "../tailwind/general"

export default function ChatAdmin() {
    return (
        <div className={GeneralStyles.chatAdmin().body}>
            <p className={GeneralStyles.chatAdmin().title}>
                Chat Admin
            </p>

            <div className={GeneralStyles.chatAdmin().cont}>
                <p className={GeneralStyles.chatAdmin().label}>
                    Query
                </p>

                <input
                    className={GeneralStyles.chatAdmin().input}
                />

            </div>

            <div className={GeneralStyles.chatAdmin().btn}>
                Submit
            </div>
        </div>
    )
}