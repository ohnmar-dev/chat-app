const  mongoose=require('mongoose')
const Schem=mongoose.Schema;

const messageSchema =new Schem({
    message:{
        text:{
            type:String,
            required:true,
        },
    },
    users:Array,
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
},
{
    timestamps:true,
}
)

module.exports = mongoose.model('Messages',messageSchema)
