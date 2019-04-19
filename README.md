# Slack Giveaway Bot
Start a fun and engaging giveaway within your Slack workspace

## How to Run
```
git clone https://github.com/tfich/slack-giveaway.git
cd slack-giveaway
npm install
npm start
```

## Set Up
If you're not using environmental variables, just edit `config.example.json` and then rename to `config.json`

If you are, set the following to variables:
|     Name    |                                     Value & Description                                     |
|-------------|---------------------------------------------------------------------------------------------|
| SLACK_TOKEN | Token provided by Slack. Should have the required 'bot' scope and should start with 'xoxb-' |
| PORT        | Port that the bot will run on. Ignore if you're deploying to Heroku.                        |

You only need to do one of the above methods.

## Configure Slack App

- Go [here](https://api.slack.com/apps?new_app=1) and create a new bot with desired Bot Name / Workspace

- Under 'Features' select 'Slash Commands' and add a `/giveaway` command.
    - The Request URL should be `https://<YOUR DOMAIN NAME>/slack/giveaway`

-  Under 'Basic Information' install the app to your workspace.

- Under 'Basic Information' select 'Bot Users' and then add a bot user.
    - You can find your bot's token under 'OAuth & Permissions'

- Back under 'Basic Features' select 'Install your app to your workspace' and then add bot to your workspace.

- Under 'Features' select 'Interactive Components' and turn it on.
    - Set the Request URL to `https://<YOUR DOMAIN NAME>/slack/interactivity`





# slack-giveaway
