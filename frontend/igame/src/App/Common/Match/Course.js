import React from 'react';

export default class Course extends React.Component{
    state = {

    }
    componentWillMount(){
        //生命周期函数，页面渲染前调用
        const data = [
            {time1:'2018-01-30 10:00:00', time2:'2018-01-30 11:00:00', course:'排位赛第一轮'},
            {time1:'2018-01-30 11:15:00', time2:'2018-01-30 12:15:00', course:'排位赛第二轮'},
            {time1:'2018-01-30 14:30:00', time2:'2018-01-30 15:30:00', course:'排位赛第三轮'},
            {time1:'2018-01-30 15:45:00', time2:'2018-01-30 16:45:00', course:'排位赛第四轮'},
 
            {time1:'2018-02-02 10:00:00', time2:'2018-02-02 11:00:00', course:'排位赛第五轮'},
            {time1:'2018-02-02 11:15:00', time2:'2018-02-02 12:15:00', course:'排位赛第六轮'},
            {time1:'2018-02-02 14:30:00', time2:'2018-02-02 15:30:00', course:'排位赛第七轮'},
            {time1:'2018-02-02 15:45:00', time2:'2018-02-02 16:45:00', course:'排位赛第八轮'}
        ]
    
    }

    render() {
        return(
            // <Table columns={columns} dataSource={data} bordered />
            // <div>
                <table>
                    <thead>
                        <tr>
                            <th>日期</th>
                            <th>时间</th>
                            <th>队式赛</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>12553</td>
                        <td>12553</td>
                        <td>12553</td>
                    </tr>
                    <tr>
                        <td>12553</td>
                        <td>12553</td>
                        <td>12553</td>
                    </tr>
                    </tbody>
                    
                    
                </table>
            // </div>
        );
    }
}









// import { Table } from 'antd';

// // In the fifth row, other columns are merged into first column
// // by setting it's colSpan to be 0
// const renderContent = (value, row, index) => {
//   const obj = {
//     children: value,
//     props: {},
//   };
//   if (index === 4) {
//     obj.props.colSpan = 0;
//   }
//   return obj;
// };

// const columns = [{
//   title: 'Name',
//   dataIndex: 'name',
//   render: (text, row, index) => {
//     if (index < 4) {
//       return <a href="javascript:;">{text}</a>;
//     }
//     return {
//       children: <a href="javascript:;">{text}</a>,
//       props: {
//         colSpan: 5,
//       },
//     };
//   },
// }, {
//   title: 'Age',
//   dataIndex: 'age',
//   render: renderContent,
// }, {
//   title: 'Home phone',
//   colSpan: 2,
//   dataIndex: 'tel',
//   render: (value, row, index) => {
//     const obj = {
//       children: value,
//       props: {},
//     };
//     if (index === 2) {
//       obj.props.rowSpan = 2;
//     }
//     // These two are merged into above cell
//     if (index === 3) {
//       obj.props.rowSpan = 0;
//     }
//     if (index === 4) {
//       obj.props.colSpan = 0;
//     }
//     return obj;
//   },
// }, {
//   title: 'Phone',
//   colSpan: 0,
//   dataIndex: 'phone',
//   render: renderContent,
// }, {
//   title: 'Address',
//   dataIndex: 'address',
//   render: renderContent,
// }];

// const data = [{
//   key: '1',
//   name: 'John Brown',
//   age: 32,
//   tel: '0571-22098909',
//   phone: 18889898989,
//   address: 'New York No. 1 Lake Park',
// }, {
//   key: '2',
//   name: 'Jim Green',
//   tel: '0571-22098333',
//   phone: 18889898888,
//   age: 42,
//   address: 'London No. 1 Lake Park',
// }, {
//   key: '3',
//   name: 'Joe Black',
//   age: 32,
//   tel: '0575-22098909',
//   phone: 18900010002,
//   address: 'Sidney No. 1 Lake Park',
// }, {
//   key: '4',
//   name: 'Jim Red',
//   age: 18,
//   tel: '0575-22098909',
//   phone: 18900010002,
//   address: 'London No. 2 Lake Park',
// }, {
//   key: '5',
//   name: 'Jake White',
//   age: 18,
//   tel: '0575-22098909',
//   phone: 18900010002,
//   address: 'Dublin No. 2 Lake Park',
// }];

// ReactDOM.render(<Table columns={columns} dataSource={data} bordered />,
//   mountNode);