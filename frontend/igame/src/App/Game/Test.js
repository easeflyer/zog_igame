import React from 'react'
import Index2 from './Index2'
import Index3 from './Index3'
import { Button} from 'antd-mobile';

let test1=<Index2></Index2>

export default class TT extends React.Component{

    componentDidMount(){

    }

    toIndex=()=>{
        test1=<Index3></Index3>
        forceUpdate()
    }

    render(){
        return(
            <div>
                {test1}
                <Button onClick={this.toIndex}>确认</Button>
            </div>
        )
    }
}