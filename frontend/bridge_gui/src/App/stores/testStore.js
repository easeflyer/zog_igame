import { observable, action, computed, autorun } from 'mobx';
//import agent from '../agent';
import { trace } from 'mobx';

class TestStore{
  @observable v1 = 11;
  //@observable v2 = 22;
  v2 = observable.box(22);
  @computed get v3(){
    return this.v1+this.v2
  }
  autoEnd = autorun(()=>{
    //trace(true);
    console.log('v3:',this.v3);
    console.log('v2:',this.v2)
  });

  @action.bound
  setV1(){
    this.v1 = 33;
  }
  @action.bound
  setV2(){
    //this.v2 = 44;
    this.v2.set(44);
    this.autoEnd();
  }


}

export default new TestStore();