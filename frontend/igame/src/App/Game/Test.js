    // sse=()=> {
    //     let i=0;
    //     const this_=this;
    //     // var source = new EventSource('http://124.42.117.43:8989/stream');  // 监听这个网址的消息。事件。
    //     var source = new EventSource('http://192.168.0.20:8989/stream');  // 监听这个网址的消息。事件。
    //     source.onmessage = function (e) {
    //         console.log(e.data)
            // if(e.data.split(':').length===2 && e.data.split(':')[0].slice(0,6)==='SERVER'){   //发牌  SERVER(N):J92.K64.KJ84.J32
            //     let data=e.data.split(':');
            //     this_.state.cards.push(data);
            //     this_.deal_cards(data);
            //     this_.setState({ //初始化
            //         deal:true,  // 
            //         call:true,
            //         dataSource:[{
            //             key:count,
            //             N:'',
            //             E:'',
            //             S:'',
            //             W:'',
            //         }],
            //         claimCount:0,
            //         currentDirect:null
            //     })
            // }
            // if(this_.state.call && e.data.split(' ').length===3){   //叫牌    [10:18:47] 201: 1s
            //     let call_direct = direct[user.indexOf(e.data.split(' ')[1].slice(0,3))];  //方位
            //     let call_card = e.data.split(' ')[2];   //叫的牌
            //     this_.call_cards(call_direct,call_card);
            //     this_.setState({
            //         callDirect:direct[user.indexOf(e.data.split(' ')[1].slice(0,3))+1]||direct[user.indexOf(e.data.split(' ')[1].slice(0,3))-3]
            //     })
            // }
            // if(e.data.split(' ')[1]==='card:'){   //calculate？叫牌结束，设置庄家、明守、首攻：接收到下一轮出牌方信息  E card: AK.AQJT875.T.Q85
            //     if(this_.state.calculate){
            //         this_.setState({
            //             call:false,    //设置不处于叫牌状态
            //             openLeader: e.data.split(' ')[0],   //设置首攻
            //             banker:direct[direct.indexOf(e.data.split(' ')[0])+3]||direct[direct.indexOf(e.data.split(' ')[0])-1],   //设置庄家
            //             guard:direct[direct.indexOf(e.data.split(' ')[0])+1]||direct[direct.indexOf(e.data.split(' ')[0])-3],    //设置明守
            //             calculate:false,
            //         })
            //         let data =this_.state.cards[ direct.indexOf(e.data.split(' ')[0])+1]||this_.state.cards[ direct.indexOf(e.data.split(' ')[0])-3]
            //         console.log(data)
            //         this_.setState({
            //             guardCards:this_.addColor(this_.arrange_my_cards(data[1]))[1],
            //             guardCardsNum:this_.arrange_my_cards(data[1]),
            //         })
            //     }
                // if(e.data.split(' ')[0]===this_.state.currentDirect){
                //     this_.state.currentDirect===this_.state.topDirect?this_.setState({currentCardT:null}):null;
                //     this_.state.currentDirect===this_.state.myDirect?this_.setState({currentCardB:null}):null;
                //     this_.state.currentDirect===this_.state.leftDirect?this_.setState({currentCardL:null}):null;
                //     this_.state.currentDirect===this_.state.rightDirect?this_.setState({currentCardR:null}):null;
                //     let is = null;
                //     this_.state.currentPiers.map((item,index)=>{
                //         item.dir===this_.state.currentDirect?is = index:null;
                //         return is;
                //     })
                //     this_.state.currentPiers = this_.state.currentPiers.splice(is,1);
                // }
                // if(e.data.split(' ')[0]===this_.state.myDirect){this_.setState({myCardsNum:this_.arrange_my_cards(e.data.split(' ')[2])})}
                // if(e.data.split(' ')[0]===this_.state.guard){this_.setState({guardCardsNum:this_.arrange_my_cards(e.data.split(' ')[2])})}
                // this_.setState({
                //     currentDirect:e.data.split(' ')[0],
                // })
                // if(this_.state.currentPiers.length===4){
                //     setTimeout(()=>{
                //         this_.setState({
                //             currentCardB:null,
                //             currentCardT:null,
                //             currentCardL:null,
                //             currentCardR:null,
                //             currentPiers:[]
                //         })
                //     },1000)
                // }
            // }
            // if(!this_.state.call && e.data.split(' ').length===3 && e.data.split(' ')[1].slice(3,4)===':' && e.data.split(' ')[2].slice(0,4)!=='claim'){  //接收到打牌消息   [10:19:04] 202: c5
            //     let play_direct = direct[user.indexOf(e.data.split(' ')[1].slice(0,3))];  //方位
            //     let play_card = e.data.split(' ')[2];   //出的牌 c5格式
            //     this_.setState({currentSuit:play_card.slice(1,1)})
            //     let val = e.data.split(' ')[2].split('').reverse().join('');   //出的牌 5c格式
            //     play_direct===this_.state.topDirect?this_.setState({currentCardT:this_.re_transfer(play_card,0,1,true)}):null;
            //     play_direct===this_.state.myDirect?this_.setState({currentCardB:this_.re_transfer(play_card,0,1,true)}):null;
            //     play_direct===this_.state.leftDirect?this_.setState({currentCardL:this_.re_transfer(play_card,0,1,true)}):null;
            //     play_direct===this_.state.rightDirect?this_.setState({currentCardR:this_.re_transfer(play_card,0,1,true)}):null;
            //     this_.state.currentPiers.push({dir:play_direct,card:play_card})
            //     if(play_direct===this_.state.myDirect){
            //         let i1=0,i2=0;
            //         this_.state.myCards.map((item,index)=>{
            //             if(item.indexOf(val)>=0){
            //                 i1=index;
            //                 i2=item.indexOf(val);
            //                 item.splice(item.indexOf(val),1)
            //             }
            //         })
            //         this_.state.myCardsNum.map((item,index)=>{
            //             if(index===i1){
            //                 item.splice(i2,1)
            //             }
            //         })
            //     }
            //     if(play_direct===this_.state.guard){
            //         let i1=0,i2=0;
            //         this_.state.guardCards.map((item,index)=>{
            //             if(item.indexOf(val)>=0){
            //                 i1=index;
            //                 i2=item.indexOf(val);
            //                 item.splice(item.indexOf(val),1)
            //             }
            //         })
            //         this_.state.guardCardsNum.map((item,index)=>{
            //             if(index===i1){
            //                 item.splice(i2,1)
            //             }
            //         })
            //     }
                
            // }
            // if(!this_.state.call && e.data.split(' ').length===3 && e.data.split(' ')[1].slice(3,4)===':' && e.data.split(' ')[2].slice(0,4)=='claim')  //[15:12:00] 201: claim5
            //这里没有屏蔽 跨站脚本攻击，可以输入脚本。造成 安全隐患！
        // };
        // source.onclose = function(e){
        //     alert('再见！')
        // }
    // }