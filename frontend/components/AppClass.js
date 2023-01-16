import React, {useState, useEffect, state} from 'react'
import axios from "axios"


const initState = {
  email: '',
  message: '',
  index: 4,
  steps: 0,
  x: 2,
  y: 2
}
const errors = {
  up: "You can't go up",
  down: "You can't go down",
  left: "You can't go left",
  right: "You can't go right",
}
export default class AppClass extends React.Component {
constructor() {
  super()
  this.state = initState
}


change = (e) => {
  const value = e.target.value
  this.setState({...this.state, email: value})
  console.log(this.state.email)
}
submit = (e) => {
  e.preventDefault()
  const user = {
    x: this.state.x,
    y: this.state.y,
    steps: this.state.steps,
    email: this.state.email
  }
  axios.post(`http://localhost:9000/api/result`, user)
  .then(res => {
    this.setState({...this.state, message: res.data.message})
  })
  .catch(err => {
    console.log(err)
    this.setState({...this.state, message: err.response.data.message})
  })
  this.setState({...this.state, email: '', x: 2, y: 2, steps: 0, index: 4})
}
move = (num, ref, cord) => {
  this.setState({...this.state, index: this.state.index + num, [ref]: this.state[ref] + cord, steps: this.state.steps + 1, message: ''})
}
up = () => {
const arr = [0, 1, 2]
const idx = this.state.index
if (!arr.includes(idx)) {
  this.move(-3, "x", -1)
} else {
  this.setState({...this.state, message: errors.up})
}
}
down = () => {
  const arr = [6, 7, 8]
  const idx = this.state.index
  if (!arr.includes(idx)) {
    this.move(3, "x", 1)
  } else {
    this.setState({...this.state, message: errors.down})
  }
}
left = () => {
  const arr = [0, 3, 6]
  const idx = this.state.index
  if (!arr.includes(idx)) {
    this.move(-1, "y", -1)
  } else {
    this.setState({...this.state, message: errors.left})
  }
}
right = () => {
  const arr = [2, 5, 8]
  const idx = this.state.index
  if (!arr.includes(idx)) {
  this.move(1, "y", 1)
  } else {
    this.setState({...this.state, message: errors.right})
  }
}

render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({this.state.y}, {this.state.x})</h3>
          <h3 id="steps">You moved {this.state.steps} {this.state.steps === 1 ? "time" : "times"}</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
                {idx === this.state.index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.left}>LEFT</button>
          <button id="up" onClick={this.up}>UP</button>
          <button id="right" onClick={this.right}>RIGHT</button>
          <button id="down" onClick={this.down}>DOWN</button>
          <button id="reset" onClick={() => {
            this.setState(initState)
          }}>reset</button>
        </div>
        <form onSubmit={this.submit}>
          <input id="email" type="email" placeholder="type email" value={this.state.email} onChange={this.change}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
