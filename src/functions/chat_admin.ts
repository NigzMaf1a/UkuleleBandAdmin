import endpoints from "../scripts/services/utils/endpoints"

export default class ProcessChat {
    static validateQuery(query: string): boolean {
        return query.trim().length > 15
    }

    static validateEmail(email: string): boolean {
        const value = email.trim()

        if (!value) {
            return false
        }

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    }

    static async sendChat(query: string): Promise<boolean> {
        try {
            if (!this.validateQuery(query)) {
                return false
            }

            const link = ''

            const address = `${link}${endpoints.addQuery}`

            const response = await fetch(address, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: query.trim()
                })
            })

            if (!response.ok) {
                throw new Error('Failed to add your query')
            }

            return true
        } catch (error: unknown) {
            console.error('Chat Error:', error)

            return false
        }
    }
}