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

  export function Etoeast(x){
    switch(x){
      case 'E': return 'east';
      case 'S': return 'south';
      case 'W': return 'west';
      case 'N': return 'north';
    }
  }