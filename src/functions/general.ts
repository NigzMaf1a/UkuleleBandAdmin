import type { AboutFunctions, HelpFunctions } from "../scripts/general"

import useHelp from "../hooks/help"

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
            faqs: (fun: () => void) => {
                fun()
            },

            navigation: () => { },

            chatbot: () => { }
        }
    }
}