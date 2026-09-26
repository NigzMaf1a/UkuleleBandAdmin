import { useNavigate } from "react-router-dom"

interface Props {
    label: string
    text: string
    link: string
}

interface Styles {
    body: string
    label: string
    text: string
}

export default function ContactText({ label, text, link }: Props) {
    const navigate = useNavigate()

    const gen_text = 'leading-tight tracking-tight text-sm'
    const link_text = 'text-white hover:cursor-pointer'

    function styles(): Styles {
        return {
            body: `w-full h-10 flex flex-row gap-1`,
            label: `${gen_text}`,
            text: `${gen_text} ${link_text}`
        }
    }

    return (
        <div className={styles().body}>
            <p className={styles().label}>
                {label}
            </p>

            <p className={styles().text} onClick={() => navigate(link)}>
                {text}
            </p>
        </div>
    )
}
