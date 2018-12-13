# MobX 改进设计

## 目录结构

参考印象笔记：React + MobX 前后端分离 系统架构
src
  |-App
    |- component
      |- app.js
      |- login.js
    |- stores
  |- agent.js


```javascript
components        React 组件，尽可能只负责 UI 
                  组件会被用 observer 装饰，以观察 store 的变化
                  Table.js 作为控制器组件，views 里面为视图组件
stores            MobX 提供的 Store 文件的保存目录
                  包括 UI State 和 业务逻辑 State 以及
                  修改 State 需要的 actions 各种函数

                  注意：stores 命名要进行区分。以清晰程序的逻辑。
```

## 代码规范

1. 全都加函数注释，尽量不写行内注释。
1. 内部调用的纯函数，命名为下划线开头。
1. store 纯函数代码，都写上 jest 的单元测试。添加必要测试说明。
1. React 组件，用 debug.js 测试，或者用 jest 快照编写测试用例。
1. 0-3 对应 NESW北东南西


## 需要考虑的问题

1. 如何对 store 进行独立测试。 jest 已经解决
1. 如何对组件进行独立测试。使得UI组件可以被分离出来。
1. 控制器组件和UI组件写在一起，还是分开写。\
1. 如何分工。


## tableStore 详解

```
constructor()     
  this.initCards();         初始化 从 deals 转换为 cards 二维数组
                        api 接口获得初始化的数据。

userReady(se);          ui  根据 state 切换界面到用户准备就绪
userAllReady();         ui  读取 state 判断用户是否都就绪
dealCards();            ui  发牌，绑定点击事件。
bid();                  ui  显示叫牌面板
call(seat,bid)          api 叫牌

preplay();              ui  仅调整牌突出显示
play();                 api 牌打出到 board
                            通知服务器
resetCards();           ui  重新整理余下的牌的位置ui
clearBoard();           ui  清理桌面上的牌

selectCards(user, suit) ui  根据用户和花色，选中牌
getCardByIndex(index)   ui  根据52张牌的编号选中1张牌
addClick2Cards              (cards, active, handleClick)
                        ui  给一组牌添加点击处理。
setCardsState               (cards, state)                         
                        ui  覆盖上面的方法
initSeat(center, seats) ui  初始化设置 发牌位置和出牌位置坐标

suitLayoutCards         (cards, seatIndex)
                        按照花色布局
lastTrick               显示上一墩牌, 数据如何和客户端关联起来。
                        如有必要调用  api ，可以直接调用本地存储。
openDummy
claim()                 ui 显示 claim 面板
get result()            比赛成绩
get size()              牌的大小





需要增加的方法：
setDelay                      给所有牌调整动画时间。
recovery                      断线恢复 回复 state 从 state 回复 uistate
```
## 接口函数
```
进入页面，立刻得到所有玩家信息，和52张牌（应该所有玩家都准备好再得到52张牌）
sucInit(){
    1. 分配 4 个玩家的牌
    2. 分析当前账号属于哪个方位
    3. 配置4个玩家的信息
    4. 判断是否是重连接
    5. 建立长连接
}

sucPolling()  处理长连接发送来的消息
handleReady() 点击准备时，触发的事件
bidCall() 用来发送叫牌消息
handleClaim() 庄家摊牌
play() 打牌
handleClaimMsg() 同意或拒绝摊牌

长连接相关 ：
 0. 收到一个玩家的准备消息： 将准备改成就绪
 1. 全都准备好:  发牌 splitCards()   PC版 dealCards()
 2. 摊牌通过:  显示结果showResult()
 3. 收到聊天消息：addChatMsg() 将消息添加到聊天区
 4. 收到叫牌消息： validatePass() 检测是否有连续三个pass        这个消息中应该提示下一个要操作的玩家，不应该由玩家告诉服务器叫牌成功，
 5. 收到叫牌结果信息 ：playRules() 设置该谁打牌
 6. 收到打牌消息 recoverTrick() 将对应玩家的牌打出去
 7. 收到庄家摊牌消息
 8. 收到防守方同意或拒绝摊牌的消息
```

## 功能函数
```
validatePass()  处理叫牌
playRules()  验证打牌规则
recoverMyCards() 恢复本玩家的牌
recoverGuardCards() 恢复扣着的牌
testDummy() 恢复明手的牌
recoverDeclarerOrDummyCards() 恢复庄家或明手的牌
recoverTrick()根据不同参数实现恢复上墩(last)、 恢复当前墩(current)、接收到打牌消息后打出相应的牌(play) 
setClaimtrick() 设置当前可摊牌的墩数
```

## TODO：
1. 对于 UiState 和 BzState 进行抽离解耦。BzState 参考 pbn
   bzstate 都有那些函数？uistate 应该尽可能脱离业务逻辑。
   思路的重要改变：完全以uistate 为中心。明确uistate 里的数据结构。
   然后把 后台尽量提供 符合要求的数据结构，同步到 boardState。
   boardState 的功能，完全用于和后台同步。

1. 扑克的大小进行 vh css  的设计调整。定位进行调整。
1. 


## 关于方位

1. UI 位置 和 数据位置，分别对待。UI 位置，永远是NESW
1. 位置变化：自己的位置，东南西北有变化。
1. 自己牌永远在第二组，要和位置对应起来。

1. 方位分为：“界面方位” 和 “数据方位” 界面方位永远上 NESW，数据方位“轮转”
1. pbn 数据以pbn格式为准。其他数据索引统一采用 NESW 的方式。

1. 叫牌

### 解决方案分析1

### 解决方案分析2

