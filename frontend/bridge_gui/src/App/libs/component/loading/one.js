/**
 * 加载中动画，
 * size，大小；
 * number，线条层数，
 * delay,每一层旋转的时间差。
 * color，颜色
 * 事实证明，css board会出现断线，火狐浏览器却不会发生！
 */
import React from 'react';
import './one.css';
function move(number,size,delay,color){
    number=Number(number);
    size=Number(size);
    delay=Number(delay)
    const d=size/number;
    let param=[]
    for (let i = 1; i <= number; i++) {
        param[i-1]={
            width:i*d+"px",
            height:i*d+"px",
            top:(number/2*d-i*d/2)+"px",
            right:(number/2*d-i*d/2)+"px",
            animationDelay: delay*i+"s",
            borderLeftColor:color,
            borderRightColor:color,
        }       
    }
    return param
}
const One = (props) => {
    const { size=100,number=3,delay=0.1,color="blue"} = props;

    return (
        <div style={{position:'relative'}}>
        {move(number,size,delay,color).map((item)=>{
            console.log(item)
            return  <div className="object" id="object_three" style={item}></div>
        })}            
        </div>
    )
}
export default React.memo(One)