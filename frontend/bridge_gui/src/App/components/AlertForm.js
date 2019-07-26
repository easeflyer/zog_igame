import React from 'react'
import { Modal, Button, Input,Radio } from 'antd';
import { useState,useCallback } from 'react'
import 'antd/dist/antd.css'

// function AlertForm(){
//   const [isShow, setIsShow] = useState(false);
//   return(
//     <h1>333333333</h1>
//   );
// }
// if (value) callback(msgRef.current.state.value);
// else callback(false) // 取消约定叫


function AlertForm({bid,callback}) {
  const [isShow, setIsShow] = useState(true)
  const msgRef = React.useRef(null);
  const cb = useCallback((value)=>{
    setIsShow(false);
    if (value) callback(msgRef.current.state.value);
    else callback(false);
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
        style={{top:'20vh',left:'-30vh',textAlign:'center'}}
      >
      {/* <Input ref={msgRef} placeholder="请在此处详细输入约定叫描述！" /> */}
      {/* 下面的代码用 单选框代替 输入框提交 alert message */}
      <Radio.Group ref={msgRef} defaultValue="a" buttonStyle="solid" style={{align:'center'}}>
        <Radio.Button value="1"> 1 </Radio.Button>
        <Radio.Button value="2"> 2 </Radio.Button>
        <Radio.Button value="3"> 3 </Radio.Button>
        <Radio.Button value="4"> 4 </Radio.Button>
        <Radio.Button value="5"> 5 </Radio.Button>
        <Radio.Button value="6"> 6 </Radio.Button>
        <Radio.Button value="7"> 7 </Radio.Button>
        <Radio.Button value="8"> 8 </Radio.Button>
        <Radio.Button value="9"> 9 </Radio.Button>
        <Radio.Button value="10"> 10 </Radio.Button>
      </Radio.Group>      
      </Modal>
    </div>
  );
}

export default AlertForm;