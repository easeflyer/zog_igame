import React from 'react'
import Player from './player'
import './index.css'
import './player.css'
const Table = (props) => {
    const { user, size, scale } = props;
    return (
        <div className="imgwrap" >
            <div>
                <Player
                    user={user[0]}//不应该用索引选择，应该用东西南北标识。
                    size={size * scale} />
            </div>
            <div className="middleimg">
                <div>
                    <Player
                        user={user[1]}
                        size={size * scale} />
                </div>
                <div className="boards" style={{ width: size + "px", height: size + "px", backgroundSize: size + "px" }}>
                </div>
                <div>
                    <Player
                        user={user[2]}
                        size={size * scale} />
                </div>
            </div>
            <div>
                <Player
                    user={user[3]}
                    size={size * scale} />
            </div>
        </div>
    )
}
export default React.memo(Table)    