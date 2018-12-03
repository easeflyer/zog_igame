import React from 'react';
import Table from './table.js';
import Message from './message';
import './index.css';
import './table.css';
const TableCell = (props) => {
    const { user, size, scale, margin } = props
    return (
        <div className="flexColumn table-border table-card">
            <Message />
            <div className="flexRow table-border">
                <div className="table-split">
                    <Table user={user} key={user.name} size={size} scale={scale} margin={margin} type={"open"} />
                </div>
                <div >
                    <Table user={user} key={user.name} size={size} scale={scale} margin={margin} type={"open"} />
                </div>
            </div>
        </div>
    )
}
export default React.memo(TableCell)