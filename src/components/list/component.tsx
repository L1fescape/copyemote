import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { forEach } from 'lodash'

declare var process: {
  env: {
    AUTH_TOKEN: string
  }
}

const url = `https://slack.com/api/emoji.list?token=${process.env.AUTH_TOKEN}`

interface Emote {
  id: string
  url: string
}

type SlackResponse = {
  ok: boolean
  emoji: {[key: string]: string}
}

type ListState = {
  emotes: Emote[]
}

type PublicProps = {}

export class List extends React.Component<PublicProps, ListState> {
  state = {
    emotes: []
  }

  componentDidMount() {
    fetch(url)
      .then(resp => resp.json())
      .then((resp: SlackResponse) => {
        const emotes: Emote[] = []
        forEach(resp.emoji, (value, key) => {
          // handle aliased emojis
          if (value.indexOf('alias:') > -1) {
            value = resp.emoji[value.replace('alias:', '')]
          }
          emotes.push({id: key, url: value})
        })

        this.setState({
          emotes
        })
      })
  }


  render() {
    return (
      <div className="wrapper">
        {this.state.emotes.map((emote: Emote) => (
          <div key={emote.id}><img src={emote.url} /> {emote.id}</div>
        ))}
      </div>
    )
  }
}
