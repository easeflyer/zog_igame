import React from 'react'
import Player from './player'
import './index.css'
import './player.css'
const Table = (props) => {
    const { user, size, scale, margin } = props;
    return (
        <div className="imgwrap" style={{ margin: margin + "px" }} >
            <div>
                {user[1] ? <Player
                    user={user[1]}
                    status={user[0].status}//不应该用索引选择，应该用东西南北标识。4个player依次为北西东南。
                    size={size * scale} /> : null}
            </div>
            <div className="middleimg">
                <div>
                    {user[1] ? <Player
                        user={user[1]}
                        status={user[0].status}
                        size={size * scale} /> : null}
                </div>
                <div
                    className="boards"
                    style={{ width: size + "px", height: size + "px", backgroundSize: size + "px" }}>
                </div>
                <div>
                    {user[1] ? <Player
                        user={user[1]}
                        status={user[0].status}
                        size={size * scale} /> : null}
                </div>
            </div>
            <div>
                {user[1] ? <Player
                    user={user[1]}
                    status={user[0].status}
                    size={size * scale} /> : null}
            </div>
        </div>
    )
}
export default React.memo(Table)    