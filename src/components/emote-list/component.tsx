import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Emote } from '../../models/emote'
import './style.scss'

type PublicProps = {
  emotes: Emote[],
  selectedEmotes: Emote[],
  onSelectEmote(emote: Emote, remove?: boolean): void
}

type ListState = {}

export class EmoteList extends React.Component<PublicProps, ListState> {
  state = {}

  handleClick = (emote: Emote) => {
    const remove = this.props.selectedEmotes.indexOf(emote) > -1
    this.props.onSelectEmote(emote, remove)
  }

  render() {
    const { emotes, selectedEmotes } = this.props
    return (
      <div className="list">
        {emotes.map((emote: Emote) => (
          <button
            key={emote.id}
            className={`item ${selectedEmotes.indexOf(emote) > -1 ? 'active' : ''}`}
            onClick={() => this.handleClick(emote)}
            >
              <img src={emote.url} />
              <p className="name">
                {emote.id}
              </p>
          </button>
        ))}
        { !emotes.length && (
          <div className="empty">No emotes</div>
        )}
      </div>
    )
  }
}
