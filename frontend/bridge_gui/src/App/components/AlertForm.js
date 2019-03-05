import React from 'react'
import { Modal, Button, Input } from 'antd';
import { useState,useCallback } from 'react'
import 'antd/dist/antd.css'

// function AlertForm(){
//   const [isShow, setIsShow] = useState(false);
//   return(
//     <h1>333333333</h1>
//   );
// }

function AlertForm({bid,callback}) {
  const [isShow, setIsShow] = useState(true)
  const msgRef = React.useRef(null);
  const cb = useCallback((value)=>{
    setIsShow(false);
    callback(msgRef.current.state.value);
  });

  return (
    <div>
      <Modal
        title={`约定叫描述录入：${bid}`}
        visible={isShow}
        mask={false}
        closable={false}
        onOk={cb}
        onCancel={cb}
        footer={[
          <Button type="primary" onClick={()=>cb(1)}>确认</Button>,
          <Button onClick={()=>cb(0)}>取消</Button>
        ]}
        style={{top:'20vh',left:'-30vh'}}
      >
      <Input ref={msgRef} placeholder="请在此处详细输入约定叫描述！" />
      </Modal>
    </div>
  );
}

export default AlertForm;