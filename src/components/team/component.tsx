import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { EmoteList } from '../emote-list'
import { Team as TeamModel } from '../../models/team'
import { Emote } from '../../models/emote'
import './style.scss'

type PublicProps = {
  team: TeamModel,
  selectedEmotes: Emote[],
  onSelectEmote(emote: Emote, remove?: boolean): void
}

export class Team extends React.Component<PublicProps> {
  render() {
    const { team, selectedEmotes, onSelectEmote } = this.props
    return (
      <div className="team" id={team.name}>
        <div className="team-name">{team.name}</div>
        <EmoteList emotes={team.emotes} selectedEmotes={selectedEmotes} onSelectEmote={onSelectEmote} />
      </div>
    )
  }
}
