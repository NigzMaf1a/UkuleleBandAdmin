import { useNavigate } from "react-router-dom"

import ContactText from "../sections/ContactText"

import { useGeneralPage } from "../contexts/GeneralPageContext"

export default function GeneralPageFooter() {
    const navigate = useNavigate()

    const { about, help } = useGeneralPage()

    class Navigation {
        static aboutUs() {
            navigate('/aboutus')
        }

        static contactUs() {
            navigate('/contactus')
        }

        static help() {
            navigate('/help')
        }
    }

    class Styles {
        static text(): string {
            return `hover:cursor-pointer text-sm`
        }

        static sectorText(): string {
            return `hover:cursor-pointer text-white text-12`
        }

        static sector(): string {
            return `flex flex-col gap-1 w-[30%] h-full mb-auto pt-1`
        }

        static tray(): string {
            return `flex flex-col gap-0.5`
        }

        static body(): string {
            return `flex flex-row justify-evenly items-center w-full h-100 bg-slate-500 my-auto`
        }
    }

    return (
        <div className={Styles.body()}>
            <div className={Styles.sector()}>
                <p
                    className={Styles.text()}
                    onClick={Navigation.aboutUs}
                >
                    About Us
                </p>

                <div className={Styles.tray()}>
                    <p
                        className={Styles.sectorText()}
                        onClick={() => {
                            Navigation.aboutUs()
                            about.functions.whoWeAre()
                        }}
                    >
                        Who we are
                    </p>

                    <p
                        className={Styles.sectorText()}
                        onClick={() => {
                            Navigation.aboutUs()
                            about.functions.ourServices()
                        }}
                    >
                        Our services
                    </p>

                    <p
                        className={Styles.sectorText()}
                        onClick={() => {
                            Navigation.aboutUs()
                            about.functions.getStarted()
                        }}
                    >
                        Get started
                    </p>
                </div>
            </div>

            <div className={Styles.sector()}>
                <p
                    className={Styles.text()}
                    onClick={Navigation.contactUs}
                >
                    Contact Us
                </p>

                <div className={Styles.tray()}>
                    <ContactText label="Email :" text="@@@" link="" />
                    <ContactText label="Instagram :" text="@@@" link="" />
                    <ContactText label="Facebook :" text="@@@" link="" />
                    <ContactText label="Phone :" text="@@@" link="" />
                    <ContactText label="P.O Box :" text="@@@" link="" />
                </div>
            </div>

            <div className={Styles.sector()}>
                <p
                    className={Styles.text()}
                    onClick={Navigation.help}
                >
                    Help
                </p>

                <div className={Styles.tray()}>
                    <p
                        className={Styles.sectorText()}
                        onClick={() => {
                            Navigation.help()
                            help.functions.faqs()
                        }}
                    >
                        FAQs
                    </p>

                    <p
                        className={Styles.sectorText()}
                        onClick={() => {
                            Navigation.help()
                            help.functions.navigation()
                        }}
                    >
                        Navigation
                    </p>

                    <p
                        className={Styles.sectorText()}
                        onClick={() => {
                            Navigation.help()
                            help.functions.chatbot()
                        }}
                    >
                        Chat Admin
                    </p>
                </div>
            </div>
        </div>
    )
}