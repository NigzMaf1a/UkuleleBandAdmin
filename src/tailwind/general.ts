interface FAQStyles {
    body: string
    cont: string
    cont_clicked: string
    label: (more?: string) => string
    text: (more?: string) => string
}

interface ChatStyles {
    body: string
    title: string
    cont: string
    label: string
    input: string
    email: string
    btn: string
}

interface WhoWeAreStyles {
    body: (more?: string) => string
    text: (more?: string) => string
}

interface ContactStyles {
    cont: (more?: string) => string
    item: (more?: string) => string
    right: (more?: string) => string
    left: (more?: string) => string
    img: (more?: string) => string
    label: (more?: string) => string
    text: (more?: string) => string
}

interface GetStartedStyles {
    body: (more?: string) => string
    strip: (more?: string) => string
    cont: (more?: string) => string
    btn: (more?: string) => string
}

export default class GeneralStyles {
    static cont = 'w-full h-125 flex flex-col'

    static faqs(): FAQStyles {
        const grid = 'grid grid-cols-2 gap-2 w-full px-2'

        const cont_dim = 'border rounded-xl hover:border-blue-500'
        const cont_flex = 'flex flex-col px-2 py-2'

        return {
            body: `${grid}`,
            cont: `${cont_dim} ${cont_flex} h-[70px] gap-1 border-blue-200`,
            cont_clicked: `${cont_dim} ${cont_flex} h-[140px] gap-3 border-blue-400`,
            label: (more?: string) => `text-blue-700 text-[17px] ${more}`,
            text: (more?: string) => `ml-2 text-sm ${more}`
        }
    }

    static chatAdmin(): ChatStyles {
        const body_dim = 'flex flex-col w-90 h-90 border-1 border-neutral-300 rounded-xl'

        return {
            body: `${body_dim} px-2 gap-2`,
            title: `text-center text-lg text-blue-500 pt-2`,
            cont: `w-full h-[120px] px-2`,
            label: `text-blue-500 text-lg`,
            input: `w-full h-[85px] border-1 border-neutral-300 hover:border-blue-300 focus:border-blue-600 rounded-xl px-1 py-1 flex`,
            email: `w-full h-[50px] border-1 border-neutral-300 hover:border-blue-300 focus:border-blue-600 rounded-xl px-1 py-1`,
            btn: `w-full h-[40px] bg-blue-500 text-white rounded-xl flex justify-center items-center hover:cursor-pointer mt-auto mb-4`
        }
    }

    static whoWeAre(): WhoWeAreStyles {

        return {
            body: (more?: string) => `mx-2 my-2 rounded-xl w-[98%] h-full  px-3 py-3 ${more}`,
            text: (more?: string) => `text-lg tracking-tight leading-tight ${more}`
        }
    }

    static ourServices() { }

    static getStarted(): GetStartedStyles {

        return {
            body: (more?: string) => `w-full h-full flex flex-col gap-1 ${more}`,
            strip: (more?: string) => `w-full h-[10%] flex flex-col justify-center items-center ${more}`,
            cont: (more?: string) => `w-full h-[90%] flex justify-center items-center ${more}`,
            btn: (more?: string) => `w-[130px] h-[40px] flex justify-center items-center bg-blue-500 rounded-xl hover:cursor-pointer ${more}`
        }
    }

    static contacts(): ContactStyles {

        return {
            cont: (more?: string) => `grid grid-cols-2 gap-2 w-full ${more}`,
            item: (more?: string) => `flex flex-row items-center h-[100px] rounded-xl ${more}`,
            left: (more?: string) => `w-[20%] h-full justify-center items-center rounded-full ${more}`,
            right: (more?: string) => `w-[80%] h-full flex flex-col gap-1 ${more}`,
            img: (more?: string) => `w-full h-full object-cover ${more}`,
            label: (more?: string) => `text-blue-500 text-[17px] ${more}`,
            text: (more?: string) => `text-sm pl-2 ${more}`
        }
    }
}