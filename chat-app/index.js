const express = require('express');
const { createServer } = require('node:http');
const {join,resolve} = require("node:path");
const {Server} = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static(resolve('./public')));
app.get('/',(req,res)=>{
  res.sendFile(join(__dirname,'/public/index.html'));
});

io.on('connection',(socket)=>{
    console.log('a user connected');
    socket.on('chat message',(msg)=>{
        console.log('message: '+ msg);
        io.emit('message',msg);
    })
    socket.on('disconnect',()=>{
        console.log('user disconnected');
    });
    socket.on('chat message',(msg)=>{
        console.log(`message: ${msg}`);
        io.emit('chat message',msg);
    });
});


server.listen(3000,()=>{
    console.log(`Server running at port ${3000}`);
});