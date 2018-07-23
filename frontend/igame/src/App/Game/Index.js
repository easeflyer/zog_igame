import React from 'react'
import PlayerInfo from './PlayerInfo';
import Result from './Point/Result'

export default class CardsTable extends React.Component{
    state={
        scene:0,
    }

    toResult=()=>{
        this.setState({
            scene:1
        })
    }
    render(){
        return(
            <div>
                {this.state.scene===0?<PlayerInfo toResult={this.toResult} ></PlayerInfo>:null}
                {this.state.scene===1?<Result></Result>:null}
            </div>
        )
    }
}