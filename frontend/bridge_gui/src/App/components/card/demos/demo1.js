import React from 'react';
import Card from '../../card'


function gen1(style, i, j) {
  const styles = {
    "1": {
      top: 200 + i * 100,
      left: 200 + j * 50,
      delay: i * 1000 + j * 100
    },
    "2":{
      x:15,
      y:15,
      delay: i * 1000 + j * 100
    }
  }
  return styles[style];
}
function gen2(style,i,j){
  const styles = {
    "1":{ x: 10+j*50, y: 10+i*100 }
  }
  return styles[style];
}

const Demo1 = props => {
  const suit = "SHDC";
  const rank = "23456789TJQKA";
  const cards = suit.split('').map((s, i) => {
    return rank.split('').map((r, j) => {
      return (
        <Card
          active={1}
          key={s + r}
          index={s + r}
          seat={'S'}
          animation={gen1(props.anim,i, j)}
          card={s + r}
          size={171.54}
          position={gen2(props.pos,i,j)}
        //zIndex={100+i+j}
        />
      );
    });
  });

  return (
    <div>
      {cards}
    </div>
  );
};

const Demo = props =><div>
  <div style={{position:"absolute",left:"10px"}}>
    <Demo1 anim={2} pos={1} />
  </div>
  <div style={{position:"absolute",left:"600px"}}>
    <Demo1 anim={1} pos={0} />
  </div>  
</div>

export default Demo;