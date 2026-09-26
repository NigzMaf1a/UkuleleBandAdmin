import { createContext, useContext } from "react"

import type { AboutFunctions, HelpFunctions } from "../scripts/general"

import type { AboutSeg } from "../hooks/about"
import type { HelpSeg } from "../hooks/help"

interface GeneralPageContextValue {
    about: {
        segment: AboutSeg
        functions: AboutFunctions
    }
    help: {
        segment: HelpSeg
        functions: HelpFunctions
    }
}

export const GeneralPageContext =
    createContext<GeneralPageContextValue | null>(null)

export function useGeneralPage() {
    const context = useContext(GeneralPageContext)

    if (!context) {
        throw new Error(
            "useGeneralPage must be used within GeneralPageProvider"
        )
    }

    return context
}