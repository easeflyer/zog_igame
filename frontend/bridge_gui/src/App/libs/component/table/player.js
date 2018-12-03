import React from 'react';
import './index.css';
import Prepare from './prepare'
const Player = (props) => {
    const { user, size, prepare = true } = props
    return (  
        <div className="cricleRed">
            
        </div>
    )
}
export default React.memo(Player)
/*<div className="userPlayer flexRow">
            <div>
                <img
                    className="userImg"
                    style={{ width: size * 1.5 + "px", height: size * 1.5 + "px" }}
                    src={user.face}
                    alt="用户头像" />
            </div>
            <div className="userMessage">
                <div style={{ fontSize: size / 2 + "px" }} className="flexRow">
                    <span>{user.name}</span>
                   { prepare?<Prepare size={size} status={user.status} />:null}
                </div>
                <div style={{ fontSize: size / 2 + "px" }}>{user.rank}</div>
            </div>
</div>*/