import * as ngrok from 'ngrok'
import signale from 'signale'

export async function connectNgrok(port: number) {
    const url = await ngrok.connect(port)
    signale.success(`[Success] App is publically-accessible on ${url} | ${url.split('://')[1].split('.ngr')[0]}`)
}
