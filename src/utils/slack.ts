import { forEach } from 'lodash'
import {
  SlackEmoji,
  SlackEmojiResponse,
  SlackTeam,
  SlackTeamResponse
} from '../models/slack'
import { Team } from '../models/team'
import { Emote } from '../models/emote'

const BASE_URL = 'https://slack.com/api'

declare var process: {
  env: {
    AUTH_TOKEN: string
  }
}

function convertTeamEmotes(slackEmojis: SlackEmoji): Emote[] {
  const emotes: Emote[] = []
  forEach(slackEmojis, (value: string, key: string) => {
    // handle aliased emojis
    if (value.indexOf('alias:') > -1) {
      value = slackEmojis[value.replace('alias:', '')]
    }
    emotes.push({id: key, url: value})
  })
  return emotes
}

function getTeamEmotes(token: string): Promise<SlackEmoji> {
  return fetch(`${BASE_URL}/emoji.list?token=${token}`)
    .then(resp => resp.json())
    .then((resp: SlackEmojiResponse) => resp.emoji)
}

function getTeamInfo(token: string): Promise<SlackTeam> {
  return fetch(`${BASE_URL}/team.info?token=${token}`)
    .then(resp => resp.json())
    .then((resp: SlackTeamResponse) => resp.team)
}

export function getAccessTokens(): string[] {
  const tokens = process.env.AUTH_TOKEN || ''
  return tokens.split(',').map(token => token.trim())
}

export function getTeam(token: string): Promise<Team> {
  if (!token) {
    return Promise.reject({ name: '', emotes: [] })
  }
  return Promise.all([
    getTeamInfo(token),
    getTeamEmotes(token),
  ]).then(resp => ({
    name: resp[0].name,
    emotes: convertTeamEmotes(resp[1])
  }))
}
