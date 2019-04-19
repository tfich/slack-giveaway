import { MessageAttachment } from '@slack/web-api'
import { GiveawaySelections } from '../types/dialogrestypes'

export function giveawayInitPost(
    selections: GiveawaySelections
    ): MessageAttachment[] {
    let post = {
        fallback: `New Giveaway - ${selections.prize}`,
        title: selections.prize,
        color: '#000000',
        text: 'React with :tada: to enter!\n',
        fields: [
            {
                title: 'Duration:',
                value: `${selections.duration} minute(s)`,
                short: true
            },
            {
                title: 'Number of winners:',
                value: selections.numWinners,
                short: true
            }
        ],
        footer: 'Giveaway Bot',
        footer_icon: 'https://i.imgur.com/gUKoDXh.jpg'
    }

    post.text += selections.info ? selections.info : ''

    return [post]
}

export function giveawayWinnersPost(
    selections: GiveawaySelections,
    winners: string): MessageAttachment[] {
    return [{
        fallback: `Giveaway Complete - ${selections.prize}`,
        title: `:tada: ${selections.prize} :tada:`,
        color: '#000000',
        text: `*Winner(s):* ${winners.slice(0, -2)}`
    }]
}
