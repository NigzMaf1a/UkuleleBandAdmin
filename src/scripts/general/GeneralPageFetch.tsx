import { useEffect, useState } from 'react'

export interface About {
    detail: string
}

export interface Contact {
    phoneno: string
    emailaddress: string
    instagram: string
    facebook: string
    pobox: string
}

interface GeneralPageData {
    fetched: boolean
    loading: boolean
    error: string | null
    about: About | null
    contact: Contact | null
}

interface GeneralApiResponse {
    about: About
    contact: Contact
}

async function fetcher<T>(link: string): Promise<T> {
    const response = await fetch(link)

    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
    }

    return response.json() as Promise<T>
}

export default function useGeneralFetch(): GeneralPageData {
    const [about, setAbout] = useState<About | null>(null)
    const [contact, setContact] = useState<Contact | null>(null)
    const [loading, setLoading] = useState(true)
    const [fetched, setFetched] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let cancelled = false

        async function fetchGeneralData(): Promise<void> {
            try {
                setLoading(true)
                setError(null)

                const data = await fetcher<GeneralApiResponse>(
                    '/api/general'
                )

                if (cancelled) {
                    return
                }

                setAbout(data.about)
                setContact(data.contact)
                setFetched(true)
            } catch (error: unknown) {
                if (cancelled) {
                    return
                }

                setFetched(false)

                if (error instanceof Error) {
                    setError(error.message)
                } else {
                    setError('Failed to fetch general page data')
                }
            } finally {
                if (!cancelled) {
                    setLoading(false)
                }
            }
        }

        void fetchGeneralData()

        return () => {
            cancelled = true
        }
    }, [])

    return {
        fetched,
        loading,
        error,
        about,
        contact
    }
}
