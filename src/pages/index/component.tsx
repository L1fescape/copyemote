import * as React from 'react'
import { Team } from '../../models/team'
import { Emote } from '../../models/emote'
import { EmoteList } from '../../components/emote-list'
import { Search } from '../../components/search'
import './style.scss'

export type PublicProps = {
  teams: Team[]
}

type State = {
  query: string
  selectedEmotes: {[key: string]: Emote[]}
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

  filterEmotes = (query: string, emotes: Emote[]): Emote[] => {
    query = query.toLowerCase()
    return emotes.filter(emote => emote.id.indexOf(query) > -1)
  }

  handleSelectEmote = (teamName: string, emote: Emote, remove?: boolean): void => {
    const { selectedEmotes } = this.state
    const teamSelectedEmotes = selectedEmotes[teamName] || []
    let teamEmotes = teamSelectedEmotes.concat([emote])

    if (remove) {
      const index = teamSelectedEmotes.indexOf(emote)
      teamEmotes = [
        ...teamSelectedEmotes.slice(0, index),
        ...teamSelectedEmotes.slice(index+1),
      ]
    }

    this.setState({
      selectedEmotes: {
        ...selectedEmotes,
        [teamName]: teamEmotes
      }
    })

  }

  render() {
    const { query, selectedEmotes } = this.state
    const { teams } = this.props
    return (
      <div className="wrapper">
        <div className="team-container">
          { teams.map(team => (
            <div key={team.id} className="team" id={team.name}>
              <div className="team-name">{team.name}</div>
              <EmoteList
                emotes={this.filterEmotes(query, team.emotes)}
                selectedEmotes={selectedEmotes[team.name] || []}
                onSelectEmote={(emote, remove) => this.handleSelectEmote(team.name, emote, remove)}
              />
            </div>
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
