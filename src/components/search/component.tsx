import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Emote } from '../../models/emote'
import './style.scss'

type PublicProps = {
  onInput(string): void
}

export const Search: React.StatelessComponent<PublicProps> = (props: PublicProps) => {
  function onChange(e) {
    props.onInput(e.target.value)
  }

  return (
    <div className="search">
      <input placeholder="Filter" onChange={onChange} />
    </div>
  )
}
