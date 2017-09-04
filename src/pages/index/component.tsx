import * as React from 'react'
import { Team as TeamModel } from '../../models/team'
import { Emote as EmoteModel } from '../../models/emote'
import { Team } from '../../components/team'
import { Search } from '../../components/search'
import './style.scss'

export type PublicProps = {
  teams: TeamModel[],
}

type State = {
  query: string
  selectedEmotes: {[key: string]: EmoteModel[]}
}

export class IndexPage extends React.Component<PublicProps> {
  state = {
    query: '',
    selectedEmotes: {}
  }

  handleSearch = (query: string) => {
    this.setState({
      query
    })
  }

  filterEmotes = (query: string, team: TeamModel): TeamModel => {
    return {
      ...team,
      emotes: team.emotes.filter(emote => emote.id.indexOf(query) > -1)
    }
  }

  handleSelectEmote = (teamName: string, emote: EmoteModel, remove?: boolean): void => {
    const { selectedEmotes } = this.state
    const teamSelectedEmotes = selectedEmotes[teamName] || []
    if (remove) {
      const index = teamSelectedEmotes.indexOf(emote)
      this.setState({
        selectedEmotes: {
          ...selectedEmotes,
          [teamName]: [
            ...teamSelectedEmotes.slice(0, index),
            ...teamSelectedEmotes.slice(index+1),
          ]
        }
      })
    } else {
      this.setState({
        selectedEmotes: {
          ...selectedEmotes,
          [teamName]: teamSelectedEmotes.concat([emote])
        }
      })
    }

  }

  render() {
    const { query, selectedEmotes } = this.state
    const { teams } = this.props
    return (
      <div className="wrapper">
        <div className="team-container">
          { teams.map(team => (
            <Team
              key={team.name}
              team={this.filterEmotes(query, team)}
              selectedEmotes={selectedEmotes[team.name] || []}
              onSelectEmote={(emote, remove) => this.handleSelectEmote(team.name, emote, remove)}
              />
          )) }
        </div>
        <div className="footer-container">
          { !!teams.length && (
            <div className="jump-container">
              <span>Jump to: </span>
              { teams.map(team => <a key={team.id} href={`#${team.name}`}>{team.name}</a>) }
            </div>
          )}
          <div className="search-container">
            <Search onInput={this.handleSearch} />
          </div>
        </div>
      </div>
    )
  }
}
