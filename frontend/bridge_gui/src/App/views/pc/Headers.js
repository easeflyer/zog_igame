import React, { Component } from 'react';
import './Headers.css'
/**
 * 结果直接写在　生命周期函数里 异步获取即可。
 */
class Imps extends Component {
    render(){
        return(
            <div className='imps'>
                <div className='iheader'>IMPs</div>
                <div className='ibody'>NS:-4.8<br />EW:4.8</div>
            </div>
        )
    }
}
/**
 * s1-s4  NWES
 */
class Seats extends Component{
    render(){
        const vuls = {EW:'',SN:''};
        if( this.props.vul.toUpperCase()=='BOTH'){
            vuls['EW'] = 'hasVul';
            vuls['SN'] = 'hasVul';
        }else{
            vuls[this.props.vul.toUpperCase()] = 'hasVul';
        }

        return( 
            <div className='seats'>
                <div className={'s1 '+vuls['SN']}>D</div>
                <div className={'s2 '+vuls['EW']}></div>
                <div className={'s3 '+vuls['EW']}></div>
                <div className={'s4 '+vuls['SN']}></div>
            </div>
        )
    }
}

class Tricks extends Component{
    render(){
        return(
            <div className='tricks'>
                <div className='s1'><br />1</div>
                <div className='s2'>2</div>
                <div className='s3'>3</div>
            </div>
        )
    }
}
export {Imps, Seats, Tricks}