import type { AboutFunctions, HelpFunctions } from "../scripts/general"

export default class GeneralFunctions {
    static aboutFunctions(): AboutFunctions {
        return {
            whoWeAre: () => {
                console.log('You mean you have never heard of us')
            },

            ourServices: () => { },

            getStarted: () => { }
        }
    }

    static helpFunctions(): HelpFunctions {
        return {
            faqs: () => { },

            navigation: () => { },

            chatbot: () => { }
        }
    }
}