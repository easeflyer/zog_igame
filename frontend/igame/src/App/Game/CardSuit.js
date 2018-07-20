import React from 'react'
import {WingBlank,Flex,WhiteSpace,Grid} from 'antd-mobile'
export default class CardSuit extends React.Component{
    state={
        data:{
            vulnerable:'BO',
            cards:'A432.8762.KJ.T86 T96.AT95.AQ32.QJ 78K85.43.T65.AK7 QJ7.KQJ.9532.JK3',
            table_information:[['111 1111 1111','E'],['222 2222 2222','N'],['333 3333 3333','S'],['777 7777 7777','W']]
        }
    }
    render(){
        const card = this.state.data.cards.split(' ');
        
        return(
            <WingBlank>
                <WhiteSpace/>
                <Flex>
                    <Flex.Item style={{height:140,border:'1px solid black',marginLeft:0,padding:5}}><p>局况</p><p>{this.state.data.vulnerable}</p></Flex.Item>
                    <Flex.Item style={{height:140,border:'1px solid black',marginLeft:0,padding:5}}>
                        <Flex>
                            <Flex.Item>♠ <span>{card[0].split('.')[0]}</span></Flex.Item>
                        </Flex>
                        <Flex>
                            <Flex.Item style={{color:'red'}}>♥ <span>{card[0].split('.')[1]}</span></Flex.Item>
                        </Flex>
                        <Flex>
                            <Flex.Item style={{color:'red'}}>♦ <span>{card[0].split('.')[2]}</span></Flex.Item>
                        </Flex>
                        <Flex>
                            <Flex.Item>♣ <span>{card[0].split('.')[3]}</span></Flex.Item>
                        </Flex>
                        <Flex>
                            <Flex.Item style={{textAlign:'center'}}>{this.state.data.table_information.map(item=>{
                                if(item[1]==="N")
                                return item[0]
                            })}</Flex.Item>
                        </Flex>
                    </Flex.Item>
                    <Flex.Item style={{height:140,border:'1px solid black',marginLeft:0,padding:5}}></Flex.Item>
                </Flex>
                <Flex>
                    <Flex.Item style={{height:140,border:'1px solid black',marginLeft:0,padding:5}}>
                        <Flex>
                            <Flex.Item>♠ <span>{card[1].split('.')[0]}</span></Flex.Item>
                        </Flex>
                        <Flex>
                            <Flex.Item style={{color:'red'}}>♥ <span>{card[1].split('.')[1]}</span></Flex.Item>
                        </Flex>
                        <Flex>
                            <Flex.Item style={{color:'red'}}>♦ <span>{card[1].split('.')[2]}</span></Flex.Item>
                        </Flex>
                        <Flex>
                            <Flex.Item>♣ <span>{card[1].split('.')[3]}</span></Flex.Item>
                        </Flex>
                        <Flex>
                            <Flex.Item style={{textAlign:'center'}}>{this.state.data.table_information.map(item=>{
                                if(item[1]==="E")
                                return item[0]
                            })}</Flex.Item>
                        </Flex>
                    </Flex.Item>
                    <Flex.Item style={{height:140,border:'1px solid black',marginLeft:0,padding:5}}>
                        <Flex style={{height:20}}>
                            <Flex.Item style={{textAlign:'center'}}>N</Flex.Item>
                        </Flex>
                        <Flex style={{height:60,lineHeight:60}}>
                            <Flex.Item>E</Flex.Item>
                            <Flex.Item style={{textAlign:'right'}}>S</Flex.Item>
                        </Flex>
                        <Flex style={{height:20}}>
                            <Flex.Item style={{textAlign:'center'}}>W</Flex.Item>
                        </Flex>
                    </Flex.Item>
                    <Flex.Item style={{height:140,border:'1px solid black',marginLeft:0,padding:5}}>
                        <Flex>
                            <Flex.Item>♠ <span>{card[2].split('.')[0]}</span></Flex.Item>
                        </Flex>
                        <Flex>
                            <Flex.Item style={{color:'red'}}>♥ <span>{card[2].split('.')[1]}</span></Flex.Item>
                        </Flex>
                        <Flex>
                            <Flex.Item style={{color:'red'}}>♦ <span>{card[2].split('.')[2]}</span></Flex.Item>
                        </Flex>
                        <Flex>
                            <Flex.Item>♣ <span>{card[2].split('.')[3]}</span></Flex.Item>
                        </Flex>
                        <Flex>
                            <Flex.Item style={{textAlign:'center'}}>{this.state.data.table_information.map(item=>{
                                if(item[1]==="W")
                                return item[0]
                            })}</Flex.Item>
                        </Flex>
                    </Flex.Item>
                </Flex>
                <Flex>
                    <Flex.Item style={{height:140,border:'1px solid black',marginLeft:0,padding:5}}></Flex.Item>
                    <Flex.Item style={{height:140,border:'1px solid black',marginLeft:0,padding:5}}>
                        <Flex>
                            <Flex.Item>♠ <span>{card[3].split('.')[0]}</span></Flex.Item>
                        </Flex>
                        <Flex>
                            <Flex.Item style={{color:'red'}}>♥ <span>{card[3].split('.')[1]}</span></Flex.Item>
                        </Flex>
                        <Flex>
                            <Flex.Item style={{color:'red'}}>♦ <span>{card[3].split('.')[2]}</span></Flex.Item>
                        </Flex>
                        <Flex>
                            <Flex.Item>♣ <span>{card[3].split('.')[3]}</span></Flex.Item>
                        </Flex>
                        <Flex>
                            <Flex.Item style={{textAlign:'center'}}>{this.state.data.table_information.map(item=>{
                                if(item[1]==="S")
                                return item[0]
                            })}</Flex.Item>
                        </Flex>
                    </Flex.Item>
                    <Flex.Item style={{height:140,border:'1px solid black',marginLeft:0,padding:5}}></Flex.Item>
                </Flex>
                <WhiteSpace/>
            </WingBlank>
        )
    }
}