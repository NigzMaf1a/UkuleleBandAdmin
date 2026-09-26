import type { AboutFunctions, HelpFunctions } from "../scripts/general"

export default class GeneralFunctions {

    static aboutFunctions(
        toggleWhoWeAre: () => void,
        toggleOurServices: () => void,
        toggleGetStarted: () => void
    ): AboutFunctions {
        return {
            whoWeAre: toggleWhoWeAre,
            ourServices: toggleOurServices,
            getStarted: toggleGetStarted
        }
    }

    static helpFunctions(
        toggleFaq: () => void,
        toggleNavigation: () => void,
        toggleChatbot: () => void
    ): HelpFunctions {
        return {
            faqs: toggleFaq,
            navigation: toggleNavigation,
            chatbot: toggleChatbot
        }
    }
}