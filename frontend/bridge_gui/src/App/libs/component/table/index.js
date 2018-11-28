import React from 'react';
import Table from './table.js';
import './index.css'
const Tables = (props) => {
    const {tableList,size,scale}=props
    return (
        <div className="flexwrap">
            { tableList.map((item)=><Table user={item} key={item.name} size={size} scale={scale}></Table>)}
        </div>
    )
}
export default React.memo(Tables)