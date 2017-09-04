import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Emote } from '../../models/emote'
import './style.scss'

type PublicProps = {
  emotes: Emote[]
}

type ListState = {}

export class EmoteList extends React.Component<PublicProps, ListState> {
  state = {}

  render() {
    const active = true
    return (
      <div className="list">
        {this.props.emotes.map((emote: Emote) => (
          <div key={emote.id} className={`item ${active ? 'active' : ''}`}>
            <img src={emote.url} />
            <span className="name">
              {emote.id}
            </span>
          </div>
        ))}
      </div>
    )
  }
}
