import { useState } from "react"
import type Faqs from "../interfaces/faqs"

interface Props {
    faqs: Faqs[]
}

export default function FAQs({ faqs }: Props) {
    const [answer, setAnswer] = useState<string>(faqs[0].Answer)

    //style composition
    const borders = 'border-1 border-neutral-300 rounded-xl'

    const body = 'flex flex-row w-full h-full mx-1 gap-1'
    const left = `${borders} w-[60%]`
    const right = `flex flex-col gap-1 w-[40%] ${borders}`
    const text = ''
    const label = 'text-center text-blue-500 text-sm'
    const response = ''
    const quest_body = ''

    function getAnswer(id: number) {
        const ans = faqs.find(f => f.FAQID === id)?.Answer as string
        setAnswer(ans)
    }

    return (
        <div className={body}>
            <div className={left}>
                <p className={label}>Question</p>
                {
                    faqs.map(
                        f =>
                            <div className={quest_body} onClick={() => getAnswer(f.FAQID)}>
                                <p className={text}>{f.Question}</p>
                            </div>
                    )
                }
            </div>

            <div className={right}>
                <p className={label}>Answer</p>

                <div className={response}>
                    {answer}
                </div>
            </div>
        </div>
    )
}