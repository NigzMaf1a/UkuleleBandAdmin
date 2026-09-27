import endpoints from "../scripts/services/utils/endpoints"

export default class ProcessChat{
    static validateQuery(){}

    static validateEmail(){}

    static async sendChat(query:string):Promise<boolean>{
        try {
            const link = ''
            const address = `${link}`

            const res = await fetch(address, {
                method:'POST',
                body:JSON.stringify(query)
            })

            if(!res.ok){
                throw new Error('Failed to add your query')
            }

            return true
        } catch (error) {
            console.log('Chat Error:', error)
            return false
        }
    }
}