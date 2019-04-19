import * as ngrok from 'ngrok'

export async function connectNgrok(port: number) {
    const url = await ngrok.connect(port);
    console.log(`[Success] App is publically-accessible on ${url} | ${url.split('://')[1].split('.ngr')[0]}`)
}
