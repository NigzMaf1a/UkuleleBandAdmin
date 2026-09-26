import { useState } from "react"

export type AboutSeg = 'whoWeAre' | 'ourServices' | 'getStarted'

interface Props {
    segment: AboutSeg
    toggleWhoWeAre: () => void
    toggleOurServices: () => void
    toggleGetStarted: () => void
}

export default function useAbout(): Props {
    const [segment, setSegment] = useState<AboutSeg>('whoWeAre')

    function toggleWhoWeAre() {
        setSegment('whoWeAre')
    }

    function toggleOurServices() {
        setSegment('ourServices')
    }

    function toggleGetStarted() {
        setSegment('getStarted')
    }

    return {
        segment,
        toggleWhoWeAre,
        toggleOurServices,
        toggleGetStarted
    }
}