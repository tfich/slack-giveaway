import { Dialog } from '@slack/web-api'

const giveawayElements: Dialog['elements'] = [
    {
        label: 'Channel',
        name: 'channel',
        type: 'select',
        data_source: 'channels',
        optional: false
    },
    {
        label: 'Giveaway Prize',
        name: 'prize',
        type: 'text',
        placeholder: '1 month membership',
        optional: false
    },
    {
        label: 'Duration',
        name: 'duration',
        type: 'text',
        hint: 'Answer in number of minutes. No more than 30.',
        placeholder: '5',
        optional: false
    },
    {
        label: 'Number of Winners',
        name: 'numWinners',
        type: 'text',
        placeholder: '2',
        optional: false
    },
    {
        label: 'Additional Info',
        name: 'info',
        type: 'textarea',
        optional: true
    }
]

export const giveawayDialog: Dialog = {
    title: 'Start Giveaway',
    callback_id: 'giveawayDialog',
    submit_label: 'start',
    elements: giveawayElements
}
