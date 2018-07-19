import React from 'react';
import { NavBar, WhiteSpace} from 'antd-mobile';
import { Icon, Row, Col } from 'antd';

export default class OneCourseRanking extends React.Component{
    render(){
        return(
            <div>
                <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={()=>this.props.toMatchDetails()}    //返回轮次页
                >{this.props.courseId[1]}排名(每轮排名)
                </NavBar>
                <WhiteSpace size='sm' />
                <Row>
                    <Col span={12} >
                        <div style={{border:'1px solid gray',textAlign:'center',padding:10}} onClick={()=>this.props.showPage('OneCourseResult')} >对阵结果</div>
                    </Col>
                    <Col span={12} >
                        <div style={{border:'1px solid gray',textAlign:'center',padding:10}} >赛队排名</div>
                    </Col>
                </Row>
                <WhiteSpace size='sm' />

                <h1>赛事名称：{this.props.match.name}</h1>
                <h1>赛事ID：{this.props.match.id}</h1>
                <h1>轮次ID：{this.props.courseId[0]}</h1>

            </div>
        );
    }
}