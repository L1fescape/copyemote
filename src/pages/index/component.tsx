import * as React from 'react'
import { Team as TeamModel } from '../../models/team'
import { Team } from '../../components/team'
import { Search } from '../../components/search'
import './style.scss'

export type PublicProps = {
  teams: TeamModel[]
}

export class IndexPage extends React.Component<PublicProps> {
  state = {
    query: ''
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

  render() {
    const { query } = this.state
    const { teams } = this.props
    return (
      <div className="wrapper">
        { teams.map(team => (
          <Team key={team.name} team={this.filterEmotes(query, team)} />
        )) }
        <Search onInput={this.handleSearch} />
      </div>
    )
  }
}
