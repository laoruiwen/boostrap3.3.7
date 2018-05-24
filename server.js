/**
 * Created by raven on 2018/4/11.
 *
 * 命令node server.js
 *
 * http://localhost:8888/css/bootstrap.css
 */
var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.use(express.static('dist'));
var server = app.listen(11111, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});