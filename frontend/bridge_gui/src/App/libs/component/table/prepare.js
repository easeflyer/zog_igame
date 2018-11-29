import React from 'react';
import pre from '../../image/pre.svg';
import One from '../loading/one';
console.log(pre)
const Prepare = (props) => {
    const {size,status}=props
    return (
        <div style={{ display: "block"}}>
            <img
                style={{ width: size+"px", height:  size+"px" ,marginLeft:"4px"}}
                src={pre}
                alt="icon">
            </img>
           
        </div>
       
    )
}
export default React.memo(Prepare)