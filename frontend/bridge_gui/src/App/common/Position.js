class Position {
  constructor(pos) {
    if (typeof (pos) == 'string') {
      const sn = pos[0].toUpperCase();
      this._sn = sn;
      this._in = Position.SNames.indexOf(sn);
      this._en = Position.ENames[this._in];
      this._cn = Position.CNames[this._in];
    } else if (typeof (pos) == 'number') {
      if (pos > 3) return false;
      this._in = pos;
      this._en = Position.ENames[pos];
      this._sn = Position.SNames[pos];
      this._cn = Position.CNames[pos];
    }
  }
  /**
   * 当前位置左移 n 次，返回移动后的位置对象。
   * 当前对象改变。
   * @param {*} n 
   */
  lshift(n) {
    const pos = [0,3,2,1,0,3,2,1];
    const ls = n % 4;
    this._in = pos[pos.indexOf(this._in) + ls];
    // let pos = null;
    // if (this._in == 0) this._in = 3 - n + 1;
    // else this._in -= n;
    this._en = Position.ENames[this._in];
    this._sn = Position.SNames[this._in];
    this._cn = Position.CNames[this._in];
    return this;
  }
  rshift(n) {
    const pos = [0,1,2,3,0,1,2,3];
    const ls = n % 4;
    this._in = pos[this._in + ls];
    // let pos = null;
    // if (this._in == 0) this._in = 3 - n + 1;
    // else this._in -= n;
    this._en = Position.ENames[this._in];
    this._sn = Position.SNames[this._in];
    this._cn = Position.CNames[this._in];
    return this;
  }

  /**
   * 从当前位置 到 pos 需要 左移几次
   * 返回左移的次数。
   */
  lsto(pos) {
    if(pos==null) return 0;
    if(typeof(pos)=='string') pos = new Position(pos);
    if (pos.in > this._in) return 4 - (pos.in - this._in);
    else return this._in - pos.in;
  }

  get sn() {
    return this._sn;
  }
  get en() {
    return this._en;
  }
  get cn() {
    return this._cn;
  }
  get in() {
    return this._in;
  }
  valueOf() {
    return this._in;
  }
  toString() {
    return Position.SNames[this._in - 1];
  }
}
Position.SNames = 'NESW';
Position.ENames = ['north', 'east', 'south', 'west'];
Position.CNames = ['北', '东', '南', '西'];
Position.getSNames = (firstPos) =>{
  const pos = ['NESW','ESWN','SWNE','WNES'];
  for(let p of pos){
    if(p.slice(0,1)==firstPos.toUpperCase()) return p;
  }
}
export default Position;