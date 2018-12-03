import React from 'react';
import "./index.css"
class MatchTag extends React.PureComponent{
    changeSome(){
        this.props.changeColor();
    }
    render(){
        const {indexTrue,matchDetails}=this.props;
        return(
            <div  onClick={this.changeSome.bind(this)} style={{backgroundColor:indexTrue?"#1890ff":"#000c17"}} className="easein">
                <span style={{color:"white",}}>
                    {matchDetails.name}
                </span>
            </div>
        )
    }
}
export default MatchTag