import React from 'react';
import './Course.css';


const Separator = ()=>(
    <div style={{
        backgroundColor: '#F5F5F9',
        height: 8,
        borderTop: '1px solid #ECECED',
        borderBottom: '1px solid #ECECED',  }}>
    </div>
);

export default class Course extends React.Component{
    state = {
        courseData:this.props.course,
        // courseData:null,
        courseId:null,
    }
    componentWillMount(){
        //  判断轮次信息有没有，没有则发起请求
        if(!this.state.courseData){
            // const matchId = this.props.match.id
            //data 应该是从后台获取，这里只是模拟数据
            const data = [
                {id:1, begintime:'2018-07-07 10:00:00', endtime:'2018-07-07 11:00:00', course:'排位赛第一轮'},
                {id:2, begintime:'2018-07-07 11:15:00', endtime:'2018-07-07 12:15:00', course:'排位赛第二轮'},
                {id:3, begintime:'2018-07-07 14:30:00', endtime:'2018-07-07 15:30:00', course:'排位赛第三轮'},
                {id:4, begintime:'2018-07-07 15:45:00', endtime:'2018-07-07 16:45:00', course:'排位赛第四轮'},
                {id:5, begintime:'2018-07-09 10:00:00', endtime:'2018-07-09 11:00:00', course:'排位赛第五轮'},
                {id:6, begintime:'2018-07-09 11:15:00', endtime:'2018-07-09 12:15:00', course:'排位赛第六轮'},
                {id:7, begintime:'2018-07-09 14:30:00', endtime:'2018-07-09 15:30:00', course:'排位赛第七轮'},
                {id:8, begintime:'2018-07-09 15:45:00', endtime:'2018-08-09 16:45:00', course:'排位赛第八轮'},
                {id:9, begintime:'2018-10-09 14:58:00', endtime:'2018-10-09 15:59:00', course:'排位赛第九轮'}
            ]


            // const error = ()=>{     
            //     this.setState({
            //         courseData:
            //         <tr colSpan={3} >
            //             <td>没有伦次信息</td>
            //         </tr>}
            //     )
            // }

            // const success = (data)=>{

            // }

            //下面的一系列操作都应该放到请求数据的成功回调函数success
            //整理拿到的原始数据，按日期分类
            var tempMap={};
            for(var i=0;i<data.length;i++){
                var obj = data[i];
                var key = obj["begintime"].substr(0,10);
                if( tempMap[key]!==0 && !tempMap[key] ){
                    tempMap[key]=[];
                }
                tempMap[key].push(obj);
            }

            // const lp = (k,i)=>()=>console.log(tempMap[k][i].id)
            const lp = (k,i)=>()=>{             //每个轮次的点击事件
                console.log(tempMap[k][i].id)   //轮次id
                //开始时间，时间戳
                var begintime = new Date(tempMap[k][i].begintime.replace(/-/g,'/')).getTime();
                //结束时间，时间戳
                var endtime = new Date(tempMap[k][i].endtime.replace(/-/g,'/')).getTime();
                //当前时间，时间戳
                var nowtime = new Date().getTime();

                //假定开始前五分钟可以入场准备
                if( begintime>nowtime && begintime-nowtime>300000 ){
                    console.log('比赛尚未开始，开始前五分钟才能入场')
                }
                if( begintime>nowtime && begintime-nowtime<=300000 ){
                    console.log('比赛马上开始，可以入场等待')
                }
                if( begintime<nowtime && endtime>nowtime ){
                    console.log('比赛进行中，你迟到了')
                }
                if( endtime<nowtime ){
                    console.log('比赛已经结束，进入成绩查询页');
                    this.props.toMatchResult();
                }
                this.props.setInitialPage(2);
                this.props.setCourseId([tempMap[k][i].id,tempMap[k][i].course]);
            }

            //把数据放到table中
            var arr = [];
            for(key in tempMap){
                for (let i = 0; i < tempMap[key].length; i++) {
                    if(i===0){
                        arr.push(
                            <tr key={tempMap[key][i].id} >
                                <td rowSpan={tempMap[key].length} > {key} </td>
                                <td> {tempMap[key][i].begintime.substr(11,5)+'-'+tempMap[key][i].endtime.substr(11,5)} </td>
                                <td><a onClick={lp(key,i)} > {tempMap[key][i].course} </a></td>
                            </tr>)
                    }else{
                        arr.push(
                            <tr key={tempMap[key][i].id} >
                                <td> {tempMap[key][i].begintime.substr(11,5)+'-'+tempMap[key][i].endtime.substr(11,5)} </td>
                                <td><a onClick={lp(key,i)} > {tempMap[key][i].course} </a>
                                </td>
                            </tr>)
                    }
                }
            }
            this.setState({     //把整理好的DOM数据放到state里
                courseData:arr,
            })
            this.props.setCourse(arr)   //把整理好的DOM数据状态提升，放回顶层，避免下次访问再连接数据库
        }
    }

    render() {
        return(
            <div>
                <Separator />
                <table>
                    <thead>
                        <tr>
                            <th>日期</th>
                            <th>时间</th>
                            <th>{this.props.match.type==='team'?'队式赛':'其他'}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.courseData}
                    </tbody>
                </table>
            </div>
        );
    }
}
