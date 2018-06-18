import React from 'react';
import { List } from 'antd-mobile';
import './Index.css';

const Item = List.Item;
const Brief = Item.Brief;

export default class Changeped extends React.Component {


    render() {
        return (
            <div>
                <List renderHeader={() => 'plese enter your password !'} className="my-list">
                    <Item arrow="horizontal" onClick={()=>{}}>修改密码1111111</Item>
                </List>
            </div>
        );
    }
}

