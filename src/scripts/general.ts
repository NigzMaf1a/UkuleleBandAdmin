export interface AboutFunctions {
    whoWeAre: () => void
    ourServices: () => void
    getStarted: () => void
}

export interface HelpFunctions {
    faqs: () => void
    navigation: () => void
    chatbot: () => void
}

export default interface StripProps {
    about: AboutFunctions
    help: HelpFunctions
}