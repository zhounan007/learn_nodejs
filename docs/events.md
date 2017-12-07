## Events 模块


### 概述

`events`模块是node中的核心,大部分核心API都采用异步事件驱动架构,例如`net.Server` 对象会在每次有新连接时触发事件;
所有能触发事件的对象都是`EventEmitter`类的实例; 

### 基本用法

例如,一个继承了`EventEmitter`类的实例`eventEmitter`,`eventEmitter.on()`方法用于注册监听;`eventEmitter.emit()`方法用于触发事件;


```javascript

const EventEmitter = require('events');

class Man extends EventEmitter {}

const man = new Man();

man.on('wakeup', () => {
    console.log('睡醒了....')
})

setTimeout(function () {
    console.log('早晨7点了...')
    man.emit('wakeup')
}, 1000)

```
上例实现了一个基础的监听与触发,同时还可以给监听器传入参数

```javascript


man.on('wakeup', function (a, b) {
    console.log('起床...', a, b)
})

setTimeout(function () {
    console.log('早晨7点了...')
    man.emit('wakeup', '刷牙', '洗脸')
}, 1000)

// 早晨7点了...
// 睡醒了....
// 起床 刷牙 洗脸

```
从上面可以看到,同一个事件可以绑定多个事件监听器,并且按照注册顺序执行,因此需要确保事件的正确排序;
监听器函数可以使用异步操作

```javascript
man.on('wakeup',function(){
    setImmediate(()=>{
        console.log('放首音乐...动起来')   
    })
})

// 早晨7点了...
// 睡醒了....
// 起床 刷牙 洗脸
// 放首音乐...动起来


```
需要注意的是执行的顺序跟打印的顺序

当使用`on()`方法注册监听器,监听器会在每次触发事件时被调用(也就是监听器被多次调用),如果只处理一次可使用`once()`方法

```javascript

man.once('breakfast', function () {
    console.log('我只吃一顿早餐...吃多了消化不良...')
})

setTimeout(function () {
    console.log('早晨7点了...')
    man.emit('wakeup', '刷牙', '洗脸')

    // 
    man.emit('breakfast')
    // 
    man.emit('breakfast')
}, 1000

// 早晨7点了...
// 睡醒了...
// 起床... 刷牙 洗脸
// 我只吃一顿早餐...吃多了消化不良...
// 放首音乐...动起来
```

其他常用方法 如删除监听 `emitter.removeListener(eventName,listener)` 或者直接查看[官网API](https://nodejs.org/dist/latest-v8.x/docs/api/events.html)



### 进阶

如何自己实现一个异步事件驱动或者观察者模式




