import { Emote } from './emote'

export type SlackEmoji = {[key: string]: string}

export type SlackTeam = {
  id: string
  name: string
}

export type SlackEmojiResponse = {
  ok: boolean
  emoji: SlackEmoji
}

export type SlackTeamResponse = {
  ok: boolean
  team: SlackTeam
}
