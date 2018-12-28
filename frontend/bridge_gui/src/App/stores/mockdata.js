/**
 * Mock Data 主要是测试的时候用于模拟数据
 */

/**
 * tableStore 
 * restore(data) 的参数数据。
 */
export const restoreData = {
<<<<<<< HEAD
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
=======
    scene: 2,
    //deals: 'K34.J3.Q742.K832 XXX.XX.XXXX.XXXX QJ98.A5.J853.QT4 XXX.XX.XXXX.XXXX',
    deals: 'XXX.J3.Q742.K832 XXX.XX.XXXX.XXXX XXX8.A5.J853.QT4 XXX.XX.XXXX.XXXX',
    //deals: 'XXX.XX.XXXX.XXXX XXX.XX.XXXX.XXXX XXX.XX.XXXX.XXXX XXX.XX.XXXX.XXXX',
    //deals: 'K34.X.X.X XXX.X.X.X X.X.X.XXT4 X.XX.X.X',
    claim: { seat: 'E', msg: '3NT X +3' },
    winEW: 2,
    winSN: 3,
    dummySeat: 'N',
    curCall: '3H',
    contract: '3NT X',
    user: {
        E: { ready: 1, name: '张三', face: '/imgs/face1.png', rank: '大师', seat: 'E' },
        S: { ready: 0, name: '', face: '', rank: '', seat: '' },
        W: { ready: 0, name: '', face: '', rank: '', seat: '' },
        N: { ready: 0, name: '', face: '', rank: '', seat: '' }
    },
    calldata: {
        first: 'S',
        call: [
            ['1C =1=', 'PASS', 'PASS', '2H'],
            ['PASS', 'PASS', '3C =2=', 'PASS'],
            ['PASS', '3H', 'PASS', 'PASS'],
            ['3S =3=', 'PASS', 'PASS', '3NT =4='],
        ],
        note: [
            "约定叫1：说明内容预先输入...",
            "约定叫2：说明内容预先输入...",
            "约定叫3：说明内容预先输入...",
            "约定叫4：说明内容预先输入...",
        ]
    },
    // userCards: [
    //     ['SK', 'S3', 'S4', 'HJ', 'H3', 'DQ', 'D4', 'D2', 'CK', 'C8', 'C3'],
    //     ['SX', 'SX', 'SX', 'HX', 'HX', 'HX', 'DX', 'DX', 'DX', 'CX', 'CX', 'CX'],
    //     ['SQ', 'SJ', 'S9', 'S8', 'HA', 'H5', 'DJ', 'D8', 'D3', 'CT', 'C4'],
    //     ['SX', 'SX', 'SX', 'SX', 'SX', 'HX', 'HX', 'HX', 'HX', 'DX', 'CX'],
    // ],
    userCards: [
        [ 'HJ', 'H3', 'DQ', 'D4', 'D2', 'CK', 'C8', 'C3'],
        [ 'HX', 'HX', 'HX', 'DX', 'DX', 'DX', 'CX', 'CX', 'CX'],
        [ 'S8', 'HA', 'H5', 'DJ', 'D8', 'D3', 'CT', 'C4'],
        [ 'SX', 'SX', 'HX', 'HX', 'HX', 'HX', 'DX', 'CX'],
    ],

    board: [ // 这里seat 为固定的图形方位，非业务逻辑方位
        [{ seat: 'S', card: 'D5' }, { seat: 'W', card: 'D6' }, { seat: 'N', card: 'D7' }],
        [{ seat: 'W', card: 'C6' }, { seat: 'N', card: 'C2' }, { seat: 'E', card: 'C7' }, { seat: 'S', card: 'CQ' }],
    ],

}


export const callData1 = {
    first: 'S',
    call: [
        ['1C =1=', 'PASS', 'PASS', '2H'],
        ['PASS', 'PASS', '3C =2=', 'PASS'],
        ['PASS', '3H', 'PASS', 'PASS'],
        ['3S =3=', 'PASS', 'PASS', ''],
    ],
    note: [
        "约定叫1：说明内容预先输入...",
        "约定叫2：说明内容预先输入...",
        "约定叫3：说明内容预先输入..."
    ]
}

export const callData2 = {
    first: 'S',
    call: [
        ['1C =1=', 'PASS', 'PASS', '2H'],
        ['PASS', 'PASS', '3C =2=', 'PASS'],
        ['PASS', '3H', 'PASS', 'PASS'],
        ['3S =3=', 'PASS', 'PASS', '3NT =4='],
    ],
    note: [
        "约定叫1：说明内容预先输入...",
        "约定叫2：说明内容预先输入...",
        "约定叫3：说明内容预先输入...",
        "约定叫4：说明内容预先输入...",
    ]
}

export const userData1 = {
    E: { ready: 0, name: '张三', face: '/imgs/face1.png', rank: '大师', seat: 'E' },
    S: { ready: 0, name: '李四', face: '/imgs/face2.png', rank: '专家', seat: 'S' },
    W: { ready: 0, name: '王五', face: '/imgs/face1.png', rank: '王者', seat: 'W' },
    N: { ready: 0, name: '赵六', face: '/imgs/face2.png', rank: '钻石', seat: 'N' }
};
export const userData2 = {
    E: { ready: 0, name: '张三', face: '/imgs/face1.png', rank: '大师', seat: 'E' },
>>>>>>> bui-mobx
    S: { ready: 0, name: '', face: '', rank: '', seat: '' },
    W: { ready: 0, name: '', face: '', rank: '', seat: '' },
    N: { ready: 0, name: '', face: '', rank: '', seat: '' }
};