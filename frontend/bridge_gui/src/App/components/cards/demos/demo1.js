import React from 'react'
import {Card} from "../card"


const App = () => {
  const style={
    width:30*0.7+"vh",
    height:"30vh"
  }
  return <div>
    <Card name="C5" size="20"/>
    <Card name="C6" size="20"/>
    <div style={style}><Card name="S2" /></div>
  </div>
}


export default App;