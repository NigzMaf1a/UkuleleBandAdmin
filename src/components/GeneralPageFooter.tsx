import { useNavigate } from "react-router-dom"

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
            return ``
        }

        static body(): string {
            return ``
        }
    }

    return (
        <div className={`${Styles.body()}`}>
            <p className={`${Styles.text()}`} onClick={() => Navigation.aboutUs()}>About Us</p>
            <p className={`${Styles.text()}`} onClick={() => Navigation.contactUs()}>Contact Us</p>
            <p className={`${Styles.text()}`} onClick={() => Navigation.help()}>Help </p>
        </div>
    )
}