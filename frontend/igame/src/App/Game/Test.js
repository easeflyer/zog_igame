import React from 'react'
import Index2 from './Index2'
import { Button} from 'antd-mobile';


export default class TT extends React.Component{

    componentDidMount(){
        this.sse()
    }
    sse=()=> {
        var source = new EventSource('http://192.168.0.20:8989/login');  // 监听这个网址的消息。事件。
        source.onmessage = function (e) {
            //这里没有屏蔽 跨站脚本攻击，可以输入脚本。造成 安全隐患！
            // out.innerHTML = e.data + '\n' + out.innerHTML;
            console.log(e.data)
        };
        source.onclose = function(e){
            alert('再见！')
        }
    }

    render(){
        return(
            <div>
                
            </div>
        )
    }
}