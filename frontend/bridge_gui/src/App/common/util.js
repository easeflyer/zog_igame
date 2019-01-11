import Card from '../components/Card';
const SUITS = Card.suits;
/**
 * arr = [1,2,3,4,5];
 * arr.RightMove(3)
 * console.log(arr);// [3,4,5,1,2]
 */
Array.prototype.RightMove=function(num){
    num = num || 0;
    for(let i=0;i<num;i++){
      var item =this.pop();
      this.unshift(item)
    }
  }

 export function rotateSeat(ArrSeats,player){
    switch(player){
      case "E":
      ArrSeats.RightMove(1);break;
      case "S":
      ArrSeats.RightMove(0);break;
      case "W":
      ArrSeats.RightMove(3);break;
      case "N":
      ArrSeats.RightMove(2);break;
    }
  }
  //接收牌 W N E S    桌面的上的牌 N E S W 
  function _rotateCard(ArrSeats,player){
    switch(player){
      case "E":
      ArrSeats.RightMove(0);break;
      case "S":
      ArrSeats.RightMove(3);break;
      case "W":
      ArrSeats.RightMove(2);break;
      case "N":
      ArrSeats.RightMove(1);break;
    }
    return ArrSeats;
  }
  export function Etoeast(x){
    switch(x){
      case 'E': return 'east';
      case 'S': return 'south';
      case 'W': return 'west';
      case 'N': return 'north';
    }
  }

 // X(13) => 'XXXXXXXXXXXXX'
  function _X(num) {
    var str = '';
    for(let i = 0 ;i<num;i++){
      str += 'X'
    }
    return '...'+str;
}
const _getOneSuit = (suit,hand) => {
  const reg = new RegExp(suit, "g");
  const h = hand.filter(card => card.substring(0, 1) === suit);
  return h.toString().replace(reg, "").replace(/,/g, "");
}
const  _getOneHand= (hand)=>{ console.log(SUITS)
  return _getOneSuit(Card.suits[0],hand)+'.'+_getOneSuit(Card.suits[1],hand)+'.'+_getOneSuit(Card.suits[2],hand)+'.'+_getOneSuit(Card.suits[3],hand);
}


/**
 * ["S5","S4","S3", "S2", "H5", "H4", "H3", "D5", "D4", "D3", "C5", "C4", "C3"] =>
 * 5432.543.543.543
 */
// function _getOneHand(card){ 
//   let suit = ['S','H','D','C'];
//   let suitInd = 0;
//   let deal = '';
//   for(var i = 0; i<card.length;i++){
//   // console.log(i)
//     if(card[i].indexOf(suit[suitInd])==0){
//       console.log(i)
//       deal += card[i][1];
//     }else{
//       deal += `.`;
//       suitInd+=1;
//       i--;
//     }
//   }
//   var str =JSON.stringify(card);
//   if(str.indexOf('C')==-1){
//     deal += `.`;
//     if(str.indexOf('D')==-1){
//       deal += `.`;
//       if(str.indexOf('H')==-1){
//         deal += `.`;
//       }
//     }
//   }
//   return deal;
// }

/**  W N E S
 * "[["S5", "S4", "S3", "S2", "H5", "H4", "H3", "D5", "D4", "D3", "C5", "C4", "C3"], 
 *   ["S8", "S7", "S6", "HA", "HK", "HQ", "DA", "DK", "DQ", "CA", "CK", "CQ", "C2"],
 *   ["SJ", "ST", "S9", "HJ", "HT", "H9", "DJ", "DT", "D9", "D2", "CJ", "CT", "C9"], 
 *   ["SA", "SK", "SQ", "H8", "H7", "H6", "H2", "D8", "D7", "D6", "C8", "C7", "C6"]
 * ]"
 * 
 * N E S W
 * const deals = 'K34.J3.Q742.K832 XXX.XX.XXXX.XXXX QJ98.A5.J853.QT4 XXX.XX.XXXX.XXXX';
 */
const seatMap = {
  "E":{N:'E',E:'S',S:'W',W:'N'},
  "S":{E:'E',S:'S',W:'W',N:'N'},
  "W":{S:'E',W:'S',N:'W',E:'N'},
  "N":{W:'E',N:'S',E:'W',S:'N'}
}
const arr1 = ['W','N','E','S'];
const arr2 = ['N','E','S','W'];
export function cardString(user,cardsArr){
  cardsArr = JSON.parse(cardsArr);
  var ind = arr1.indexOf(user);
  var myCards = cardsArr[ind];
  var deals = _X(13)+' '+_X(13)+' '+_getOneHand(myCards)+' '+_X(13);
  return deals;
}


//user 表示玩家的真实方位  
// 得到自己和明手的牌 和 扣着的牌
export function getUserCards(user,dummy,cardsArr){
   let userCards = null;
   cardsArr = JSON.parse(cardsArr);
   userCards = _rotateCard(cardsArr,user);
   var dummyInd = arr2.indexOf(seatMap[user][dummy]) 
   userCards.forEach((item,ind)=>{
      if(ind==2 || ind==dummyInd){
      }else{
        item.fill('CX')
      }
   });
   console.log(userCards)
   return userCards;
}
export function getUserCardsDeal(user,dummy,cardsArr){
  let result = [];
  let userCardsDeal = null;
  cardsArr = JSON.parse(cardsArr);
  userCardsDeal = _rotateCard(cardsArr,user)
  
  var dummyInd = arr2.indexOf(seatMap[user][dummy]) 
  userCardsDeal.forEach((item,ind)=>{
     if(ind==2 || ind==dummyInd){
       var num = 13-item.length;
       var XArr=new Array(num).fill('CX')
       item = item.concat(XArr)
       result.push(item)
     }else{
       item = new Array(13).fill('CX');
       result.push(item)
     }
  });
  console.log(userCardsDeal)
  console.log(result);
 var res =  result.map((item1)=>{
    return _getOneHand(item1);
  })
  
  return res.join(' ') ;
}
export function removeNull(arr){
  if(arr.length>0){
    if(arr[0]==null){
      arr.shift();
      if(arr[0]==null){
        removeNull(arr)
      }
    }
  }
 
}
//一维数组转二维数组
export function Two(arr){
  var arr4=[];
  var result = []
  if(arr[0]==null){
    removeNull(arr);
  }
  console.log(arr);
  for(let i = 0 ;i<arr.length;i++){
    arr4.push(arr[i]);
    if(arr4.length==4){
      result.push(arr4);
      arr4 = new Array()
    }
    if(i==arr.length-1 && arr4.length<4 && arr4.length>0){
      result.push(arr4);
    }
  }
  return result;
}

/**
 * 
 * @param {*} seats 每一个玩家对应的座位
 */
export function getCurOrLast(seats,trick){
  let result = []
  trick.forEach((item,ind)=>{
    if(item!=null){
     var player =  arr1[ind%4]; //真实玩家
     result.push({seat:seats[player],card:item})
    }
  });
  return result;
}