# Web Worker

## 同源限制

分配给 Worker 线程运行的脚本文件，必须与主线程的脚本文件同源。

## 文件限制

Worker 线程无法读取本地文件（file://），会拒绝使用 file 协议来创建 Worker实例，它所加载的脚本，必须来自网络。

所以如果是本地运行html文件,请使用Open with Live Server 而非Open in Default Browser

## DOM 操作限制

Worker 线程所在的全局对象，与主线程不一样，区别是：

无法读取主线程所在网页的 DOM 对象
无法使用document、window、parent这些对象

## 通信限制

Worker 线程和主线程不在同一个上下文环境，它们不能直接通信，必须通过消息完成，交互方法是postMessage和onMessage，并且在数据传递的时候， Worker 是使用拷贝的方式。

## 脚本限制

Worker 线程不能执行alert()方法和confirm()方法，但可以使用 XMLHttpRequest 对象发出 AJAX 请求，也可以使用setTimeout/setInterval等API

### 参考

[Web Worker 使用教程](https://www.ruanyifeng.com/blog/2018/07/web-worker.html)
[workers 简介](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Asynchronous/Introducing_workers)
[使用场景](https://juejin.cn/post/7148239142806093838)
