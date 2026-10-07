import { useEffect, useState } from "react"
import type { MouseEvent } from "react"

import type Faqs from "../interfaces/faqs"
import FaqFeatureStyles from "../tailwind/faqs"

interface Props {
    clicked: boolean
    onClick: (faq: Faqs) => void
    onUpdate: (faq: Faqs) => void
    faq: Faqs
}

export default function AdminFaqItem({
    clicked,
    onClick,
    onUpdate,
    faq
}: Props) {

    const [answer, setAnswer] = useState(faq.Answer)
    const [approved, setApproved] = useState<Faqs["Approved"]>(faq.Approved)

    useEffect(() => {
        setAnswer(faq.Answer)
        setApproved(faq.Approved)
    }, [faq])

    function btnLabel(approved: Faqs["Approved"]): string {
        return approved === "Yes" ? "Approved" : "Answer"
    }

    function handleStatusClick(event: MouseEvent<HTMLDivElement>): void {
        event.stopPropagation()
        onClick(faq)
    }

    function handleUpdate(event: MouseEvent<HTMLButtonElement>): void {
        event.stopPropagation()

        onUpdate({
            ...faq,
            Answer: answer,
            Approved: approved
        })
    }

    return (
        <div className={FaqFeatureStyles.itemBody(clicked)}>

            <div
                className={FaqFeatureStyles.notClickedCont()}
                onClick={() => onClick(faq)}
            >
                <div className={FaqFeatureStyles.plus()}>
                    {clicked ? "-" : "+"}
                </div>

                <div className={FaqFeatureStyles.faqQwiz()}>
                    {faq.Question}
                </div>

                <div
                    className={FaqFeatureStyles.btn(faq.Answer)}
                    onClick={handleStatusClick}
                >
                    {btnLabel(faq.Approved)}
                </div>
            </div>

            {
                clicked && (
                    <div className={FaqFeatureStyles.clickedCont()}>

                        <div className={FaqFeatureStyles.tray()}>

                            <div className={FaqFeatureStyles.row()}>
                                <div className={FaqFeatureStyles.label()}>
                                    Question
                                </div>

                                <div className={FaqFeatureStyles.text()}>
                                    {faq.Question}
                                </div>
                            </div>

                            <div className={FaqFeatureStyles.row()}>
                                <div className={FaqFeatureStyles.label()}>
                                    Answer
                                </div>

                                <input
                                    type="text"
                                    value={answer}
                                    onChange={(event) => setAnswer(event.target.value)}
                                    placeholder="Provide an answer..."
                                    className={FaqFeatureStyles.input()}
                                />
                            </div>

                            <div className={FaqFeatureStyles.approvalRow()}>

                                <div className={FaqFeatureStyles.label()}>
                                    Approved
                                </div>

                                <label className={FaqFeatureStyles.radioLabel()}>
                                    <input
                                        type="radio"
                                        name={`approved-${faq.FAQID}`}
                                        checked={approved === "Yes"}
                                        onChange={() => setApproved("Yes")}
                                    />

                                    Yes
                                </label>

                                <label className={FaqFeatureStyles.radioLabel()}>
                                    <input
                                        type="radio"
                                        name={`approved-${faq.FAQID}`}
                                        checked={approved === "No"}
                                        onChange={() => setApproved("No")}
                                    />

                                    No
                                </label>

                            </div>

                        </div>

                        <div className={FaqFeatureStyles.btnTray()}>

                            <button
                                type="button"
                                className={FaqFeatureStyles.saveBtn()}
                                onClick={handleUpdate}
                            >
                                Update FAQ
                            </button>

                        </div>

                    </div>
                )
            }

        </div>
    )
}