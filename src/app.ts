import express from 'express'
import argv from 'yargs'
import fs from 'fs'
import bodyParser from 'body-parser'

import { checkSlackRequest } from './utils/slackMiddleware'
import { connectNgrok } from './utils/connectNgrok'
import { CommandHandler } from './handlers/commandHandler'

function start(config: any) {
    const port = process.env.PORT || config.port
    const slackToken = process.env.SLACK_TOKEN || config.slack.token
    const isTestMode = argv.argv.test || false

    const app = express()
    const commandHandler = new CommandHandler(slackToken)

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))

    // catches verification requests sent by Slack when adding an endpoint
    app.use('/slack', checkSlackRequest)

    app.post('/slack/giveaway', (req, res) => {
        commandHandler.openGiveawayDialog(req.body.trigger_id)
        res.status(200).end()
    })

    app.post('/slack/interactivity', (req, res) => {
        const payload = JSON.parse(req.body.payload)

        if (payload.type === 'dialog_submission') {
            if (payload.callback_id === 'giveawayDialog') {
                commandHandler.startGiveaway(payload)
            }
        }

        res.status(200).end()
    })

    app.listen(port, () => {
        console.log(`[Success] App successfully running on ${port}.`)
        // starts a local Ngrok server which you can connect to Slack
        if (isTestMode) connectNgrok(port)
    })
}

fs.readFile('./config.json', (err, data) => {
    if (err) {
        console.log('[Error] Could not find config.json.');
        process.exit(1);
    }
    try {
        let config = JSON.parse(data.toString())
        start(config)
    } catch(e) {
        console.log('[Error] Trouble parsing config.json file. Please double check your file and try again.')
        process.exit(1)
    }
})
