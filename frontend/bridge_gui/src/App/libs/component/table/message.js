import React from 'react';
import './index.css'
const Message = (props) => {
    const { team1 = "中国队", team2 = "韩国队" } = props
    return (
        <div style={{width:"100%",padding:"8px",boxSizing:"border-box"}}>
            <div style={{ textAlign: "center", marginBottom: "4px",}}>比赛信息</div>
            <div  style={{ textAlign: "center",position:"relative"}} className="clearfix" >
                <span>{team1}vs{team2}</span>
                <span style={{right:"0",cursor:"pointer",color:"red",position:"absolute"}}>详情</span>
            </div>
        </div>
    )
}
export default React.memo(Message)