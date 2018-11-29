import React from 'react';
import Table from './table.js';
import './index.css'
const Tables = (props) => {
    const {tableList,size=200,scale=0.1,margin=10}=props;//接口设置的数据结构应该适时改变。
    return (
        <div className="flexwrap">
            { tableList.map((item)=><Table user={item} key={item.name} size={size} scale={scale} margin={margin}></Table>)}
        </div>
    )
}
export default React.memo(Tables)