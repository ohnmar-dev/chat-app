const Message = require('../models/messageModle')

module.exports.addMessage = async(req,res,next)=>{
    try{
        const {from, to, message} = req.body;
        const data = await Message.create({
            message:{text:message},
            users:[from, to],
            sender:from,
        });
        if(data) return res.json({message:"Message send successfully!"});
        return res.json({message:"Fail to send message to th database"})
    }catch(ex){
        next(ex)
    }
}

module.exports.getAllMessage = async(req,res,next)=>{
    try{
        const {from, to } = req.body;
        const messages = await Message.find({
            users:{
                $all:[from,to],
            },
        }).sort({updatedAt:1});
        const projectMessages = messages.map((msg)=>{
            return{
                fromSelf : msg.sender.toString() === from,
                message: msg.message.text,
                };
        });
        res.json(projectMessages)
    }catch(ex){
        next(ex)
    }
}
