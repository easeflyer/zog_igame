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

1. 如何对 store 进行独立测试。
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


## TODO：
table.js
  play()
  timing 等移出
  上一墩 正确。

store  优化合理，添加测试用例
tableStore 206行解决问题。



## 关于方位

1. 位置变化：自己的位置，东南西北有变化。
1. 自己牌永远在第二组，要和位置对应起来。
1. 

### 解决方案分析1

### 解决方案分析2

