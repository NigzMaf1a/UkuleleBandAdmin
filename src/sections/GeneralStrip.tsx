import type { AboutFunctions, HelpFunctions } from "../scripts/general"
import GeneralFunctions from "../functions/general"

interface BtnProps {
    label: string
    onClick: () => void
}

const styles = 'flex flex-row w-full h-full justify-evenly items-center'

function Button({ label, onClick }: BtnProps) {
    const styles = 'w-30 h-10 flex rounded-xl items-center justify-center bg-white text-blue-500 hover:cursor-pointer'

    return <div className={styles} onClick={() => onClick()}>{label}</div>
}

function HelpStrip({ faqs, navigation, chatbot }: HelpFunctions) {

    return (
        <div className={styles}>
            <Button label="FAQs" onClick={() => faqs()} />
            <Button label="Navigation" onClick={() => navigation()} />
            <Button label="Chatbot" onClick={() => chatbot()} />
        </div>
    )
}

function ContactStrip() {

    return (
        <div className={styles}>

        </div>
    )
}

function AboutStrip({ whoWeAre, ourServices, getStarted }: AboutFunctions) {

    return (
        <div className={styles}>
            <Button label="Who we are" onClick={() => whoWeAre()} />
            <Button label="Our services" onClick={() => ourServices()} />
            <Button label="Get started" onClick={() => getStarted()} />
        </div>
    )
}

export default function GeneralStrip() {
    type Path = '/aboutus' | '/contactus' | '/help'

    const path: Path = location.pathname as Path

    console.log('Path', path)

    return (
        <div className="w-full h-[80px] flex flex-row bg-blue-500 py-2 justify-center items-center">
            {
                path === '/aboutus' ? <AboutStrip
                    whoWeAre={GeneralFunctions.aboutFunctions().whoWeAre}
                    ourServices={GeneralFunctions.aboutFunctions().ourServices}
                    getStarted={GeneralFunctions.aboutFunctions().getStarted}
                /> :

                    path === '/contactus' ? <ContactStrip /> :

                        <HelpStrip
                            faqs={GeneralFunctions.helpFunctions().faqs}
                            navigation={GeneralFunctions.helpFunctions().navigation}
                            chatbot={GeneralFunctions.helpFunctions().chatbot}
                        />
            }
        </div>
    )
}