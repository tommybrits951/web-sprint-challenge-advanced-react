import React, { useState, useEffect } from 'react'
import axios from 'axios'


const errors = {
  up: "You can't go up",
  down: "You can't go down",
  left: "You can't go left",
  right: "You can't go right",
}

export default function AppFunctional(props) {
 const [spot, setSpot] = useState({
  email: '',
  message: '',
  steps: 0,
  index: 4,
  x: 2,
  y: 2 
 })

function move(num, ref, cord) {
  setSpot({
    ...spot,
    message: '',
    steps: spot.steps + 1,
    index: spot.index + num,
    [ref]: spot[ref] + cord
  })
  console.log(spot)
}

function up() {
  const arr = [0, 1, 2];
  if (!arr.includes(spot.index)) {
    move(-3, "x", -1)
  } else {
    setSpot({...spot, message: errors.up})
  }
}
function down() {
  const arr = [6, 7, 8];
  if (!arr.includes(spot.index)) {
    move(3, "x", 1)
  } else {
    setSpot({...spot, message: errors.down})
  }
}
function left() {
  const arr = [0, 3, 6];
  if (!arr.includes(spot.index)) {
    move(-1, "y", -1)
  } else {
    setSpot({...spot, message: errors.left})
  }
}
function right() {
  const arr = [2, 5, 8];
  if (!arr.includes(spot.index)) {
    move(1, "y", 1)
  } else {
    setSpot({...spot, message: errors.right})
  }
}


function change(e) {
  const {value} = e.target
  setSpot({...spot, email: value})
}


function submit(e) {
  e.preventDefault()
  const user = {
    x: spot.y,
    y: spot.x,
    steps: spot.steps,
    email: spot.email
  }
console.log(spot)
  axios.post(`http://localhost:9000/api/result`, user)
  .then(res => {
    
    setSpot({...spot, message: res.data.message, email: ''})
  })
  .catch(err => {
    setSpot({...spot, message: err.response.data.message, email: ''})
  })
} 
function reset() {
  setSpot({
    email: '',
    message: '',
    steps: 0,
    index: 4,
    x: 2,
    y: 2     
  })
}
  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates ({spot.y}, {spot.x})</h3>
        <h3 id="steps">You moved {spot.steps} {spot.steps === 1 ? "time" : "times"}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === spot.index ? ' active' : ''}`}>
              {idx === spot.index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{spot.message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={left}>LEFT</button>
        <button id="up" onClick={up}>UP</button>
        <button id="right" onClick={right}>RIGHT</button>
        <button id="down" onClick={down}>DOWN</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form onSubmit={submit}>
        <input id="email" type="email" placeholder="type email" value={spot.email} onChange={change}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
