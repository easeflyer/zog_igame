import React from 'react';
import TableCell from './tableCell.js';
import './index.css'
const Tables = (props) => {
    const { tableList, size = 200, scale = 0.1, margin = 10 } = props;//接口设置的数据结构应该适时改变。
    return (
        <div  className="tableBack">
            <div className="flexwrap">
                {tableList.map((item) => <TableCell user={item} key={item.name} size={size} scale={scale} margin={margin} type={"open"}></TableCell>)}
            </div>
            <div>
            </div>
        </div>
    )
}
export default React.memo(Tables)