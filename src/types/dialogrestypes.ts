export interface GiveawayDialogSubmission {
    type: string
    token: string
    action_ts: string
    team: SlackTeam
    user: SlackUser
    channel: SlackChannel
    submission: GiveawaySelections
    callback_id: string
    response_url: string
    state: string
}

export interface SlackChannel {
    id: string
    name: string
}

export interface SlackUser {
    id: string
    name: string
}

export interface GiveawaySelections {
    channel: string
    prize: string
    duration: string
    numWinners: string
    info: string
}

export interface SlackTeam {
    id: string
    domain: string
}
