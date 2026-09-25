interface Props {
    icon: string
    label: string
    text: string
}

interface Styles {
    body: string
    icon: string
    image: string
    cont: string
    label: string
    text: string
}

export default function ContactElement({ icon, label, text }: Props) {
    function styles(): Styles {

        return {
            body: ``,
            icon: ``,
            image: ``,
            cont: ``,
            label: ``,
            text: ``
        }
    }

    return (
        <div className={`${styles().body}`}>
            <div className={`${styles().icon}`}>
                <img
                    className=""
                    src={`${icon}`}
                    alt="./ukulele.svg"
                />
            </div>

            <div className={`${styles().cont}`}>
                <div className={`${styles().label}`}>{label}</div>
                <div className={`${styles().text}`}>{text}</div>
            </div>
        </div>
    )
}
