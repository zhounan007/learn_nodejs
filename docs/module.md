##  Module模块


### 概述

Node应用由模块组成,采用`CommonJs`模块规范;在Noed.js中 文件和模块是一一对应的(每个文件被当作一个独立的模块),有独立的作用域

关于`CommonJs`规范, 可参考
### `module` 对象


Node内部提供一个`Module`构建函数, 所有模块都是`Module`实例。

```javascript

function Module(id,parent){
    this.id = id;
    this.exports = {};
    this.parent = parent;
}

```
每个模块内部, 都有一个`module`对象, 代表当前模块

```javascript
//example01.js
const debounce = require('lodash/debounce')
exports.debounce = debounce

console.log(module)
```
输出的`module`信息如下
```javascript

 Module {
  id: '.',
  exports: { debounce: [Function: debounce] },
  parent: null,
  filename: 'D:\\Repository\\learn_nodejs\\examples\\module\\example01.js',
  loaded: false,
  children:
   [ Module {
       id: 'D:\\Repository\\learn_nodejs\\node_modules\\lodash\\debounce.js',
       exports: [Function: debounce],
       parent: [Circular],
       filename: 'D:\\Repository\\learn_nodejs\\node_modules\\lodash\\debounce.js',
       loaded: true,
       children: [Object],
       paths: [Object] } ],
  paths:
   [ 'D:\\Repository\\learn_nodejs\\examples\\module\\node_modules',
     'D:\\Repository\\learn_nodejs\\examples\\node_modules',
     'D:\\Repository\\learn_nodejs\\node_modules',
     'D:\\Repository\\node_modules',
     'D:\\node_modules' ] }

```
- `module.id` 模块标识, 绝对路径
- `module.filename` 模块文件名, 绝对路径
- `module.loaded`  表示模块是否已经完成加载
- `module.parent` 表示谁调用了该模块
- `module.children` 表示该模块要用到的其他模块, 返回数组形式
- `module.exports`  表示模块对外输出的值

可以利用 `module.parent` 判断当前模块是用过命令调用还是其他模块调用

```javascript
if(!module.parent){
    app.listen(8080,function(){
        console.log('app listening on port 8080')
    })
}else{
    module.exports = app
}
```


#### `module.exports` 属性

`module.exports` 属性表示当前模块对外输出的接口, 其他文件(模块)加载该模块, 实际上就是读取的`module.exports`变量

```javascript
// example02-event.js
const EventEmitter = require('events');
module.exports = new EventEmitter()

setTimeout(() => {
    module.exports.emit('ready')
}, 1000)

//example02.js
const example = require('./example02-event')

example.on('ready', () => {
    console.log('module loaded')
})
```
`example02-event.js`模块会在1s后触发`ready`事件, `example02.js` 打印输出内容

#### `exports`变量

为了方便, Node为每个模块提供一个`exports`变量, 同时指向`module.exports`

```javascript
console.log(exports === module.exports)  // true
```
只能向`exports`变量添加方法或属性, 否则将切断`exports` 和 `module.exports` 联系
```javascript
exports.fn1 = function(){} // ✔

exports.fn2 = function(){} // ✔

exports = function(x){console.log(x)} // ✖
// exports 不再指向 module.exports
```
下面这种写法也是无效的
```javascript
exports.hello = function(){return 'hello'}

module.exports = 'hello world'
```
`hello`函数无法对外输出, 因为`module.exports`被重新赋值, 这时候只能用`module.exports` 输出

`exports` 与 `module.exports` 之间的区别很难分清, 一个简单的处理方法，就是放弃使用`exports`, 只使用`module.exports`。