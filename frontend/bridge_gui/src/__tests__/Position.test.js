import Position from '../App/common/Position';

// const _SNames = 'NESW';
// const _ENames = ['north','east','south','west'];
// const _CNames = ['北','东','南','西'];


describe("Position：",()=>{
  test("position:",()=>{
    const p1 = new Position(2);
    const p2 = new Position('W');
    const p3 = new Position('south');
    console.log(p1,p2,p1+p2);
    expect(p1+p2).toBe(5);
    expect(p1 >> 1).toBe(1);
    
    expect(p1.cn).toBe('南');
    expect(p1.en).toBe('south');
    expect(p1.in).toBe(2);
    expect(p1.sn).toBe('S');
    expect(p1.lshift(1).en).toBe('east');
    expect(p1.lshift(1).sn).toBe('N');
    expect(p1.lshift(1).cn).toBe('西'); 
    expect(p2.lshift(1).cn).toBe('南');
    expect(p3.lshift(1).cn).toBe('东');
    let posE = new Position('E').lshift(3).sn;
    expect(posE).toBe('S');
    posE = new Position('S').rshift(3).sn;
    expect(posE).toBe('E');
    
    let posN = new Position('N').lshift(3).sn;
    expect(posN).toBe('E');
    posN = new Position('E').rshift(3).sn;
    expect(posN).toBe('N');
    expect(p2.lsto(p3)).toBe(1);
    expect(p3.lsto(p2)).toBe(3);

    expect(Position.getSNames('E')).toBe('ESWN');
    expect(Position.getSNames('S')).toBe('SWNE');
  });
});