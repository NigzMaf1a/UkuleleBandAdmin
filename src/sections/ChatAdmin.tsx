import { useState, type FormEvent } from "react"

import GeneralStyles from "../tailwind/general"

import ProcessChat from "../functions/chat_admin"

export default function ChatAdmin() {
    const [query, setQuery] = useState('')
    const [email, setEmail] = useState('')

    const [queryValid, setQueryValid] = useState(false)
    const [emailValid, setEmailValid] = useState(false)

    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)

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
                    className={GeneralStyles.chatAdmin().input}
                    aria-invalid={submitted && !queryValid}
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
                    className={GeneralStyles.chatAdmin().email}
                    aria-invalid={submitted && !emailValid}
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