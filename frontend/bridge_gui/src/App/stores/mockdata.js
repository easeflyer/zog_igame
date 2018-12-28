/**
 * Mock Data 主要是测试的时候用于模拟数据
 */

/**
 * tableStore 
 * restore(data) 的参数数据。
 */
export const restoreData = {
  scene:2,
  deals:'K34.J3.Q742.K832 XXX.XX.XXXX.XXXX QJ98.A5.J853.QT4 XXX.XX.XXXX.XXXX',
  claim: { seat: 'E', msg: '3NT X +3' },
  winEW:2,
  winSN:3,
  dummySeat:'N',
  curCall:'3H',
  contract:'3NT X',
  user:{
    E: { ready: 1, name: '张三', face: '/imgs/face1.png', rank: '大师', seat: 'E' },
    S: { ready: 0, name: '', face: '', rank: '', seat: '' },
    W: { ready: 0, name: '', face: '', rank: '', seat: '' },
    N: { ready: 0, name: '', face: '', rank: '', seat: '' }
  },
  calldata:{
      first:'S',
      call:[
          ['1C =1=','PASS','PASS','2H'],
          ['PASS','PASS','3C =2=','PASS'],
          ['PASS','3H','PASS','PASS'],
          ['3S =3=','PASS','PASS','3NT =4='],
      ],
      note:[
          "约定叫1：说明内容预先输入...",
          "约定叫2：说明内容预先输入...",
          "约定叫3：说明内容预先输入...",
          "约定叫4：说明内容预先输入...",
      ]
  },
  userCards:[
      ['SK','S3','S4','HJ','H3','DQ','D4','D2','CK','C8','C3'],
      ['SX','SX','SX','HX','HX','HX','DX','DX','DX','CX','CX','CX'],
      ['SQ','SJ','S9','S8','HA','H5','DJ','D8','D3','CT','C4'],
      ['SX','SX','SX','SX','SX','HX','HX','HX','HX','DX','CX'],
  ],
  board:[
      [{seat:'S',card:'D5'},{seat:'W',card:'D6'},{seat:'N',card:'D7'}],
      [{seat:'W',card:'C6'},{seat:'N',card:'C2'},{seat:'E',card:'C7'},{seat:'S',card:'CQ'}],
  ],

}