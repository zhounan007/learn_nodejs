const example = require('./example02-event')

example.on('ready', () => {
    console.log('module loaded')
})