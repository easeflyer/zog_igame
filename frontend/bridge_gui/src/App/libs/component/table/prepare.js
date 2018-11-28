import React from 'react';
import pre from '../../image/pre.svg';
console.log(pre)
const Prepare = (props) => {
    const {size}=props
    return (
        <div style={{ display: "inline-block", }}>
            <img
                style={{ width: size/2+"px", height:  size/2+"px" }}
                src={pre}
                alt="icon">
            </img>
        </div>
    )
}
export default React.memo(Prepare)