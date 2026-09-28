interface FAQStyles{
    body: string
    cont: string
}

interface ChatStyles{
    body: string
    title: string
    cont: string
    label: string
    input: string
    email:string
    btn: string
}

export default class GeneralStyles{
    static cont = 'w-full h-125 flex flex-col'

    static faqs(){}

    static navigation():string{
        return ``
    }

    static chatAdmin():ChatStyles{
        const body_dim = 'flex flex-col w-90 h-90 border-1 border-neutral-300 rounded-xl'

        return {
            body:`${body_dim} px-2 gap-2`,
            title:`text-center text-lg text-blue-500 pt-2`,
            cont:`w-full h-[150px] px-2`,
            label:`text-blue-500 text-lg`,
            input:`w-full h-[100px] border-1 border-neutral-300 hover:border-blue-500 rounded-xl px-1 py-1 flex`,
            btn:`w-full h-[40px] bg-blue-500 text-white rounded-xl flex justify-center items-center hover:cursor-pointer mt-auto mb-4`
        }
    }

    static whoWeAre(){}

    static ourServices(){}
    
    static getStarted(){}
}