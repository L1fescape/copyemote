import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { EmoteList } from '../emote-list'
import { Team as TeamModel } from '../../models/team'
import './style.scss'

type PublicProps = {
  team: TeamModel
}

export class Team extends React.Component<PublicProps> {
  render() {
    const { team } = this.props
    return (
      <div className="team">
        <div className="team-name">{team.name}</div>
        <EmoteList emotes={team.emotes} />
      </div>
    )
  }
}
