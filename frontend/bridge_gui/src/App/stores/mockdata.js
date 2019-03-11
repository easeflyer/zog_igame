/**
 * Mock Data 主要是测试的时候用于模拟数据
 */
// S.H.C.D 顺序 发牌时打出去的牌，必须用 X替换掉，注意 dummySeat 必须和 tableStore 一致
const deal  = "QJ6.K652.T98.J85 873.J97.Q4.AT764 K5.T83.A7652.KQ9 AT942.AQ4.KJ3.32"
//const deal1 = "QJ6.K652.T98.J85 XXX.XXX.XX.XXXXX K5.T83.A7652.KQ9 XXXXX.XXX.XXX.XX"
const deal1 = "J6X.K652.T9X.J85 XXX.XXX.XX.XXXXX 5X.T83.A765X.KQ9 XXXXX.XXX.XXX.XX"
const deal2 = "J6.K652.T9.J85 XX.XXX.X.XXXXX 5.T83.A765.KQ9 XXXXX.XXX.XX.XX"
// C8,C4,C2,C3  上一墩
// SQ,S8,SK     当前墩

function genUserCards(deal){
    const suits="SHCD";
    const hands = deal.split(" ");
    return hands.map((hand)=>{
        let h = [];
        hand.split(".").forEach((suit,i)=>{
            suit.split("").forEach((card)=>h.push(suits[i]+card))
        })
        return h;
    });
}




/*
注意 dummySeat, userCards 和 board 数据 以及 deals 应该符合实际出牌情况。包括方位张数等。
*/
export const restoreData = {
    scene: 2,
    //deals: "...XXXXXXXXXXXXX 43.5..XXXXXXXXXX 7..A.XXXXXXXXXXX ...XXXXXXXXXXXXX",
    deals:deal1,
    claim: { seat: 'E', msg: '3NT X +3' },
    winEW: 2,
    winSN: 3,
    dummySeat: 'N',
    curCall: '3NT',
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
    userCards:genUserCards(deal2),
    board:[
        [{seat: "N", card: "SQ"},{seat: "E", card: "S8"},{seat: "S", card: "SK"}],
        [{seat: "N", card: "C8"},{seat: "E", card: "C4"},{seat: "S", card: "C2"},{seat: "W", card: "C3"}],
    ]
    // userCards:[
    //     ["CX", "CX"],
    //     ["S4", "S3", "H5"],
    //     ["S7", "CA"],
    //     ["CX", "CX"]
    // ],
    // board:[
    //     [{seat: "S", card: "HA"},{seat: "W", card: "HJ"},{seat: "N", card: "H7"}],
    //     [{seat: "S", card: "HK"},{seat: "W", card: "HT"},{seat: "N", card: "H6"},{seat: "E", card: "H4"}],
    // ]

}

export const callData1 = {
    first: 'S',
    call: [
        ['-', '-', 'PASS', '2H'],
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
    S: { ready: 0, name: '', face: '', rank: '', seat: '' },
    W: { ready: 0, name: '', face: '', rank: '', seat: '' },
    N: { ready: 0, name: '', face: '', rank: '', seat: '' }
};