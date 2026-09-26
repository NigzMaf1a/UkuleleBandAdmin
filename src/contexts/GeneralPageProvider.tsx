import type { ReactNode } from "react"

import GeneralFunctions from "../functions/general"

import useAbout from "../hooks/about"
import useHelp from "../hooks/help"

import { GeneralPageContext } from "./GeneralPageContext"

interface Props {
    children: ReactNode
}

export default function GeneralPageProvider({ children }: Props) {
    const about = useAbout()
    const help = useHelp()

    const aboutFunctions = GeneralFunctions.aboutFunctions(
        about.toggleWhoWeAre,
        about.toggleOurServices,
        about.toggleGetStarted
    )

    const helpFunctions = GeneralFunctions.helpFunctions(
        help.toggleFaq,
        help.toggleNavigation,
        help.toggleChatbot
    )

    return (
        <GeneralPageContext.Provider
            value={{
                about: {
                    segment: about.segment,
                    functions: aboutFunctions
                },
                help: {
                    segment: help.segment,
                    functions: helpFunctions
                }
            }}
        >
            {children}
        </GeneralPageContext.Provider>
    )
}