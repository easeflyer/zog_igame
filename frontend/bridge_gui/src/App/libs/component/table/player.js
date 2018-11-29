import React from 'react';
import './index.css';
import Prepare from './prepare'
const Player = (props) => {
    const { user, size } = props
    return (
        <div className="userPlayer flexRow">
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
                    <Prepare size={size} status={user.status}/></div>
                <div style={{ fontSize: size / 2 + "px" }}>{user.rank}</div>
            </div>
        </div>
    )
}
export default React.memo(Player)