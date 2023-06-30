require('dotenv').config()
const express = require('express')
const mongoose=require('mongoose')
const userAPI=require('./routes/userRoute')
const messageRoute=require('./routes/messageRoute')
const cors=require('cors')
const {Socket} = require("socket.io")
const app = express()
// enabling CORS for all requests
app.use(cors())
app.use(express.json())

app.use('/api/auth',userAPI)
app.use('/api/messages',messageRoute)

mongoose.connect(process.env.DATABASE_URL,
    {
        useNewUrlParser:true,
    }).then(()=>{
        console.log("mongooDb connect")
    }).catch((err)=>{
        console.log(err)
    })

const server = app.listen(process.env.PORT || 5000,()=>
    console.log("Servering Connect")
)

const io = new Socket(server,{
    cors:{
        origin:'https://localhost:3000',
        allowedHeaders: ["my-custom-header"],
        methods: ["GET", "POST"],
        credentials:true,
    },
});
global.onlineUsers = new Map();

io.on("connection",(socket)=>{
    global.chatSocket = socket;
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id);
    })
    socket.on("send-msg",(data)=>{
        console.log("send-msg",{data});
          const sendUserSocket =  onlineUsers.get(data.to);
          if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-recieve",data.message);
          }
        })
});