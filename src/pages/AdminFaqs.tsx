import { useState } from "react"

import Strip from "../components/headers/Strip"
import Skeleton from "../components/Skeleton copy"
import Main from "../components/headers/Main"
import AdminFaqItem from "../sections/AdminFaqItem"

import type Faqs from "../interfaces/faqs"

const faqs: Faqs[] = [
    {
        FAQID: 1,
        Email: "@gmail.com",
        Question: "Too many",
        Answer: "State them",
        Approved: "No"
    },
    {
        FAQID: 2,
        Email: "@gmail.com",
        Question: "Too many",
        Answer: "",
        Approved: "No"
    },
    {
        FAQID: 3,
        Email: "@gmail.com",
        Question: "Too many",
        Answer: "State them",
        Approved: "No"
    },
    {
        FAQID: 4,
        Email: "@gmail.com",
        Question: "Too many",
        Answer: "",
        Approved: "No"
    },
    {
        FAQID: 5,
        Email: "@gmail.com",
        Question: "Too many",
        Answer: "State them",
        Approved: "Yes"
    }
]

interface Styles {
    page: string
}

export default function AdminFaqs() {

    const [selectedFaq, setSelectedFaq] = useState<number | null>(null)
    const [faqList, setFaqList] = useState<Faqs[]>(faqs)

    function styles(): Styles {
        const dim = "w-full h-[60%] px-2"

        return {
            page: `${dim} flex flex-col gap-2 overflow-y-scroll`
        }
    }

    function clickAction(faq: Faqs): void {
        setSelectedFaq((current) =>
            current === faq.FAQID ? null : faq.FAQID
        )
    }

    function updateFaq(updatedFaq: Faqs): void {
        setFaqList((current) =>
            current.map((faq) =>
                faq.FAQID === updatedFaq.FAQID
                    ? updatedFaq
                    : faq
            )
        )

        setSelectedFaq(null)
    }

    return (
        <Skeleton>

            <Strip title="" />

            <Main brand="Faqs" />

            <div className={styles().page}>

                {
                    faqList.length > 0 &&
                    faqList.map((faq) => (
                        <AdminFaqItem
                            key={faq.FAQID}
                            faq={faq}
                            clicked={selectedFaq === faq.FAQID}
                            onClick={clickAction}
                            onUpdate={updateFaq}
                        />
                    ))
                }

            </div>

        </Skeleton>
    )
}