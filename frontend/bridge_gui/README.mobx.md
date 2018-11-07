# MobX 改进设计

## 目录结构

```javascript
components        React 组件，尽可能只负责 UI 
                  组件会被用 observer 装饰，以观察 store 的变化
stores            MobX 提供的 Store 文件的保存目录
                  包括 UI State 和 业务逻辑 State 以及
                  修改 State 需要的 actions 各种函数

                  注意：stores 命名要进行区分。以清晰程序的逻辑。
```


## 需要考虑的问题

1. 如何对 store 进行独立测试。
1. 如何对组件进行独立测试。使得UI组件可以被分离出来。
1. 控制器组件和UI组件写在一起，还是分开写。