import React, { Component } from 'react'
import {
  // Observer,
  observer,
} from 'mobx-react'
import { runInAction } from 'mobx'

export const CounterClass = observer(
  class extends Component {
    // constructor(props) {
    //   super(props)
    //   this.state = {
    //     count: this.props.initialCount,
    //   }
    // }
    store = this.props.store

    componentDidMount() {
      runInAction(() => {
        this.store.count = this.props.initialCount
      })
    }

    componentDidUpdate(prevProps) {
      if (this.props.initialCount !== prevProps.initialCount) {
        runInAction(() => {
          this.store.count = this.props.initialCount
        })
      }
    }

    render() {
      return (
        <div>
          {/* <Observer>
            {() => ( */}
          <h2 style={{ color: this.store.color }}>
            counter: {this.store.count}
          </h2>
          {/* )}
          </Observer> */}

          <button onClick={this.store.dec}>-</button>
          <button onClick={this.store.inc}>+</button>
        </div>
      )
    }
  },
)
