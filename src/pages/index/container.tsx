import * as React from 'react'
import { IndexPage as IndexPageComponent, PublicProps } from './component'
import { Team } from '../../models/team'
import { getTeam, getAccessTokens } from '../../utils/slack'

// tmp until I really need redux
function connect(mapStateToProps) {
  return function(WrappedComponent) {
    return class Connect extends React.Component<{}, PublicProps> {
      state = {
        teams: []
      }
      componentDidMount() {
        const tokens: string[] = getAccessTokens()
        const promises: Promise<Team>[] = []
        tokens.forEach(token => promises.push(getTeam(token)))
        Promise.all(promises)
          .then((teams: Team[]) => {
            this.setState({ teams })
          })
          .catch(err => {
            this.setState({ teams: [] })
          })
      }
      render() {
        const props: PublicProps = mapStateToProps(this.state)
        return <WrappedComponent {...props} />
      }
    }
  }
}

function mapStateToProps(state) {
  const { teams } = state
  return {
    teams,
  }
}

export const IndexPage: React.ComponentClass<{}> = connect(mapStateToProps)(IndexPageComponent)
