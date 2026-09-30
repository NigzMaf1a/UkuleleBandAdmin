import { useState } from "react"
import type Faqs from "../interfaces/faqs"
import GeneralStyles from "../tailwind/general"

interface Props {
    faqs: Faqs[]
}

export default function FAQs({ faqs }: Props) {
    const [clickedFaqId, setClickedFaqId] = useState<number>(1)

    return (
        <div className={GeneralStyles.faqs().body}>
            {
                faqs.map(
                    (f) =>
                        <div
                            key={f.FAQID}
                            className={clickedFaqId === f.FAQID ? `${GeneralStyles.faqs().cont_clicked} ` : `${GeneralStyles.faqs().cont} flex-row! items-center`}
                            onClick={() => { setClickedFaqId(f.FAQID) }}
                        >
                            {
                                clickedFaqId !== f.FAQID &&
                                <div className="rounded-full text-blue-500 text-[50px] h-10 w-10 flex items-center justify-center">
                                    +
                                </div>
                            }

                            <div>
                                <div className={GeneralStyles.faqs().label()}>Question</div>
                                <div className={GeneralStyles.faqs().text()}>{f.Question}</div>
                            </div>

                            {
                                clickedFaqId === f.FAQID &&
                                <div>
                                    <div className={GeneralStyles.faqs().label()}>Answer</div>
                                    <div className={GeneralStyles.faqs().text()}>{f.Answer}</div>
                                </div>
                            }
                        </div>
                )
            }
        </div>
    )
}