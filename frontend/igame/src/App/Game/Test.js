import React from 'react'
import Index2 from './Index2'
import { Input} from 'antd';
import Session from '../User/session'

const host = 'http://192.168.0.20:8069'
const sid = Session.get_sid()
window.last = null
export default class TT extends React.Component{
    state={
        val:null,
        post: null,
    }

    componentDidMount(){
        // this.sse()
        if(sid) this.polling();
    }
    //posturl = host + '/web/dataset/call_kw/mail.channel/message_post'

    jsonrpc=(uri,data=null,headers=null,cb)=>{
        if(headers['content-type']==undefined) 
            headers['content-type'] = "application/json";
        if(sid) uri += '?session_id=' + sid;
        const data1 = {
            "jsonrpc": "2.0",
            "method": "call",
            "id": 123,
            "params": data
        }
        fetch(uri, {
            method: 'POST',
            body: JSON.stringify(data1), // data can be `string` or {object}!
            headers: new Headers(headers)
        }).then((response) => response.json())
            .then(response=>{
                console.log(response)
                cb
            }
            ).catch(error => console.error('jsonRPCError:', error))
    }
    cb1 = (json) => {
        console.log(json.result);
        const msg = json.result
        this.setState({
            val:msg
        })
        if (msg.length) window.last = msg.slice(-1)[0]['id'];
        this.polling();
    }
    // listen polling interface for live chat
    polling=(last = null)=> {
        const uri = host + '/longpolling/poll'
        last = window.last + 1;
        const data = { "channels": [], "last": last, "options": {} }
        const headers = null
        this.jsonrpc(uri,data,headers,this.cb1)
    }

    post= (e)=> {
        console.log(this.state.post)
        const  data = {
            "model": "mail.channel",
            "method": "message_post",
            "args": [2],
            "kwargs": {
                "body": e.target.value,
                "message_type": "comment",
                "subtype": "mail.mt_comment",
                "subject": "1222",
            }
        }
        const uri = host + '/web/dataset/call_kw/mail.channel/message_post';
        this.jsonrpc(uri, data,{}, this.cb)
    };
    cb = (json) => {
        console.log(json.result);
    }

    render(){
        return(
            <div>
                <Input.TextArea value={this.state.val}></Input.TextArea>
                <Input value={this.state.post} onChange={e=>this.setState({post:e.target.value})} onPressEnter={this.post}></Input>
            </div>
        )
    }
}