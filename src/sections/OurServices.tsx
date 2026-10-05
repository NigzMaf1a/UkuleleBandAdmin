import GeneralStyles from "../tailwind/general"

export default function OurServices() {
    const item = GeneralStyles.ourServices().item()

    const genres: string[] = [
        'Zilizopendwa',
        'Reggae',
        'Rhumba',
        'Soul',
        'RnB'
    ]

    return (
        <div className={GeneralStyles.ourServices().body()}>
            <div className={GeneralStyles.ourServices().cont()}>
                <div className={GeneralStyles.ourServices().head()}>
                    Our Highly esteemed band specializes in :
                </div>

                <ul className="mt-1 flex flex-col gap-1">
                    <li className={item}>Live band performance</li>
                    <li className={item}>Sound system lending</li>
                </ul>
            </div>

            <div className={GeneralStyles.ourServices().cont()}>
                <div className={GeneralStyles.ourServices().head()}>
                    Across genres :
                </div>

                <ul className="mt-1 flex flex-col gap-1">
                    {
                        genres.map(
                            (g) =>
                                <li className={GeneralStyles.ourServices().item()}>
                                    {g}
                                </li>
                        )
                    }
                </ul>
            </div>
        </div>
    )
}