var net = require('net');

var ip = '127.0.0.1';
var port = 7000;

var socket = new net.Socket();
socket.connect({host:ip, port:port}, function() {
   console.log('서버와 연결 성공');

   socket.write('Hello Socket Server\n');
   socket.end();

});
