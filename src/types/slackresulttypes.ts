import { WebAPICallResult } from '@slack/web-api'

export interface ChatPostMessageResult extends WebAPICallResult {
    channel: string
    ts: string
    message: {
      text: string
    }
}

export interface ReactionGetResult extends WebAPICallResult {
    ok: boolean
    type: string
    channel: string
    message: ReactionGetMessage
    response_metadata: {
        scopes: string[]
        acceptedScopes: string[]
    }
}

interface ReactionGetMessage {
    type: string
    subtype: string
    text: string
    ts: string
    username: string
    bot_id: string
    attachments: ReactionGetAttachment[]
    permalink: string
    reactions: {
        name: string
        users: string[]
        count: number
    }[]
}

interface ReactionGetAttachment {
    author_name: string
    fallback: string
    title: string
    footer: string
    id: number
    color: string
    fields: {
        title: string
        value: string
        short: boolean
    }[]
}
