import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { List } from '../../components/list'
import { Emote } from '../../models/emote'
import { Team } from '../../models/team'

export type PublicProps = {
  teams: Team[]
}

export const IndexPage: React.StatelessComponent<PublicProps> = (props: PublicProps) => {
  return (
    <div className="wrapper">
      {props.teams.map(team => (
        <div key={team.name}>
          <p>{team.name}</p>
          <List emotes={team.emotes} />
        </div>
      ))}
    </div>
  )
}
