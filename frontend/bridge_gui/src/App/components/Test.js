import { withRouter } from 'react-router-dom';
import React from 'react';
import { inject, observer } from 'mobx-react';



@inject('testStore')
@observer
class Test extends React.Component {
  async fun1(){
    let j = 0;
    for(let i=0;i<99999999;i++) j=i**j;
    console.log('什么时候输出');
    return '我后输出';
  }

  render(){
  
    const testStore = this.props.testStore;
    const {v1,v2,v3,setV1,setV2} = testStore;



    //this.fun1().then((data)=>console.log(data))
    const fn = this.fun1();
    fn.then((data)=>console.log(data));
    console.log('我先输出');




    v2.observe(function(change) {
      console.log('.............',change.oldValue, "->", change.newValue);
    });    
    return(
      <div>
      <h1>Test:v1:{v1},v2:,v3:{v3}</h1>
      <button onClick={setV1}>setV1</button>
      <button onClick={setV2}>setV2</button>
      </div>
    )
  }
}
  

export default Test;