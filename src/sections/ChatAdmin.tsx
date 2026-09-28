import { useEffect, useState, type FormEvent } from "react"

import GeneralStyles from "../tailwind/general"

import ProcessChat from "../functions/chat_admin"

export default function ChatAdmin() {
    const [query, setQuery] = useState('')
    const [email, setEmail] = useState('')

    const [queryValid, setQueryValid] = useState(false)
    const [emailValid, setEmailValid] = useState(false)

    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)

    const [queryStyle, setQueryStyle] = useState<string>('')
    const [emailStyle, setEmailStyle] = useState<string>('')

    useEffect(() => {
        const baseStyle = GeneralStyles.chatAdmin().input
        const validQuery = `${baseStyle} !border-green-500`
        const invalidQuery = `${baseStyle} !border-red-500`

        if (!query.trim()) {
            setQueryStyle(baseStyle)
            return
        }

        setQueryStyle(queryValid ? validQuery : invalidQuery)
    }, [query, queryValid])

    useEffect(() => {
        const baseStyle = GeneralStyles.chatAdmin().email
        const validEmail = `${baseStyle} !border-green-500`
        const invalidEmail = `${baseStyle} !border-red-500`

        if (!email.trim()) {
            setEmailStyle(baseStyle)
            return
        }

        setEmailStyle(emailValid ? validEmail : invalidEmail)
    }, [email, emailValid])

    const handleQueryChange = (value: string) => {
        setQuery(value)
        setQueryValid(ProcessChat.validateQuery(value))
    }

    const handleEmailChange = (value: string) => {
        setEmail(value)
        setEmailValid(ProcessChat.validateEmail(value))
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        setSubmitted(true)

        const isQueryValid = ProcessChat.validateQuery(query)
        const isEmailValid = ProcessChat.validateEmail(email)

        setQueryValid(isQueryValid)
        setEmailValid(isEmailValid)

        if (!isQueryValid || !isEmailValid) {
            return
        }

        setLoading(true)

        try {
            await ProcessChat.sendChat(query)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form
            className={GeneralStyles.chatAdmin().body}
            onSubmit={handleSubmit}
            noValidate
        >
            <p className={GeneralStyles.chatAdmin().title}>
                Chat Admin
            </p>

            <div className={GeneralStyles.chatAdmin().cont}>
                <label className={GeneralStyles.chatAdmin().label}>
                    Query
                </label>

                <input
                    type="text"
                    name="query"
                    value={query}
                    onChange={(event) => handleQueryChange(event.target.value)}
                    className={queryStyle}
                    aria-invalid={submitted && query.length > 0 && !queryValid}
                    autoComplete="off"
                />
            </div>

            <div className={GeneralStyles.chatAdmin().cont}>
                <label className={GeneralStyles.chatAdmin().label}>
                    Email
                </label>

                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(event) => handleEmailChange(event.target.value)}
                    className={emailStyle}
                    aria-invalid={submitted && email.length > 0 && !emailValid}
                    autoComplete="email"
                />
            </div>

            <button
                type="submit"
                className={GeneralStyles.chatAdmin().btn}
                disabled={loading}
            >
                {loading ? 'Submitting...' : 'Submit'}
            </button>
        </form>
    )
}