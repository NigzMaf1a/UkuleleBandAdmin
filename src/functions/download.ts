export default function downloadTheAndroidApp(): boolean {
    const link = ''

    try {
        const anchor = document.createElement('a')

        anchor.href = link
        anchor.download = ''
        anchor.click()

        return true
    } catch {
        return false
    }
}