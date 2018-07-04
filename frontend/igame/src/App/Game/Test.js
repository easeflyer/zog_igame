import { Table, Icon, Divider } from 'antd';

const columns = [{
  title: 'W',
  dataIndex: 'w',
  key: 'w',
  render: text => <a href="javascript:;">{text}</a>,
},{
    title: 'N',
    dataIndex: 'n',
    key: 'n',
    render: text => <a href="javascript:;">{text}</a>,
  },{
    title: 'E',
    dataIndex: 'e',
    key: 'e',
    render: text => <a href="javascript:;">{text}</a>,
  },{
    title: 'S',
    dataIndex: 's',
    key: 's',
    render: text => <a href="javascript:;">{text}</a>,
  }];

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}];

ReactDOM.render(<Table columns={columns} dataSource={data} />, mountNode);