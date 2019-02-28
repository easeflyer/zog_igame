import React from 'react'
import { Modal, Button, Input } from 'antd';
import { useState } from 'react'
import 'antd/dist/antd.css'

// function AlertForm(){
//   const [isShow, setIsShow] = useState(false);
//   return(
//     <h1>333333333</h1>
//   );
// }

function AlertForm({bid}) {
  const [isShow, setIsShow] = useState(true)

  return (
    <div>
      <Modal
        title={`约定叫描述录入：${bid}`}
        visible={isShow}
        mask={false}
        closable={false}
        onOk={()=>setIsShow(false)}
        onCancel={()=>setIsShow(false)}
        footer={[
          <Button type="primary" onClick={()=>setIsShow(false)}>确认</Button>,
          <Button onClick={()=>setIsShow(false)}>取消</Button>
        ]}
        style={{top:'20vh',left:'-30vh'}}
      >
      <Input placeholder="请在此处详细输入约定叫描述！" />
      </Modal>
    </div>
  );
}

export default AlertForm;