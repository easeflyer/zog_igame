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
        const dealer = {N:'',E:'',S:'',W:''};
        dealer[this.props.dealer] = this.props.logicDealer + '-Dealer';
        if( this.props.vul.toUpperCase()=='BOTH'){
            vuls['EW'] = 'hasVul';
            vuls['SN'] = 'hasVul';
        }else{
            vuls[this.props.vul.toUpperCase()] = 'hasVul';
        }

        return( 
            <div className='seats'>
                {/* <div className={'s1 '+vuls['SN']}>N-D</div>
                <div className={'s2 '+vuls['EW']}>W-Dealer</div>
                <div className={'s3 '+vuls['EW']}>E-D</div>
                <div className={'s4 '+vuls['SN']}>S-D</div> */}
                <div className ='sequence'>{this.props.sequence}</div>
                <div className={'s1 '+vuls['SN']}>{dealer['N']}</div>
                <div className={'s2 '+vuls['EW']}>{dealer['W']}</div>
                <div className={'s3 '+vuls['EW']}>{dealer['E']}</div>
                <div className={'s4 '+vuls['SN']}>{dealer['S']}</div>
            </div>
        )
    }
}

class Tricks extends Component{
    static defaultProps = {
            data:{
                winEW:0,
                winSN:0,
                contract:'',
                declarer:''
            }
        };
    render(){
        const winEW = this.props.data.winEW;
        const winSN = this.props.data.winSN;
        const contract = this.props.data.contract;
        const declarer = this.props.data.declarer;
        return(
            <div className='tricks'>
                <div className='s1'><br />SN<br />{winSN}</div>
                <div className='s2'><div>庄:{declarer}</div>{contract}</div>
                <div className='s3'>EW{winEW}</div>
            </div>
        )
    }
}

function fun1(data = false){
    if(typeof(data) == undefined) return false;
    return data;
}

export {Imps, Seats, Tricks}