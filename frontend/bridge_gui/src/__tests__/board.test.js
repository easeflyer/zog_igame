import board from '../App/stores/board';

describe("Board",()=>{
  test("init:",async ()=>{
    expect.assertions(1);
    await board.init();
    expect(board.event).toBe("国际大赛3");
    console.log(board.conn);
  });
});
