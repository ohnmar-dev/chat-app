const  mongoose=require('mongoose')
const Schem=mongoose.Schema;

const userSchem=new Schem({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        index:{
            unique:true
        }
    }, 
    password:{
        type:String,
        required:true
       
    },
    date:{
        type:Date,
        default:Date.now
    },
   isAvatarImageSet: {
    type:Boolean,
    default:false
   },
   avatarImage:{
    type:String,
    default:" ",
   }
})

module.exports = mongoose.model('User',userSchem)
