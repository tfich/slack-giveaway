export interface IGiveawayDialogSubmission {
    type: string
    token: string
    action_ts: string
    team: ISlackTeam
    user: ISlackUser
    channel: ISlackChannel
    submission: IGiveawaySelections
    callback_id: string
    response_url: string
    state: string
}

export interface ISlackChannel {
    id: string
    name: string
}

export interface ISlackUser {
    id: string
    name: string
}

export interface IGiveawaySelections {
    channel: string
    prize: string
    duration: string
    numWinners: string
    info: string
}

export interface ISlackTeam {
    id: string
    domain: string
}
