import { WebClient } from '@slack/web-api'

import {sleep } from '../utils/sleep'
import { giveawayDialog } from '../models/giveawayDialog'
import { GiveawayDialogSubmission } from '../types/dialogrestypes'
import { giveawayInitPost, giveawayWinnersPost } from '../models/giveawayPost'
import { ChatPostMessageResult, ReactionGetResult } from '../types/slackresulttypes'

export class CommandHandler {
    client: WebClient

    constructor(token: string) {
        this.client = new WebClient(token)
    }

    async openGiveawayDialog(trigger: string): Promise<any> {
        const res = await this.client.dialog.open({
            dialog: giveawayDialog,
            trigger_id: trigger
        })
        if (res.error)
            console.log('[Error] Error opening giveaway dialog.')
    }

    async startGiveaway(payload: GiveawayDialogSubmission): Promise<void> {
        const submission = payload.submission

        // type check fields
        if (
            submission.duration.match(/^[0-9]+$/) === null ||
            submission.numWinners.match(/^[0-9]+$/) === null
        ) {
            await this.client.chat.postEphemeral({
                channel: payload.channel.id,
                text: 'Unable to start giveaway. Please make sure the Duration' +
                    ' and Number of Winners fields contain only numbers.',
                user: payload.user.id
            })
            return
        }

        // Post giveaway info to channel
        const postReaction = (await this.client.chat.postMessage({
            channel: submission.channel,
            text: '',
            attachments: giveawayInitPost(submission)
        }) as ChatPostMessageResult)

        // Save the post's timestamp in order to grab reactions later
        const postTs = postReaction.ts

        // Bot reacts with giveaway emoji to get things started
        await this.client.reactions.add({
            name: 'tada',
            channel: submission.channel,
            timestamp: postTs
        })

        // sleep for duration of the giveaway
        await sleep(Number(submission.duration) * 60000)

        const getReactions = (await this.client.reactions.get({
            name: 'tada',
            channel: submission.channel,
            timestamp: postTs
        }) as ReactionGetResult)

        const reactions: string[] = getReactions.message.reactions[0].users.length > 1 ?
            getReactions.message.reactions[0].users : []

        // removes the bot's reaction because we don't want the bot to win
        reactions.shift()

        // select winners
        const numWinners: Number = Number(submission.numWinners)
        let winners: string = ''

        if (reactions.length === 0) {
            winners = 'No participants  '
        } else {
            for (let i = 0; i < numWinners; i++) {
                let winnerNum: number = Math.floor(Math.random() * reactions.length)
                if (reactions[winnerNum] !== undefined) {
                    winners += `<@${reactions[winnerNum]}>, `
                    reactions.splice(winnerNum, 1)
                }
            }
        }

        // announce winners to same channel
        await this.client.chat.postMessage({
            channel: submission.channel,
            text: '',
            attachments: giveawayWinnersPost(submission, winners)
        })
    }
}
