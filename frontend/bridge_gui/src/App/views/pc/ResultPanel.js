import React from 'react';
import ReactDOM from 'react-dom';
import tableStore from '../../stores/tableStore';
import { observer } from 'mobx-react';

@observer
class ResultPanel extends React.Component {
  /**
    * 隐藏比赛结果
    */
  hideResult = () => {
    ReactDOM.unmountComponentAtNode(document.querySelector('#result'));
  }
  render() {
    const height = tableStore.height;
    const result = tableStore.result;
    return (
      <div className='resultmask'>
        <div className='result'>
          <img src='/cards/medal.svg' width="20%" />
          <div style={{ lineHeight: height * 0.12 + 'px', }}>{result}</div>
          <button onClick={this.hideResult}>下一局</button>
        </div>
      </div>
    );
  }
}

export default ResultPanel;