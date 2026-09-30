import GeneralStyles from "../tailwind/general"
import downloadTheAndroidApp from "../functions/download"

export default function GetStarted() {
    return (
        <div className={GeneralStyles.getStarted().body()}>
            <div className={GeneralStyles.getStarted().strip()}>
                Click the button below to download the android app
            </div>

            <div className={GeneralStyles.getStarted().cont()}>
                <div
                    className={GeneralStyles.getStarted().btn()}
                    onClick={() => {
                        if (downloadTheAndroidApp()) {
                            console.log('File dowloaded successfully')
                        } else {
                            console.log('Failed to download file')
                        }
                    }}
                >
                    Click
                </div>
            </div>
        </div>
    )
}