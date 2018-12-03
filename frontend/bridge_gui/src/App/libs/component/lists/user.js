import React from 'react';
import Player from '../table/player.js';
const UserTag = (props) => {
    const { user }=props
    return (
        <div style={{backgroundColor:"#002140",color:"white"}}>
            <Player user={user} prepare={false} size={40}/>
        </div>
    )
}
export default React.memo(UserTag)