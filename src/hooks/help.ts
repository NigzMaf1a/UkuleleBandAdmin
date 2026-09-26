import { useState } from "react"

export type HelpSeg = 'faqs' | 'navigation' | 'chatbot'

interface Props {
    segment: HelpSeg
    toggleFaq: () => void
    toggleNavigation: () => void
    toggleChatbot: () => void
}

export default function useHelp(): Props {
    const [segment, setSegment] = useState<HelpSeg>('faqs')

    function toggleFaq() {
        setSegment('faqs')
    }

    function toggleNavigation() {
        setSegment('navigation')
    }

    function toggleChatbot() {
        setSegment('chatbot')
    }

    return {
        segment,
        toggleFaq,
        toggleNavigation,
        toggleChatbot
    }
}