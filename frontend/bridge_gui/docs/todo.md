从 boardState 复盘


对所有的方法，进行 ui 纯净化。如何利用 mobx 进行纯净化。

牌没有飞走前，点击一张牌 牌弹起，但回不去了。


把牌的方向 安排清楚。 业务逻辑调用的时候，方便处理。重点！！！


飞走的牌 索引。
board索引恢复。
上一墩牌 如何回复。
断线重连 方位问题。
如何取出一张牌打出去。尤其是对手的牌。打出去 然后正过来。




初始化：  cards 数组 position{x,y} ACT
发牌：    cards 数组 调整：animation{top,left,rotate}

参数：用户的牌，board的牌。

打牌：    this.board[0] 添加。 animation 调整
          board[0] 引用的牌 active = 5

清理board: 当前墩 动画调整。board[0]=[]


解决方案：
myseat,dummySeat 是名牌，其他人是暗的。
1） board 遍历 
    

[
    [{seat:'N',card:'h3'},[],[],[]]
]

当前问题。牌不飞走。等问题。