import { useEffect, useState } from "react"

import type About from "../interfaces/about"
import type { Contact } from "../pages/AboutAndContact"

import endpoints from "../scripts/services/utils/endpoints"

interface GeneralData {
    loading: boolean
    error: unknown
    about: About | null
    contact: Contact | null
}

export default function useGeneralData(): GeneralData {
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<unknown>(null)
    const [about, setAbout] = useState<About | null>(null)
    const [contact, setContact] = useState<Contact | null>(null)

    const backend_link = "https://ukulelebackend.onrender.com"

    useEffect(() => {
        const fetchGeneralData = async (): Promise<void> => {
            try {
                setLoading(true)
                setError(null)

                const [aboutResponse, contactResponse] = await Promise.all([
                    fetch(`${backend_link}${endpoints.fetchAbout}`),
                    fetch(`${backend_link}${endpoints.fetchContacts}`)
                ])

                if (!aboutResponse.ok) {
                    throw new Error(
                        `Failed to fetch about data: ${aboutResponse.status} ${aboutResponse.statusText}`
                    )
                }

                if (!contactResponse.ok) {
                    throw new Error(
                        `Failed to fetch contact data: ${contactResponse.status} ${contactResponse.statusText}`
                    )
                }

                const [aboutData, contactData] = await Promise.all([
                    aboutResponse.json() as Promise<About>,
                    contactResponse.json() as Promise<Contact>
                ])

                setAbout(aboutData)
                setContact(contactData)
            } catch (error: unknown) {
                setError(error)
                setAbout(null)
                setContact(null)
            } finally {
                setLoading(false)
            }
        }

        void fetchGeneralData()
    }, [])

    return {
        loading,
        error,
        about,
        contact
    }
}