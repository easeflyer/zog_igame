import axios from 'axios';


let alive = true;
let TimeoutNum=0;
function health(){
    setInterval(()=>{
        axios.post({
            url:'/user',
            method:'post',
            timeout:5000,
        })
        .then(()=>{
            TimeoutNum=0;
            //隐藏重新连接
            alive = true;
        })
        .catch(()=>{
            TimeoutNum+=1;
            if(TimeoutNum>2){
                alert("网络已断开，正在重新连接");//显示重新连接
                alive=false;//当alive是false时，请求重新连接数据
            }
        })
    },15000)
}

window._health = health
export default health;