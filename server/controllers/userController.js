const User=require('../models/userModel')
const bcrypt=require('bcrypt')

module.exports.register = async (req,res,next)=>{
    try{ 
        const {username,email,password} = req.body;
        const emailCheck=await User.findOne({email});
        if(emailCheck) return  res.json({message:"E-mail is already exist!" , status:false})
        const hashPassword = await bcrypt.hash(password,10)
        const user = await User.create({
                    username,
                    email,
                    password:hashPassword,
                });
                delete user.password;
                return res.json({ status:true, user})
            }catch(ex) {
                next(ex)
            }
}
// for login controller
module.exports.login = async (req,res,next)=>{
    try{ 
        const {email,password} = req.body;
        const user=await User.findOne({email});
        if(!user) return  res.json({message:"Incorrect username or password !" , status:false})
        const passwordValid = await bcrypt.compare(password,user.password)
        if(!passwordValid) return  res.json({message:"Incorrect username or password !" , status:false})
                delete user.password;
                return res.json({ status:true, user})
            }catch(ex) {
                next(ex)
            }
}
// for setAvatar controller
module.exports.setAvatar = async (req,res,next)=>{
    try{ 
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(userId,{
            isAvatarImageSet :true,
            avatarImage,
        });
        return res.json({isSet:userData.isAvatarImageSet , image:userData.avatarImage})
            }catch(ex) {
                next(ex)
            }
}

module.exports.getAllUsers = async (req,res,next)=>{
    try{ 
        const users = await User.find({_id:{$ne:req.params.id}}).select([
            "email",
            "username",
            "avatarImage",
            "_id"
        ]);
            return res.json(users)
            }catch(ex) {
                next(ex)
            }
}