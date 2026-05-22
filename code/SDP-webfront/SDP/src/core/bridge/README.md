## JSBridge 函数的使用
```js
import { JSBridgeInstance } from '@/utils/js-bridge';
// 1、调取 Native 方法
JSBridgeInstance.invoke({
  bridgeName: 'getAccount',
  data: {
    id: 1007,
  },
  callback: (res) => {
    console.log(res);
  },
});

//   2、注册方法 提供 Native 主动 调用
JSBridgeInstance.register({
  callbackKey: 'getDevice',
  callback: (res) => {
    console.log('res =>>', res);
  },
});
```
**参数说明:**
- bridgeName: 实际 Native 的函数句柄. 类型: String
- data: 需传递给 Native 的参数. 默认传 {}. 类型: Object
- callback: 回调函数. 类型: Function


## 原理说明

### 1. `JSBridgeInstance.invoke`
- 为当前调用分配唯一的 cbKey
- 把 cbKey 对应的回调函数存在 callbacks 中
- 根据设备平台执行对应的 Native 方法, 把 `bridgeName` 和 `callbackKey` 传递给 Native, 用于识别回调函数的线索
  
### 2. `JSBridgeInstance.receiveMessage`
- 根据返回的 `callbackKey` , 执行回调函数 registerCallbacks || callbacks 
- 在回调函数中执行实际的业务代码

### 3. `JSBridgeInstance.register`
- 为当前调用分配唯一的 callbackKey
- 把 callbackKey 对应的回调函数存在 registerCallbacks 中
