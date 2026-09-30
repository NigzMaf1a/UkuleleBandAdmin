import { useEffect, useState } from "react"

import Skeleton from "../components/Skeleton copy"
import GeneralPageFooter from "../components/GeneralPageFooter"
import GeneralStrip from "../sections/GeneralStrip"

import GeneralPageProvider from "../contexts/GeneralPageProvider"

import GeneralStyles from "../tailwind/general"

import type { Contact } from "./AboutAndContact"

type ContactKey = keyof Contact


export default function ContactUsPublic() {
    const [contact, setContact] = useState<Contact | undefined>()
    const [keys, setKeys] = useState<string[]>([])
    const [hoveredItemKey, setHoveredItemKey] = useState<string>('')
    const [itemBorder, setItemBorder] = useState<string>('border-1 border-neutral-300')

    useEffect(() => {
        const contacts: Contact = {
            emailaddress: 'Nigelkhasiani@gmail.com',
            phoneno: '0759736096',
            instagram: 'Nigel Khasiani',
            facebook: 'Nigz Maf',
            pobox: '7052/50100, Nakuru'
        }

        setContact(contacts)
        if (contact !== undefined) setKeys(Object.keys(contact))

    }, [contact])

    //icons for each property in Contact
    const icons: Contact = {
        emailaddress: '/account.svg',
        phoneno: '/account.svg',
        instagram: '/account.svg',
        facebook: '/account.svg',
        pobox: '/account.svg'
    }

    function getIconLink(key: ContactKey): string {
        return icons[key]
    }

    function getHoveredItemKey(key: ContactKey) {
        setHoveredItemKey(key)
    }

    function clearHoveredItemKey() {
        setHoveredItemKey('')
    }

    return (
        <GeneralPageProvider>
            <Skeleton>
                <GeneralStrip />

                <div className={`${GeneralStyles.cont} justify-center items-center`}>

                    <div className={GeneralStyles.contacts().cont()}>

                        {
                            keys !== undefined && keys.map(
                                (key) =>
                                    <div
                                        className={GeneralStyles.contacts().item(itemBorder)}
                                        onMouseEnter={() => getHoveredItemKey(key as ContactKey)}
                                        onMouseLeave={() => clearHoveredItemKey()}
                                    >
                                        <div className={GeneralStyles.contacts().left()}>
                                            <img
                                                className={''}
                                                src={getIconLink(key as keyof Contact)}
                                            />
                                        </div>

                                        <div className={GeneralStyles.contacts().right()}>
                                            <div className={GeneralStyles.contacts().label()}>
                                                {String(key).toUpperCase()}
                                            </div>

                                            <div className={GeneralStyles.contacts().text()}>
                                                {
                                                    contact !== undefined && String(contact[key as keyof Contact])
                                                }
                                            </div>
                                        </div>
                                    </div>
                            )
                        }

                    </div>

                </div>

                <GeneralPageFooter />
            </Skeleton>
        </GeneralPageProvider>
    )
}