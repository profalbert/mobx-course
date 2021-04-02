import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { configure } from 'mobx'

// Цель enforceActions состоит в том,
// чтобы вы не забыли обернуть обработчики событий в action
configure({
  enforceActions: 'always',
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
  disableErrorBoundaries: true,
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)
