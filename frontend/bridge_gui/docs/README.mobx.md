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

