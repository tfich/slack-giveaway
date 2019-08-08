import { WebAPICallResult } from '@slack/web-api'

export interface IChatPostMessageResult extends WebAPICallResult {
    channel: string
    ts: string
    message: {
      text: string
    }
}

export interface IReactionGetResult extends WebAPICallResult {
    ok: boolean
    type: string
    channel: string
    message: IReactionGetMessage
    response_metadata: {
        scopes: string[]
        acceptedScopes: string[]
    }
}

interface IReactionGetMessage {
    type: string
    subtype: string
    text: string
    ts: string
    username: string
    bot_id: string
    attachments: IReactionGetAttachment[]
    permalink: string
    reactions: Array<{
        name: string
        users: string[]
        count: number
    }>
}

interface IReactionGetAttachment {
    author_name: string
    fallback: string
    title: string
    footer: string
    id: number
    color: string
    fields: Array<{
        title: string
        value: string
        short: boolean
    }>
}
