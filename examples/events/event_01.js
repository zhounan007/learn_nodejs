const EventEmitter = require('events');

class Man extends EventEmitter {}

const man = new Man();

man.on('wakeup', () => {
    // console.info('1');
    console.log('睡醒了...')
})


man.on('wakeup', function () {
    // console.info('2');
    setImmediate(() => {
        console.log('放首音乐...动起来')
    })
})

man.on('wakeup', function (a, b) {
    // console.info('3');
    console.log('起床...', a, b)
})


man.once('breakfast', function () {
    console.log('我只吃一顿早餐...吃多了消化不良...')
})

setTimeout(function () {
    console.log('早晨7点了...')
    man.emit('wakeup', '刷牙', '洗脸')
    console.log('-------');
    // 
    man.emit('breakfast')
    // 
    man.emit('breakfast')
}, 1000)