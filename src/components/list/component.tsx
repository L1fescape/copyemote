import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Emote } from '../../models/emote'

type PublicProps = {
  emotes: Emote[]
}

type ListState = {}

export class List extends React.Component<PublicProps, ListState> {
  state = {}

  render() {
    return (
      <div className="wrapper">
        {this.props.emotes.map((emote: Emote) => (
          <div key={emote.id}><img src={emote.url} /> {emote.id}</div>
        ))}
      </div>
    )
  }
}
