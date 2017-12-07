

class EventEmitter {
    constructor() {
        this.handlers = {}
    }
    // 订阅
    on(eventType, listener) {
        if (typeof listener !== 'function') {
            throw 'listener must be a function ...'
        }
        if (!(eventType in this.handlers)) {
            this.handlers[eventType] = []
        }
        this.handlers[eventType].push(listener)
        return this
    }
    // 触发
    emit(eventType, ...args) {
        const listeners = this.handlers[eventType]
        if (listeners) {
            listeners.forEach((item, index) => {
                item.apply(this, args)
            })
        }
        return this
    }
    // 取消订阅
    off(eventType, listener) {
        const listeners = this.handlers[eventType]
        if (listeners) {
            let i = listener.length - 1
            for (; i >= 0; i--) {
                if (listeners[i] === listener) {
                    listeners.splice(i, 1)
                }
            }
        }
        return this
    }
}

module.exports = EventEmitter