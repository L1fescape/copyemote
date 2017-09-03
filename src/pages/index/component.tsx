import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { List } from '../../components/list'

export const IndexPage: React.StatelessComponent<{}> = () => {
  return (
    <div className="wrapper">
      <List />
    </div>
  )
}
