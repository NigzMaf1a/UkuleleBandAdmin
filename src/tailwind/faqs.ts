export default class FaqFeatureStyles {

    static cont_dim = "w-full rounded-xl"

    static itemBody(clicked: boolean): string {
        const height = clicked ? "min-h-[260px]" : "h-[80px]"
        const border = clicked ? "border-blue-500" : "border-gray-200"

        return `
            w-full
            ${height}
            rounded-xl
            border-1
            ${border}
            bg-white
            overflow-hidden
            transition-all
            duration-200
        `
    }

    static clickedCont(): string {
        return `
            ${this.cont_dim}
            flex
            flex-col
            gap-4
            px-4
            pb-4
        `
    }

    static notClickedCont(): string {
        return `
            ${this.cont_dim}
            h-[80px]
            flex
            flex-row
            items-center
            gap-4
            px-4
            cursor-pointer
        `
    }

    static tray(): string {
        return `
            w-full
            flex
            flex-col
            gap-3
        `
    }

    static btnTray(): string {
        return `
            w-full
            flex
            justify-end
            items-center
            gap-2
        `
    }

    static btn(answer: string): string {
        const hasAnswer = answer.trim().length > 0

        return `
            shrink-0
            min-w-[110px]
            px-4
            py-2
            rounded-lg
            text-sm
            font-semibold
            text-white
            text-center
            cursor-pointer
            transition
            duration-200
            ${hasAnswer
                ? "bg-green-600 hover:bg-green-700"
                : "bg-yellow-500 hover:bg-yellow-600"
            }
        `
    }

    static saveBtn(): string {
        return `
            px-5
            py-2
            rounded-lg
            bg-blue-600
            text-white
            text-sm
            font-semibold
            cursor-pointer
            transition
            duration-200
            hover:bg-blue-700
        `
    }

    static row(): string {
        return `
            w-full
            flex
            flex-col
            gap-1
        `
    }

    static label(): string {
        return `
            text-xs
            font-semibold
            uppercase
            tracking-wide
            text-gray-500
        `
    }

    static text(): string {
        return `
            w-full
            rounded-lg
            bg-gray-50
            px-3
            py-2
            text-sm
            text-gray-800
        `
    }

    static input(): string {
        return `
            w-full
            rounded-lg
            border
            border-gray-300
            px-3
            py-2
            text-sm
            outline-none
            transition
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-100
        `
    }

    static approvalRow(): string {
        return `
            flex
            items-center
            gap-5
        `
    }

    static radioLabel(): string {
        return `
            flex
            items-center
            gap-2
            text-sm
            text-gray-700
            cursor-pointer
        `
    }

    static plus(): string {
        return `
            w-6
            shrink-0
            text-center
            text-xl
            font-semibold
            text-gray-500
        `
    }

    static faqQwiz(): string {
        return `
            flex-1
            min-w-0
            truncate
            text-sm
            font-medium
            text-gray-800
        `
    }
}