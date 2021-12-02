const app = require('express')()
const server = require('http').createServer(app)
const cors = require('cors');
const io = require('socket.io')(server,{
    cors : {
        origin :"*",
        credentials :true
    }
});


io.on('connection', socket=>{
    socket.on('open', function (data) {
        console.log(data);
        socket.emit('sendopen', "1");
    })
})

server.listen(7001, function(){
    console.log('socket listening on port 7001');
})