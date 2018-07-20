import React from 'react'
import PointResult from './PointResult'
import Board from '../OdooRpc/Board'
import PointDetail from './PointDetail'

export default class Result extends React.Component{
    state={
        scene:0,   //0, 8副牌成绩; 1, 每一副牌成绩详情
        result:null,
        oneResult:null,
    }   
    searchOneResult=(data)=>{
        console.log(data)
        this.setState({
            oneResult:data,
            scene:1,
        });
        console.log(this.state.oneResult)
    }
    toPointResult=()=>{
        this.setState({
            scene:0
        })
    }
    render(){
        return(
            <div>
                {this.state.scene===0?<PointResult searchOneResult={this.searchOneResult}></PointResult>:null}
                {this.state.scene===1?<PointDetail Detail={this.state.oneResult} toPointResult={this.toPointResult}></PointDetail>:null}
            </div>
        )
    }
}