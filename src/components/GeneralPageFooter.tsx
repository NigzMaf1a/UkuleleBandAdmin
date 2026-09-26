import { useNavigate } from "react-router-dom"

//components
import ContactText from "../sections/ContactText"

export default function GeneralPageFooter() {
    const navigate = useNavigate()

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
        <div className={`${Styles.body()}`}>
            <div className={`${Styles.sector()}`}>
                <p className={`${Styles.text()}`} onClick={() => Navigation.aboutUs()}>About Us</p>

                <div className={`${Styles.tray()}`}>
                    <p className={`${Styles.sectorText()}`}>who we are</p>
                    <p className={`${Styles.sectorText()}`}>our services</p>
                    <p className={`${Styles.sectorText()}`}>get started</p>
                </div>
            </div>

            <div className={`${Styles.sector()}`}>
                <p className={`${Styles.text()}`} onClick={() => Navigation.contactUs()}>Contact Us</p>

                <div className={`${Styles.tray()}`}>
                    <ContactText label="Email :" text="@@@" link="" />
                    <ContactText label="Instagram :" text="@@@" link="" />
                    <ContactText label="Facebook :" text="@@@" link="" />
                    <ContactText label="Phone :" text="@@@" link="" />
                    <ContactText label="P.O Box :" text="@@@" link="" />
                </div>
            </div>

            <div className={`${Styles.sector()}`}>
                <p className={`${Styles.text()}`} onClick={() => Navigation.help()}>Help </p>

                <div className={`${Styles.tray()}`}>
                    <p className={`${Styles.sectorText()}`}>FAQs</p>
                    <p className={`${Styles.sectorText()}`}>Navigation</p>
                    <p className={`${Styles.sectorText()}`}>Chatbot</p>
                </div>
            </div>
        </div>
    )
}