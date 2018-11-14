import tableStore from '../App/stores/tableStore';

describe("selectCards分组：",()=>{
  test("测试 selectCards ",()=>{
    tableStore.initCards();
    const cards = tableStore.state.cards;
    const deCards = tableStore.selectCards([0,1,2,3],'CHSD');
    console.log("用户1，花色D,张数：",deCards.length);
    expect(cards).toBeDefined();
  });
  test("测试 selectCards ",()=>{
    tableStore.initCards();
    const cards = tableStore.state.cards;
    let deCards = tableStore.selectCards([0],'CH');
    deCards = deCards.concat(tableStore.selectCards([0],'SD'));
    console.log("用户1，花色D,张数：",deCards.length);
    expect(cards).toBeDefined();
  })

});


describe("selectCards分组：",()=>{
  test("getCardByIndex:",()=>{
    const index = 20;
    const card = tableStore.getCardByIndex(20);
    console.log('card20:',card.index);
    expect(card.index).toBe(20);
  });
});