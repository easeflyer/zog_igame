import React from 'react';
import Tables from '../component/table';
import SideList from '../component/lists';
import './index.css'
class GameLobby extends React.Component {
  render() {
    var tableList = [{
      name: "张三",
      face: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1285622578,302277335&fm=27&gp=0.jpg",
      rank: "大师",
      status: "ok"
    }, {
      name: "张三",
      face: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1285622578,302277335&fm=27&gp=0.jpg",
      rank: "大师",
      status: "ok"
    }, {
      name: "张三",
      face: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1285622578,302277335&fm=27&gp=0.jpg",
      rank: "大师",
      status: "ok"
    }, {
      name: "张三",
      face: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1285622578,302277335&fm=27&gp=0.jpg",
      rank: "大师",
      status: "ok"
    },]
    tableList.forEach((item, index) => {
      tableList[index+4] = tableList[0]
    })
    return (
      <div className="lobby">
        <SideList />
        <Tables tableList={tableList} size={65} scale={0.05} margin={2} />
      </div>
    )
  }
}
export default GameLobby