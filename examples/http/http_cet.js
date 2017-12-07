var http = require('http')

//http://cet2017.yunban.com.cn/api/oauth?callBack=http%3A%2F%2Fcet2017.yunban.com.cn%2F
var option = {
    host: 'cet2017.yunban.com.cn',
    path: '',
}


var b = {
    host: 'cache.neea.edu.cn',
    path: '/Imgs.do?ik=430081160330087&t=0.6239422451382559',
    headers: {
        'Referer': 'http://cet.neea.edu.cn/cet/'
    }
}

var req = http.request(option, function (res) {

    var body = '';
    res.on('data', function (data) {
        body += data;
    });

    res.on('end', function () {
        console.log(body)
    })
})

req.end();