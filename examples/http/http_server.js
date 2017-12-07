var http = require('http');


var server = http.createServer(function (req, res) {

    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.write('Hello world');
    res.end();

});
server.listen(8080, '127.0.0.1');

console.log('Server running on port 8080');