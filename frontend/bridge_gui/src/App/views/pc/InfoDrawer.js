import { Drawer, Button } from 'antd';
import React from 'react'
import 'antd/dist/antd.css';
import BidPanel from './BidPanel'
import { inject, observer } from 'mobx-react';
import "./InfoDrawer.css"

@inject('tableStore')
@observer
class InfoDrawer extends React.Component {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showDrawer}>
          Open
        </Button>
        <Drawer
          title="本局信息"
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
          className="infoDrawer"
          width="45.2vh"
        >
          {this.props.tableStore.state.scene > -1 ? <BidPanel /> : null}
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </div>
    );
  }
}

export default InfoDrawer;